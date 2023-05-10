import express from "express"
// import fs from "fs"
import cors from "cors"
// import { PlayerScore } from "../../client/src/domain/playerscore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,deleteDoc, setDoc, doc, getDoc, getDocs, collection, addDoc } from "firebase/firestore";
import { HighScore } from "../domain/highscore";
import * as dotenv from 'dotenv';
dotenv.config();
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
    apiKey: "AIzaSyDhHjhc56740EXC5JokTL1Q69MP1JV1qp4",
    authDomain: "day27-f9d4f.firebaseapp.com",
    projectId: "day27-f9d4f",
    storageBucket: "day27-f9d4f.appspot.com",
    messagingSenderId: "58144372448",
    appId: "1:58144372448:web:4ce180b8f52043df26c285"
  };
// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: process.env.apiKey,
//     authDomain: process.env.authDomain,
//     projectId: process.env.projectId,
//     storageBucket: process.env.storageBucket,
//     messagingSenderId: process.env.messagingSenderId,
//     appId: process.env.appId
//   };
  
  // Initialize Firebase
const dbApp = initializeApp(firebaseConfig);
const database = getFirestore(dbApp)

const app = express();
app.use(express.json());
app.use(cors());

app.get("/scores", async (req, res) => {
    let cleanData:HighScore[]=[];
    console.log('getting scores')
   const allScores = await getDocs(collection(database, "kekhighscores")) 
   allScores.forEach((item)=>{
    let score = item.data() as any as HighScore
    score.id = item.id
cleanData.push(score)
   })
    // const scores = fs.readFileSync('./highscores.json')
    res.send(cleanData)
});

app.post("/scores", async (req, res) => {
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
    const player1score:HighScore = {
        address: address,
        name:name,
        score:score,
        id:""
    }
    const newScores = await addDoc(collection(database, "kekhighscores"), player1score)
    // newScores.push(player1score);
    // fs.writeFileSync("./highscores.json", JSON.stringify(scores))
    console.log(`new score saved ${newScores}`)
   
    res.send(newScores)
})
app.listen(3888)