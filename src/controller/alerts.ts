import { createAlerts } from "../services/alerts";
import { Request, Response } from "express";

export const addNewAlerts = async (req: Request, res: Response) => {
  try {
    const result = await createAlerts(req.body);
    if (result === 400) {
      return res.status(400).json({
        status: 400,
        message:
          "Invalid postcode, location couldnot be fetched for this postcode!",
      });
    } else if (result === 500) {
      return res.status(500).json({
        status: 500,
        message: "Error occurred while creating alert!",
      });
    } else {
      return res.status(200).json({
        status: 200,
        message: "Alert created successfully!",
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: `error occurred: ${error}`,
    });
  }
};
