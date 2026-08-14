import { fetchAnnouncements, fetchPosts } from "./api.js";

import Announcement from "./Announcement.js";
import { AnnouncementCard } from "./AnnouncementCard.js";
import { renderAnnouncements } from "./ui.js";

// IMMEDIATE ANNOUNCEMENT SECTION
const immediateAnnouncements = document.querySelector("section.immediate-announcements div.container");
fetchAnnouncements("recent-immediate")
.then((response) => {
    for (const announcement of response) {
        if (announcement.urgency === "immediate") {
        const announcementCard = document.createElement('announcement-card');
        announcementCard.announcementDetails = Announcement.fromObject(announcement);
        announcementCard.section = immediateAnnouncements;

            announcementCard.highlight = true;
            
            immediateAnnouncements.appendChild(announcementCard);
        }
    }
})

// TAB BUTTONS - ANNOUNCEMENTS
const announcementBtn = document.getElementById("btn-announcements");
announcementBtn.addEventListener("click", () => {
    if (!dashboardAnnouncements.className.includes("active")) {
        dashboardAnnouncements.className = "announcements-div active";
        announcementBtn.className = "btn active";
        
        dashboardPosts.className = "posts-div";
        postBtn.className = "btn";
    }
});

// TAB BUTTONS - POSTS
const postBtn = document.getElementById("btn-posts");
postBtn.addEventListener("click", () => {
    if (!dashboardPosts.className.includes("active")) {
        dashboardPosts.className = "posts-div active";
        postBtn.className = "btn active";
        
        dashboardAnnouncements.className = "announcements-div";
        announcementBtn.className = "btn";
    }
});

// GETTING AND DISPLAYING ANNOUNCEMENTS
const dashboardAnnouncements = document.querySelector("section.dashboard div.container div.announcements-div");
const announcementCardsDiv = dashboardAnnouncements.querySelector("div.announcement-cards");

fetchAnnouncements("recent")
.then((response) => {
    renderAnnouncements(response, announcementCardsDiv);
})

// SORT BUTTONS LOGIC
const announcementSortRecent = dashboardAnnouncements.querySelector("#recent");
const announcementSortOldest = dashboardAnnouncements.querySelector("#id");
const announcementSortTitle = dashboardAnnouncements.querySelector("#title");
const announcementSortStartDate = dashboardAnnouncements.querySelector("#start-date");
const announcementSortEndDate = dashboardAnnouncements.querySelector("#end-date");

announcementSortRecent.addEventListener("click", () => {
    if (!announcementSortRecent.className.includes('active')) {
        announcementSortRecent.className = "btn active";
        announcementSortOldest.className = "btn";
        announcementSortTitle.className = "btn";
        announcementSortStartDate.className = "btn";
        announcementSortEndDate.className = "btn";
        
        fetchAnnouncements("recent")
        .then((response) =>{
            renderAnnouncements(response, announcementCardsDiv);
        })
    }
    
    return;
});

announcementSortOldest.addEventListener("click", () => {
    if (!announcementSortOldest.className.includes('active')) {
        announcementSortRecent.className = "btn";
        announcementSortOldest.className = "btn active";
        announcementSortTitle.className = "btn";
        announcementSortStartDate.className = "btn";
        announcementSortEndDate.className = "btn";
        
        fetchAnnouncements("id")
        .then((response) =>{
            renderAnnouncements(response, announcementCardsDiv);
        })
    }
    
    return;
});

announcementSortTitle.addEventListener("click", () => {
    if (!announcementSortTitle.className.includes('active')) {
        announcementSortRecent.className = "btn";
        announcementSortOldest.className = "btn";
        announcementSortTitle.className = "btn active";
        announcementSortStartDate.className = "btn";
        announcementSortEndDate.className = "btn";
        
        fetchAnnouncements("title")
        .then((response) =>{
            renderAnnouncements(response, announcementCardsDiv);
        })
    }
    
    return;
});

announcementSortStartDate.addEventListener("click", () => {
    if (!announcementSortStartDate.className.includes('active')) {
        announcementSortRecent.className = "btn";
        announcementSortOldest.className = "btn";
        announcementSortTitle.className = "btn";
        announcementSortStartDate.className = "btn active";
        announcementSortEndDate.className = "btn";
        
        fetchAnnouncements("start-date")
        .then((response) =>{
            renderAnnouncements(response, announcementCardsDiv);
        })
    }
    
    return;
});

announcementSortEndDate.addEventListener("click", () => {
    if (!announcementSortEndDate.className.includes('active')) {
        announcementSortRecent.className = "btn";
        announcementSortOldest.className = "btn";
        announcementSortTitle.className = "btn";
        announcementSortStartDate.className = "btn";
        announcementSortEndDate.className = "btn active";
        
        fetchAnnouncements("end-date")
        .then((response) =>{
            renderAnnouncements(response, announcementCardsDiv);
        })
    }

    return;
});

// GETTING AND DISPLAYING POSTS
const dashboardPosts = document.querySelector("section.dashboard div.container div.posts-div");
fetchPosts("recent")
.then((response) =>{
    for (const post of response) {
        if (post.isApproved) {
            const postCard = document.createElement('p');
            
            postCard.textContent = post;
            
            dashboardPosts.appendChild(postCard);
        }
        const postCard = document.createElement('p');
        
        postCard.textContent = post.title;
        
        dashboardPosts.appendChild(postCard);
    }
})