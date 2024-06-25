import Alerts from "../models/alerts";
import publicUsers from "../models/users";
import roughSleepers from "../models/roughsleepers";
import Pets from "../models/pets";
import axios from "axios";
import { sendEmails } from "./emails";

const generateRandomId = () => {
  const randomNum = Math.floor(Math.random() * 10000000);
  return randomNum.toString().padStart(7, "0");
};

const fetchCoordinates = async (postcode: any) => {
  const mapItUrl = `https://mapit.mysociety.org/postcode/${encodeURIComponent(
    postcode
  )}`;

  try {
    const locationData = await axios.get(mapItUrl);
    return locationData;
  } catch (error) {
    console.log(`${error}`);
    return 400;
  }
};

const getLaByPostcode = async (postcode: any) => {
  const types = ["DIS", "LBO", "MTD", "UTA"];
  try {
    const response: any = await axios.get(
      "https://mapit.mysociety.org/postcode/" + postcode
    );
    if (response) {
      if (response?.data?.areas) {
        let data: any = Object.values(response?.data?.areas).find((item: any) =>
          types.includes(item.type)
        );
        if (data?.name) {
          return data;
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  } catch (error) {
    return null;
  }
};

const createAlertDataMapping = async (requestBody: any) => {
  const location = {
    latitude: requestBody.latitude,
    longitude: requestBody.longitude,
  };

  const roughSleeperDetails = {
    firstName:
      requestBody.alertCreatedBy === "Self" && requestBody.firstName
        ? requestBody.firstName
        : null,
    lastName:
      requestBody.alertCreatedBy === "Self" && requestBody.lastName
        ? requestBody.lastName
        : null,
    email:
      requestBody.alertCreatedBy === "Self" && requestBody.email
        ? requestBody.email
        : null,
    phone:
      requestBody.alertCreatedBy === "Self" && requestBody.phone
        ? requestBody.phone
        : null,
    gender: requestBody.gender,
    ageGroup: requestBody.ageGroup,
    appearance: requestBody.appearance,
    issues: requestBody.additionalIssues ? requestBody.additionalIssues : null,
    isAllowingContact:
      requestBody.alertCreatedBy === "Self" && requestBody.isAllowingContact
        ? requestBody.isAllowingContact
        : false,
    isNewRoughSleeper:
      requestBody.alertCreatedBy === "Self" && requestBody.isNewRoughSleeper
        ? requestBody.isNewRoughSleeper
        : false,
    shareInfoWithStreetvet:
      requestBody.alertCreatedBy === "Self" &&
      requestBody.shareInfoWithStreetvet
        ? requestBody.shareInfoWithStreetvet
        : false,
  };

  let publicUserDetails = null;
  if (
    requestBody.alertCreatedBy === "Member of Public" &&
    (requestBody.firstName ||
      requestBody.lastName ||
      requestBody.email ||
      requestBody.recieveUpdates ||
      requestBody.recieveNews ||
      requestBody.shareDetails ||
      requestBody.hearOpportunities)
  ) {
    publicUserDetails = {
      firstName: requestBody.firstName ? requestBody.firstName : null,
      lastName: requestBody.lastName ? requestBody.lastName : null,
      email: requestBody.email ? requestBody.email : null,
      recieveUpdates: requestBody.recieveUpdates
        ? requestBody.recieveUpdates
        : false,
      recieveNews: requestBody.recieveNews ? requestBody.recieveNews : false,
      hearOpportunities: requestBody.hearOpportunities
        ? requestBody.hearOpportunities
        : false,
      shareDetails: requestBody.shareDetails ? requestBody.shareDetails : false,
      shareInfoWithStreetvet: requestBody.shareInfoWithStreetvet
        ? requestBody.shareInfoWithStreetvet
        : false,
    };
  }

  let petDetails = null;
  if (
    requestBody.isPetAlong &&
    requestBody.petName &&
    requestBody.petBreed &&
    requestBody.petContactReason
  ) {
    petDetails = {
      petName: requestBody.petName ? requestBody.petName : null,
      petBreed: requestBody.petBreed ? requestBody.petBreed : null,
      contactReason: requestBody.petContactReason
        ? requestBody.petContactReason
        : null,
    };
  }

  let alertBody = {
    alertCreatedBy: requestBody.alertCreatedBy,
    address: requestBody.address,
    postcode: requestBody.postcode,
    time: requestBody.time,
    locationDescription: requestBody.locationDescription,
    location: location,
    localAuthority: requestBody.localAuthority,
    status: "Open",
    roughSleeperDetails: roughSleeperDetails,
    userDetails: publicUserDetails,
    isPetAlong: requestBody.isPetAlong,
    petData: petDetails,
  };

  return alertBody;
};

export const createAlerts = async (alertBody: any) => {
  try {
    console.log(alertBody);
    let recieverEmail;
    const fetchLocationData = await fetchCoordinates(alertBody.postcode);

    if (fetchLocationData === 400) {
      return 400;
    }

    alertBody.latitude = fetchLocationData.data.wgs84_lat;
    alertBody.longitude = fetchLocationData.data.wgs84_lon;

    const fetchLAData = await getLaByPostcode(alertBody.postcode);

    if (fetchLAData === 400) {
      return 400;
    }

    alertBody.localAuthority = fetchLAData.name;

    alertBody = await createAlertDataMapping(alertBody);

    if (alertBody.alertCreatedBy === "Member of Public") {
      recieverEmail = alertBody.userDetails.email
        ? alertBody.userDetails.email
        : null;
    } else {
      recieverEmail = alertBody.roughSleeperDetails.email
        ? alertBody.roughSleeperDetails.email
        : null;
    }

    const addRoughSleeperData = await roughSleepers.create(
      alertBody.roughSleeperDetails
    );
    alertBody.roughSleeperDetails = addRoughSleeperData._id;

    if (alertBody.isPetAlong && alertBody.petData) {
      const addPetData = await Pets.create(alertBody.petData);
      alertBody.petData = addPetData._id;
    }

    if (alertBody.userDetails) {
      const addPublicUserData = await publicUsers.findOneAndUpdate(
        { email: alertBody.userDetails.email },
        alertBody.userDetails,
        {
          new: true,
          upsert: true,
        }
      );

      alertBody.userDetails = addPublicUserData._id;
    }

    alertBody.alertId = generateRandomId();

    const createAlert = await Alerts.create(alertBody);
 
    if (recieverEmail) {
      await sendEmails(recieverEmail, createAlert.alertId);
    }

    return createAlert;
  } catch (error) {
    console.log(`Error occurred while creating alerts: ${error}`);
    return 500;
  }
};
