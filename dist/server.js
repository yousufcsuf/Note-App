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
const express_1 = __importDefault(require("express"));
const note_1 = __importDefault(require("./src/models/note"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = 5000;
const MONGO_URI = "mongodb://localhost:27017/my_database";
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MONGO_URI);
        console.log("✅ Connected to MongoDB");
    }
    catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    }
});
connectDB();
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield note_1.default.find().exec();
    res.status(200).json(notes);
}));
app.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryParams = req.query;
    console.log(queryParams);
    const newNote = new note_1.default({
        title: queryParams.title,
        text: queryParams.text,
    });
    console.log("NewNotes", newNote);
    const notes = yield note_1.default.find().exec();
    yield newNote.save();
    res.status(200).json(notes);
}));
app.listen(port, () => {
    console.log("Server is started");
});
