"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_js_1 = require("../controllers/user.controller.js");
const router = (0, express_1.Router)();
router.get('/user', user_controller_js_1.getUser);
router.get('/getUserById/:id', user_controller_js_1.getUserById);
exports.default = router;
