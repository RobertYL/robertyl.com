import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js'
import { getFirestore, collection, doc, getDoc, getDocs, query, orderBy } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js'

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
var exams = [];
if(!('scioly-tests-last-updated' in localStorage)
        || (new Date(localStorage.getItem('scioly-tests-last-updated'))) < lastUpdated) {

    // Update last cached time
    lastUpdated = new Date(lastUpdated.getTime()+1000);
    localStorage.setItem('scioly-tests-last-updated', lastUpdated);

    // Query for all exams
    const examsRef = query(collection(db, 'scioly/resources/tests'),
        orderBy('date', 'desc'),
        orderBy('tournament-short', 'asc'),
        orderBy('division', 'asc'),
        orderBy('event', 'asc')
    );
    const examSnaps = await getDocs(examsRef);

    // Cache exams
    examSnaps.forEach((doc) => {
        exams.push(doc.data());
    });
    localStorage.setItem('scioly-tests', JSON.stringify(exams));
}

// Retrieve exam from cache
exams = JSON.parse(localStorage.getItem('scioly-tests'));

// Grab select elements
var sfilterRef = document.getElementById('season-filter');
var efilterRef = document.getElementById('event-filter');

/* Functionality for resizing select */
// Set listener on change
document.querySelectorAll('select').forEach(select => {
    select.addEventListener('change', (e) => {
        let tempSelect = document.createElement('select'),
            tempOption = document.createElement('option');

        tempOption.textContent = e.target.options[e.target.selectedIndex].text;
        tempSelect.style.cssText += `
            visibility: hidden;
            position: fixed;
            `;
        tempSelect.appendChild(tempOption);
        e.target.after(tempSelect);
        
        const tempSelectWidth = tempSelect.getBoundingClientRect().width;
        e.target.style.width = `${tempSelectWidth}px`;
        tempSelect.remove();
        renderExams();
    })
    select.dispatchEvent(new Event('change'));
})

// Get unique seasons and events to filter by
var uniqueSeasons = [...new Set(exams.map(exam => exam.season))].sort().reverse();
var uniqueEvents = [...new Set(exams.map(exam => exam.event.concat(' ',exam.division).toLowerCase()))].sort();

uniqueSeasons.forEach((season) => {
    var opt = new Option(season);
    opt.value = season;
    sfilterRef.appendChild(opt);
});
uniqueEvents.forEach((event) => {
    var opt = new Option(event);
    opt.value = event;
    efilterRef.appendChild(opt);
});

// Render exams based on filters
function renderExams() {
    var tbodyRef = document.createElement('tbody');
    tbodyRef.id = 'table-body';

    exams.forEach((exam) => {
        if(sfilterRef.value != 'all' && sfilterRef.value != exam.season) return;
        if(efilterRef.value != 'all'
                && efilterRef.value != exam.event.concat(' ',exam.division).toLowerCase())
            return;
        
        var newRow = tbodyRef.insertRow();

        // var seasonCell = newRow.insertCell();
        // seasonCell.innerHTML = exam.season;
        
        var tournamentCell = newRow.insertCell();
        var tournamentSpan = document.createElement("span");
        tournamentSpan.setAttribute("title",exam.tournament);
        tournamentSpan.innerHTML = exam['tournament-short'].replace(/_/g, ' ');
        tournamentCell.appendChild(tournamentSpan);
        
        var dateCell = newRow.insertCell();
        var dateOptions = { year: 'numeric', month: 'short', day: 'numeric', timeZone : 'UTC' };
        dateCell.innerHTML = (new Date(exam.date))
            .toLocaleDateString('en-US', dateOptions).toLowerCase();
        
        var eventCell = newRow.insertCell();
        eventCell.innerHTML = exam.event.concat(' ',exam.division).toLowerCase();
    });

    var old_tbodyRef = document.getElementById('table-body');
    old_tbodyRef.parentNode.replaceChild(tbodyRef,old_tbodyRef)
}