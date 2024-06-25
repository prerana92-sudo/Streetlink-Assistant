"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roughSleeperSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    phone: {
        type: String,
        required: false,
    },
    ageGroup: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    appearance: {
        type: String,
        required: true,
    },
    issues: {
        type: String,
        required: false,
    },
    isAllowingContact: {
        type: Boolean,
        default: false,
        required: false,
    },
    isNewRoughSleeper: {
        type: Boolean,
        default: false,
        required: false,
    },
    shareInfoWithStreetvet: {
        type: Boolean,
        default: false,
        required: false,
    },
}, {
    timestamps: true,
});
const roughSleepers = (0, mongoose_1.model)("roughSleepers", roughSleeperSchema);
exports.default = roughSleepers;
//# sourceMappingURL=roughsleepers.js.map