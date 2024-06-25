"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alerts_1 = require("../controller/alerts");
const router = (0, express_1.Router)();
router.post("/create-alert", alerts_1.addNewAlerts);
exports.default = router;
//# sourceMappingURL=alerts.js.map