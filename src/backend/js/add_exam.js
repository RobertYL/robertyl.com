import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js'
import { getFirestore, collection, doc, addDoc, setDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBZj6xf4nS4Zj0h5tcRmZJZNdcORJuSNfc',
    authDomain: 'robertyl.firebaseapp.com',
    projectId: 'robertyl',
    storageBucket: 'robertyl.appspot.com',
    messagingSenderId: '413867181899',
    appId: '1:413867181899:web:31ba9a9e4e419512520ace',
    measurementId: 'G-YFMC8RYWTV'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById('data_submit').onclick = writeToDb;

async function writeToDb() {
    var csv = document.getElementById('data').value;
    var tests = tsvJSON(csv);
    
    for(var i = 0; i < tests.length; i++) {
        await addDoc(collection(db,'scioly/resources/tests'), tests[i]);
    }
    console.log("Successfully added "+tests.length+" tests");

    await setDoc(doc(db, 'scioly/resources/tests/last-updated'), {
        time: serverTimestamp()
    });
    console.log("Successfully updated last updated time");
}

function tsvJSON(csv){
    var lines=csv.split("\n");
    var result = [];
    var headers = lines[0].split("\t");
  
    for(var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline=lines[i].split("\t");
        for(var j = 0; j < headers.length; j++) {
            if(j == 0)
                obj[headers[j]] = parseInt(currentline[j]);
            else
                obj[headers[j]] = currentline[j];
        }
        result.push(obj);
    }
    return result; //JavaScript object
    // return JSON.stringify(result); //JSON
  }