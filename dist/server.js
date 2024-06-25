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
const app_1 = __importDefault(require("./app"));
const mongoose_1 = __importDefault(require("mongoose"));
const PORT = 3001;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default
            .connect("mongodb://127.0.0.1:27017/Streetlink?readPreference=primary&directConnection=true&ssl=false")
            .then(() => {
            console.log(`Connected to mongoDB successfully!`);
        })
            .catch(() => {
            console.log(`Error occurred while connecting to mongoDB!`);
        });
        app_1.default.listen(PORT, () => {
            console.log(`Server listening at port :${PORT}`);
        });
    }
    catch (error) {
        console.log(`error occurred while starting server!: ${error}`);
    }
});
startServer();
//# sourceMappingURL=server.js.map