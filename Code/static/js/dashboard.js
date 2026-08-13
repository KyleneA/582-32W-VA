import { fetchAdmins, fetchResidents, fetchAnnouncements, fetchPosts } from "./api.js";
import { renderAdmins, renderAnnouncements } from "./ui.js"
import Announcement from "./Announcement.js";
import { AnnouncementCard } from "./AnnouncementCard.js";

fetchAdmins()

const dashboardAnnouncements = document.querySelector("section.dashboard div.container div.announcements-div");
const dashboardPosts = document.querySelector("section.dashboard div.container div.posts-div");

fetchAnnouncements()
.then((response) => {
    for (const announcement of response) {
        const announcementCard = document.createElement('announcement-card');
        announcementCard.announcementDetails = Announcement.fromObject(announcement);

        dashboardAnnouncements.appendChild(announcementCard);
    }

})

const announcementBtn = document.getElementById("btn-announcements");
const postBtn = document.getElementById("btn-posts");

announcementBtn.addEventListener("click", () => {
    console.log(announcementBtn, postBtn);
    if (!dashboardAnnouncements.className.includes("active")) {
        dashboardAnnouncements.className = "announcements-div active";
        announcementBtn.className = "btn active";
        
        dashboardPosts.className = "posts-div";
        postBtn.className = "btn";
    }
});

postBtn.addEventListener("click", () => {
    console.log(announcementBtn, postBtn);
    if (!dashboardPosts.className.includes("active")) {
        dashboardPosts.className = "posts-div active";
        postBtn.className = "btn active";
        
        dashboardAnnouncements.className = "announcements-div";
        announcementBtn.className = "btn";
    }
});