"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const publicUserSchema = new mongoose_1.Schema({
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
    recieveUpdates: {
        type: Boolean,
        required: false,
    },
    recieveNews: {
        type: Boolean,
        required: false,
    },
    hearOpportunities: {
        type: Boolean,
        required: false,
    },
    shareDetails: {
        type: Boolean,
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
const publicUsers = (0, mongoose_1.model)("publicUsers", publicUserSchema);
exports.default = publicUsers;
//# sourceMappingURL=users.js.map