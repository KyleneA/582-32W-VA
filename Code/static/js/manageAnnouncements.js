import { fetchAnnouncements } from "./api.js";
import { changeSortBtn, renderManageAnnouncements, displayError } from "./ui.js";
import { AnnouncementCard } from "./AnnouncementCard.js";

const announcementsDiv = document.querySelector('section.announcements div.announcements-div');
const announcementCards = announcementsDiv.querySelector('div.announcement-cards');
const errorMsg = announcementsDiv.querySelector('div.error-msg')

let announcementStatusDisplayed = "posted";
let getAnnouncements = fetchAnnouncements('recent');

getAnnouncements
.then((response) => {
    renderManageAnnouncements(response, announcementCards, announcementStatusDisplayed);
})
.catch((error) => {
    displayError(error, errorMsg);
});

// DISPLAY BUTTONS
const displayBtnsDiv = document.querySelector("div.display-btns");
const postedDisplayBtn = displayBtnsDiv.querySelector("div.display-btns button#btn-posted");
const archivedDisplayBtn = displayBtnsDiv.querySelector("div.display-btns button#btn-archived");

postedDisplayBtn.addEventListener("click", () => {
    announcementStatusDisplayed = 'posted';
    
    getAnnouncements
    .then((response) => {
        changeSortBtn(displayBtnsDiv, postedDisplayBtn);
    
        renderManageAnnouncements(response, announcementCards, announcementStatusDisplayed);
    })
    .catch((error) => {
        displayError(error, errorMsg);
    });
})

archivedDisplayBtn.addEventListener("click", () => {
    announcementStatusDisplayed = 'archived';
    
    getAnnouncements
    .then((response) => {
        changeSortBtn(displayBtnsDiv, archivedDisplayBtn);
    
        renderManageAnnouncements(response, announcementCards, announcementStatusDisplayed);
    })
    .catch((error) => {
        displayError(error, errorMsg);
    });
})

// SORTING BUTTONS
const announcementSortBtnsDiv = announcementsDiv.querySelector('div.sorting-btns');
const announcementSortRecent = announcementSortBtnsDiv.querySelector("#recent");
const announcementSortOldest = announcementSortBtnsDiv.querySelector("#id");
const announcementSortTitle = announcementSortBtnsDiv.querySelector("#title");
const announcementSortStartDate = announcementSortBtnsDiv.querySelector("#start-date");
const announcementSortEndDate = announcementSortBtnsDiv.querySelector("#end-date");

announcementSortRecent.addEventListener("click", () => {
    if (!announcementSortRecent.className.includes('active')) {
        getAnnouncements = fetchAnnouncements("recent");
        
        getAnnouncements
        .then((response) =>{
            changeSortBtn(announcementSortBtnsDiv, announcementSortRecent);
            
            renderManageAnnouncements(response, announcementCards, announcementStatusDisplayed);
            
        })
        .catch((error) => {
            displayError(error, errorMsg);
        });
    }
    
    return;
});

announcementSortOldest.addEventListener("click", () => {
    if (!announcementSortOldest.className.includes('active')) {
        getAnnouncements = fetchAnnouncements("oldest");
        
        getAnnouncements
        .then((response) =>{
            changeSortBtn(announcementSortBtnsDiv, announcementSortOldest);
    
            renderManageAnnouncements(response, announcementCards, announcementStatusDisplayed);
            
        })
        .catch((error) => {
            displayError(error, errorMsg);
        });
    }
    
    return;
});

announcementSortTitle.addEventListener("click", () => {
    if (!announcementSortTitle.className.includes('active')) {
        getAnnouncements = fetchAnnouncements("title");
        
        getAnnouncements
        .then((response) =>{
            changeSortBtn(announcementSortBtnsDiv, announcementSortTitle);
    
            renderManageAnnouncements(response, announcementCards, announcementStatusDisplayed);
            
        })
        .catch((error) => {
            displayError(error, errorMsg);
        });
    }
    
    return;
});

announcementSortStartDate.addEventListener("click", () => {
    if (!announcementSortStartDate.className.includes('active')) {
        getAnnouncements = fetchAnnouncements("start date");
        
        getAnnouncements
        .then((response) =>{
            changeSortBtn(announcementSortBtnsDiv, announcementSortStartDate);

            renderManageAnnouncements(response, announcementCards, announcementStatusDisplayed);
            
        })
        .catch((error) => {
            displayError(error, errorMsg);
        });
    }
    
    return;
});

announcementSortEndDate.addEventListener("click", () => {
    if (!announcementSortEndDate.className.includes('active')) {
        getAnnouncements = fetchAnnouncements("end date");
        
        
        getAnnouncements
        .then((response) =>{
            changeSortBtn(announcementSortBtnsDiv, announcementSortEndDate);

            renderManageAnnouncements(response, announcementCards, announcementStatusDisplayed);
            
        })
        .catch((error) => {
            displayError(error, errorMsg);
        });
    }
    
    return;
});