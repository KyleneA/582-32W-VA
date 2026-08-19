import { fetchAnnouncements } from "./api.js";
import { changeSortBtn, renderAnnouncement, renderAnnouncements, renderManageAnnouncements } from "./ui.js";
import { AnnouncementCard } from "./AnnouncementCard.js";

const announcementsDiv = document.querySelector('section.announcements div.announcements-div');
const announcementCards = announcementsDiv.querySelector('div.announcement-cards');

let announcementStatusDisplayed = "posted";
let getAnnouncements = fetchAnnouncements('recent');

getAnnouncements
.then((response) => {
    renderManageAnnouncements(response, announcementCards, announcementStatusDisplayed);
})

// DISPLAY BUTTONS
const displayBtnsDiv = document.querySelector("div.display-btns");
const postedDisplayBtn = displayBtnsDiv.querySelector("div.display-btns button#btn-posted");
const archivedDisplayBtn = displayBtnsDiv.querySelector("div.display-btns button#btn-archived");

postedDisplayBtn.addEventListener("click", () => {
    changeSortBtn(displayBtnsDiv, postedDisplayBtn);

    announcementStatusDisplayed = 'posted';

    getAnnouncements
    .then((response) => {
        renderManageAnnouncements(response, announcementCards, announcementStatusDisplayed);
    })
})

archivedDisplayBtn.addEventListener("click", () => {
    changeSortBtn(displayBtnsDiv, archivedDisplayBtn);

    announcementStatusDisplayed = 'archived';

    getAnnouncements
    .then((response) => {
        renderManageAnnouncements(response, announcementCards, announcementStatusDisplayed);
    })
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
        changeSortBtn(announcementSortBtnsDiv, announcementSortRecent);
        
        getAnnouncements = fetchAnnouncements("recent");

        getAnnouncements
        .then((response) =>{
            renderManageAnnouncements(response, announcementCards, announcementStatusDisplayed);
            
        })
    }
    
    return;
});

announcementSortOldest.addEventListener("click", () => {
    if (!announcementSortOldest.className.includes('active')) {
        changeSortBtn(announcementSortBtnsDiv, announcementSortOldest);

        getAnnouncements = fetchAnnouncements("oldest");

        getAnnouncements
        .then((response) =>{
            renderManageAnnouncements(response, announcementCards, announcementStatusDisplayed);
            
        })
    }
    
    return;
});

announcementSortTitle.addEventListener("click", () => {
    if (!announcementSortTitle.className.includes('active')) {
        changeSortBtn(announcementSortBtnsDiv, announcementSortTitle);

        getAnnouncements = fetchAnnouncements("title");

        getAnnouncements
        .then((response) =>{
            renderManageAnnouncements(response, announcementCards, announcementStatusDisplayed);
            
        })
    }
    
    return;
});

announcementSortStartDate.addEventListener("click", () => {
    if (!announcementSortStartDate.className.includes('active')) {
        changeSortBtn(announcementSortBtnsDiv, announcementSortStartDate);

        getAnnouncements = fetchAnnouncements("start date");

        getAnnouncements
        .then((response) =>{
            renderManageAnnouncements(response, announcementCards, announcementStatusDisplayed);
            
        })
    }
    
    return;
});

announcementSortEndDate.addEventListener("click", () => {
    if (!announcementSortEndDate.className.includes('active')) {
        changeSortBtn(announcementSortBtnsDiv, announcementSortEndDate);

        getAnnouncements = fetchAnnouncements("end date");

        getAnnouncements
        .then((response) =>{
            renderManageAnnouncements(response, announcementCards, announcementStatusDisplayed);
            
        })
    }
    
    return;
});