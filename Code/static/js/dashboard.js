import { fetchAnnouncements, fetchPosts } from "./api.js";

import Announcement from "./Announcement.js";
import { AnnouncementCard } from "./AnnouncementCard.js";

const immediateAnnouncements = document.querySelector("section.immediate-announcements div.container");
fetchAnnouncements()
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

const dashboardAnnouncements = document.querySelector("section.dashboard div.container div.announcements-div");

fetchAnnouncements()
.then((response) => {
    for (const announcement of response) {
        const announcementCard = document.createElement('announcement-card');
        announcementCard.announcementDetails = Announcement.fromObject(announcement);
        
        dashboardAnnouncements.appendChild(announcementCard);
    }
})

const dashboardPosts = document.querySelector("section.dashboard div.container div.posts-div");

fetchPosts()
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

const announcementBtn = document.getElementById("btn-announcements");
const postBtn = document.getElementById("btn-posts");

announcementBtn.addEventListener("click", () => {
    if (!dashboardAnnouncements.className.includes("active")) {
        dashboardAnnouncements.className = "announcements-div active";
        announcementBtn.className = "btn active";
        
        dashboardPosts.className = "posts-div";
        postBtn.className = "btn";
    }
});

postBtn.addEventListener("click", () => {
    if (!dashboardPosts.className.includes("active")) {
        dashboardPosts.className = "posts-div active";
        postBtn.className = "btn active";
        
        dashboardAnnouncements.className = "announcements-div";
        announcementBtn.className = "btn";
    }
});