import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js'
import { getFirestore, collection, doc, getDoc, getDocs, query, orderBy, persistentLocalCache } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js'

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

// Check for update
const lastUpdatedRef = doc(db, 'scioly/resources/tests/last-updated');
var lastUpdated = (await getDoc(lastUpdatedRef)).data().time.toDate();
var tests = [];
if(!('scioly-tests-last-updated' in localStorage)
        || (new Date(localStorage.getItem('scioly-tests-last-updated'))) < lastUpdated) {

    // Update last cached time
    lastUpdated = new Date(lastUpdated.getTime()+1000);
    localStorage.setItem('scioly-tests-last-updated', lastUpdated);

    // Query for all tests
    const testsRef = query(collection(db, 'scioly/resources/tests'),
        orderBy('date', 'desc'),
        orderBy('division', 'asc'),
        orderBy('event', 'asc')
    );
    const testSnaps = await getDocs(testsRef);

    // Cache tests
    testSnaps.forEach((doc) => {
        tests.push(doc.data());
    });
    localStorage.setItem('scioly-tests', JSON.stringify(tests));
}

// Retrieve test from cache
tests = JSON.parse(localStorage.getItem('scioly-tests'));

// Render tests
var tbodyRef = document.getElementById('test-table-body');
tests.forEach((test) => {
    var newRow = tbodyRef.insertRow();

    var seasonCell = newRow.insertCell();
    seasonCell.innerHTML = test.season;
    
    var tournamentCell = newRow.insertCell();
    tournamentCell.innerHTML = test.tournament;
    
    var dateCell = newRow.insertCell();
    var dateOptions = { year: 'numeric', month: 'short', day: 'numeric', timeZone : 'UTC' };
    dateCell.innerHTML = (new Date(test.date))
        .toLocaleDateString('en-US', dateOptions).toLowerCase();
    
    var eventCell = newRow.insertCell();
    eventCell.innerHTML = test.event.concat(' ',test.division).toLowerCase();
});


