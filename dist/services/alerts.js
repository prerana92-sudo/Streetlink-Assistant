"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAlerts = void 0;
const alerts_1 = __importDefault(require("../models/alerts"));
const users_1 = __importDefault(require("../models/users"));
const roughsleepers_1 = __importDefault(require("../models/roughsleepers"));
const pets_1 = __importDefault(require("../models/pets"));
const axios_1 = __importDefault(require("axios"));
const emails_1 = require("./emails");
const generateRandomId = () => {
    const randomNum = Math.floor(Math.random() * 10000000);
    return randomNum.toString().padStart(7, "0");
};
const fetchCoordinates = (postcode) => __awaiter(void 0, void 0, void 0, function* () {
    const mapItUrl = `https://mapit.mysociety.org/postcode/${encodeURIComponent(postcode)}`;
    try {
        const locationData = yield axios_1.default.get(mapItUrl);
        return locationData;
    }
    catch (error) {
        console.log(`${error}`);
        return 400;
    }
});
const getLaByPostcode = (postcode) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const types = ["DIS", "LBO", "MTD", "UTA"];
    try {
        const response = yield axios_1.default.get("https://mapit.mysociety.org/postcode/" + postcode);
        if (response) {
            if ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.areas) {
                let data = Object.values((_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.areas).find((item) => types.includes(item.type));
                if (data === null || data === void 0 ? void 0 : data.name) {
                    return data;
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        }
    }
    catch (error) {
        return null;
    }
});
const createAlertDataMapping = (requestBody) => __awaiter(void 0, void 0, void 0, function* () {
    const location = {
        latitude: requestBody.latitude,
        longitude: requestBody.longitude,
    };
    const roughSleeperDetails = {
        firstName: requestBody.alertCreatedBy === "Self" && requestBody.firstName
            ? requestBody.firstName
            : null,
        lastName: requestBody.alertCreatedBy === "Self" && requestBody.lastName
            ? requestBody.lastName
            : null,
        email: requestBody.alertCreatedBy === "Self" && requestBody.email
            ? requestBody.email
            : null,
        phone: requestBody.alertCreatedBy === "Self" && requestBody.phone
            ? requestBody.phone
            : null,
        gender: requestBody.gender,
        ageGroup: requestBody.ageGroup,
        appearance: requestBody.appearance,
        issues: requestBody.additionalIssues ? requestBody.additionalIssues : null,
        isAllowingContact: requestBody.alertCreatedBy === "Self" && requestBody.isAllowingContact
            ? requestBody.isAllowingContact
            : false,
        isNewRoughSleeper: requestBody.alertCreatedBy === "Self" && requestBody.isNewRoughSleeper
            ? requestBody.isNewRoughSleeper
            : false,
        shareInfoWithStreetvet: requestBody.alertCreatedBy === "Self" &&
            requestBody.shareInfoWithStreetvet
            ? requestBody.shareInfoWithStreetvet
            : false,
    };
    let publicUserDetails = null;
    if (requestBody.alertCreatedBy === "Member of Public" &&
        (requestBody.firstName ||
            requestBody.lastName ||
            requestBody.email ||
            requestBody.recieveUpdates ||
            requestBody.recieveNews ||
            requestBody.shareDetails ||
            requestBody.hearOpportunities)) {
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
    if (requestBody.isPetAlong &&
        requestBody.petName &&
        requestBody.petBreed &&
        requestBody.petContactReason) {
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
});
const createAlerts = (alertBody) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(alertBody);
        let recieverEmail;
        const fetchLocationData = yield fetchCoordinates(alertBody.postcode);
        if (fetchLocationData === 400) {
            return 400;
        }
        alertBody.latitude = fetchLocationData.data.wgs84_lat;
        alertBody.longitude = fetchLocationData.data.wgs84_lon;
        const fetchLAData = yield getLaByPostcode(alertBody.postcode);
        if (fetchLAData === 400) {
            return 400;
        }
        alertBody.localAuthority = fetchLAData.name;
        alertBody = yield createAlertDataMapping(alertBody);
        if (alertBody.alertCreatedBy === "Member of Public") {
            recieverEmail = alertBody.userDetails.email
                ? alertBody.userDetails.email
                : null;
        }
        else {
            recieverEmail = alertBody.roughSleeperDetails.email
                ? alertBody.roughSleeperDetails.email
                : null;
        }
        const addRoughSleeperData = yield roughsleepers_1.default.create(alertBody.roughSleeperDetails);
        alertBody.roughSleeperDetails = addRoughSleeperData._id;
        if (alertBody.isPetAlong && alertBody.petData) {
            const addPetData = yield pets_1.default.create(alertBody.petData);
            alertBody.petData = addPetData._id;
        }
        if (alertBody.userDetails) {
            const addPublicUserData = yield users_1.default.findOneAndUpdate({ email: alertBody.userDetails.email }, alertBody.userDetails, {
                new: true,
                upsert: true,
            });
            alertBody.userDetails = addPublicUserData._id;
        }
        alertBody.alertId = generateRandomId();
        const createAlert = yield alerts_1.default.create(alertBody);
        if (recieverEmail) {
            yield (0, emails_1.sendEmails)(recieverEmail, createAlert.alertId);
        }
        return createAlert;
    }
    catch (error) {
        console.log(`Error occurred while creating alerts: ${error}`);
        return 500;
    }
});
exports.createAlerts = createAlerts;
//# sourceMappingURL=alerts.js.map