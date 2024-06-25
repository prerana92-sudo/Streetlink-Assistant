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
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewAlerts = void 0;
const alerts_1 = require("../services/alerts");
const addNewAlerts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, alerts_1.createAlerts)(req.body);
        if (result === 400) {
            return res.status(400).json({
                status: 400,
                message: "Invalid postcode, location couldnot be fetched for this postcode!",
            });
        }
        else if (result === 500) {
            return res.status(500).json({
                status: 500,
                message: "Error occurred while creating alert!",
            });
        }
        else {
            return res.status(200).json({
                status: 200,
                message: "Alert created successfully!",
                data: result,
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            status: 500,
            message: `error occurred: ${error}`,
        });
    }
});
exports.addNewAlerts = addNewAlerts;
//# sourceMappingURL=alerts.js.map