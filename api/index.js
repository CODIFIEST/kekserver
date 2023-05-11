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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
// import fs from "fs"
var cors_1 = require("cors");
// import { PlayerScore } from "../../client/src/domain/playerscore";
// Import the functions you need from the SDKs you need
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
var dotenv = require("dotenv");
dotenv.config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//old db too many reads
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId
};
// Initialize Firebase
var dbApp = (0, app_1.initializeApp)(firebaseConfig);
var database = (0, firestore_1.getFirestore)(dbApp);
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use((0, cors_1["default"])());
app.get("/scores", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cleanData, allScores;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cleanData = [];
                console.log('getting scores');
                return [4 /*yield*/, (0, firestore_1.getDocs)((0, firestore_1.collection)(database, "kekhighscores"))];
            case 1:
                allScores = _a.sent();
                allScores.forEach(function (item) {
                    var score = item.data();
                    score.id = item.id;
                    cleanData.push(score);
                });
                // const scores = fs.readFileSync('./highscores.json')
                res.send(cleanData);
                return [2 /*return*/];
        }
    });
}); });
app.post("/scores", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var address, name, score, player1score, newScores;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                address = req.body.address;
                name = req.body.name;
                score = req.body.score;
                player1score = {
                    address: address,
                    name: name,
                    score: score,
                    id: ""
                };
                return [4 /*yield*/, (0, firestore_1.addDoc)((0, firestore_1.collection)(database, "kekhighscores"), player1score)
                    // newScores.push(player1score);
                    // fs.writeFileSync("./highscores.json", JSON.stringify(scores))
                ];
            case 1:
                newScores = _a.sent();
                // newScores.push(player1score);
                // fs.writeFileSync("./highscores.json", JSON.stringify(scores))
                console.log("new score saved ".concat(newScores));
                res.send(newScores);
                return [2 /*return*/];
        }
    });
}); });
app.listen(3888);
