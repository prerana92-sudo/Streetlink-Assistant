"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const petSchema = new mongoose_1.Schema({
    petName: {
        type: String,
        required: true,
    },
    petBreed: {
        type: String,
        required: true,
    },
    contactReason: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const Pets = (0, mongoose_1.model)("Pets", petSchema);
exports.default = Pets;
//# sourceMappingURL=pets.js.map