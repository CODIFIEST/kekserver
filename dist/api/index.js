"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
// import fs from "fs"
const cors_1 = __importDefault(require("cors"));
// import { PlayerScore } from "../../client/src/domain/playerscore";
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//old db too many reads
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};
// Initialize Firebase
const dbApp = (0, app_1.initializeApp)(firebaseConfig);
const database = (0, firestore_1.getFirestore)(dbApp);
var corsOptions = {
    origin: process.env.CORS_DOMAIN,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/scores", (0, cors_1.default)(corsOptions), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let cleanData = [];
    console.log('getting scores');
    const allScores = yield (0, firestore_1.getDocs)((0, firestore_1.collection)(database, "highscores"));
    allScores.forEach((item) => {
        let score = item.data();
        score.id = item.id;
        cleanData.push(score);
    });
    // const scores = fs.readFileSync('./highscores.json')
    res.send(cleanData);
}));
app.post("/scores", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const scores: PlayerScore[] = JSON.parse(fs.readFileSync('./highscores.json') as any as string)
    const address = req.body.address;
    const name = req.body.name;
    const score = req.body.score;
    // try {
    //     validateUserInput(name, platform, releaseYear, genre, ESRBrating, goodGame)
    // } catch (err) {
    //     res.status(404).send({
    //         error: err.message
    //     });
    //     return;
    // }
    const player1score = {
        address: address,
        name: name,
        score: score,
        id: ""
    };
    const newScores = yield (0, firestore_1.addDoc)((0, firestore_1.collection)(database, "highscores"), player1score);
    // newScores.push(player1score);
    // fs.writeFileSync("./highscores.json", JSON.stringify(scores))
    console.log(`new score saved ${newScores}`);
    res.send(newScores);
}));
app.listen(3888);
