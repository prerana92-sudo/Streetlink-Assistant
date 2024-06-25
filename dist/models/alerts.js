"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const locationSchema = {
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    _id: false
};
const alertSchema = new mongoose_1.Schema({
    alertId: {
        type: String,
        required: true,
    },
    alertCreatedBy: {
        type: String,
        enum: ["Member of Public", "Self"],
        required: true,
    },
    localAuthority: {
        type: String,
        required: true,
    },
    location: {
        type: locationSchema,
        required: true,
    },
    locationDescription: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Open', 'New'],
        required: false
    },
    roughSleeperDetails: {
        type: mongoose_1.Types.ObjectId,
        ref: "roughSleepers",
        required: true,
    },
    userDetails: {
        type: mongoose_1.Types.ObjectId,
        ref: "publicUsers",
        required: false,
        allowNull: true
    },
    isPetAlong: {
        type: Boolean,
        default: false,
        required: false,
    },
    petData: {
        type: mongoose_1.Types.ObjectId,
        ref: "pets",
        required: false,
        allowNull: true
    },
}, {
    timestamps: true,
});
const Alerts = (0, mongoose_1.model)("Alerts", alertSchema);
exports.default = Alerts;
//# sourceMappingURL=alerts.js.map