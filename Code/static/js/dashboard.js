import { fetchAnnouncements, fetchPosts } from "./api.js";

import Announcement from "./Announcement.js";
import { AnnouncementCard } from "./AnnouncementCard.js";
import Post from "./Post.js";
import { PostCard } from "./PostCard.js";
import { renderAnnouncement, renderAnnouncements, renderPost, changeSortBtn } from "./ui.js";

// IMMEDIATE ANNOUNCEMENT SECTION
const immediateAnnouncements = document.querySelector("section.immediate-announcements div.container");
fetchAnnouncements("recent-immediate")
.then((response) => {
    for (const announcement of response) {
        if (announcement.urgency === "immediate" && announcement.status === "posted") {
            renderAnnouncement(announcement, immediateAnnouncements, true);
            return; // to only get the first announcement
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
    announcementCardsDiv.innerHTML = "";

    const postedAnnouncements = response.filter((announcement) => announcement.status === 'posted');

    if (postedAnnouncements.length === 0) {
        announcementCardsDiv.textContent = "There are currently no announcements."
    }

    for (const announcement of postedAnnouncements) {
        if (announcement.status === "posted") {
            renderAnnouncement(announcement, announcementCardsDiv, false);
        }
    }
})

// SORT BUTTONS LOGIC
const announcementSortBtnsDiv = dashboardAnnouncements.querySelector('div.sorting-btns');
const announcementSortRecent = announcementSortBtnsDiv.querySelector("#recent");
const announcementSortOldest = announcementSortBtnsDiv.querySelector("#id");
const announcementSortTitle = announcementSortBtnsDiv.querySelector("#title");
const announcementSortStartDate = announcementSortBtnsDiv.querySelector("#start-date");
const announcementSortEndDate = announcementSortBtnsDiv.querySelector("#end-date");

announcementSortRecent.addEventListener("click", () => {
    if (!announcementSortRecent.className.includes('active')) {
        changeSortBtn(announcementSortBtnsDiv, announcementSortRecent);
        
        fetchAnnouncements("recent")
        .then((response) =>{
            announcementCardsDiv.innerHTML = "";

            const postedAnnouncements = response.filter((announcement) => announcement.status === 'posted');

            if (postedAnnouncements.length === 0) {
                announcementCardsDiv.textContent = "There are currently no announcements."
            }

            for (const announcement of postedAnnouncements) {
                if (announcement.status === "posted") {
                    renderAnnouncement(announcement, announcementCardsDiv, false);
                }
            }
        })
    }
    
    return;
});

announcementSortOldest.addEventListener("click", () => {
    if (!announcementSortOldest.className.includes('active')) {
        changeSortBtn(announcementSortBtnsDiv, announcementSortOldest);
        
        fetchAnnouncements("oldest")
        .then((response) =>{
            announcementCardsDiv.innerHTML = "";

            const postedAnnouncements = response.filter((announcement) => announcement.status === 'posted');

            if (postedAnnouncements.length === 0) {
                announcementCardsDiv.textContent = "There are currently no announcements."
            }

            for (const announcement of postedAnnouncements) {
                if (announcement.status === "posted") {
                    renderAnnouncement(announcement, announcementCardsDiv, false);
                }
            }
        })
    }
    
    return;
});

announcementSortTitle.addEventListener("click", () => {
    if (!announcementSortTitle.className.includes('active')) {
        changeSortBtn(announcementSortBtnsDiv, announcementSortTitle);
        
        fetchAnnouncements("title")
        .then((response) =>{
            announcementCardsDiv.innerHTML = "";

            const postedAnnouncements = response.filter((announcement) => announcement.status === 'posted');

            if (postedAnnouncements.length === 0) {
                announcementCardsDiv.textContent = "There are currently no announcements."
            }

            for (const announcement of postedAnnouncements) {
                if (announcement.status === "posted") {
                    renderAnnouncement(announcement, announcementCardsDiv, false);
                }
            }
        })
    }
    
    return;
});

announcementSortStartDate.addEventListener("click", () => {
    if (!announcementSortStartDate.className.includes('active')) {
        changeSortBtn(announcementSortBtnsDiv, announcementSortStartDate);

        fetchAnnouncements("start-date")
        .then((response) =>{
            announcementCardsDiv.innerHTML = "";

            const postedAnnouncements = response.filter((announcement) => announcement.status === 'posted');

            if (postedAnnouncements.length === 0) {
                announcementCardsDiv.textContent = "There are currently no announcements."
            }

            for (const announcement of postedAnnouncements) {
                if (announcement.status === "posted") {
                    renderAnnouncement(announcement, announcementCardsDiv, false);
                }
            }
        })
    }
    
    return;
});

announcementSortEndDate.addEventListener("click", () => {
    if (!announcementSortEndDate.className.includes('active')) {
        changeSortBtn(announcementSortBtnsDiv, announcementSortEndDate);
        
        fetchAnnouncements("end-date")
        .then((response) =>{
            announcementCardsDiv.innerHTML = "";

            const postedAnnouncements = response.filter((announcement) => announcement.status === 'posted');

            if (postedAnnouncements.length === 0) {
                announcementCardsDiv.textContent = "There are currently no announcements."
            }

            for (const announcement of postedAnnouncements) {
                if (announcement.status === "posted") {
                    renderAnnouncement(announcement, announcementCardsDiv, false);
                }
            }
        })
    }

    return;
});

// GETTING AND DISPLAYING POSTS
const dashboardPosts = document.querySelector("section.dashboard div.container div.posts-div");
const postCardsDiv = dashboardPosts.querySelector("div.post-cards");

fetchPosts("recent")
.then((response) =>{
    postCardsDiv.innerHTML = "";
    
    const approvedPosts = response.filter((post) => post.isApproved);
    
    if (approvedPosts.length === 0) {
        postCardsDiv.textContent = "There are currently no posts."

        return;
    }
    
    for (const post of approvedPosts) {
            renderPost(post, postCardsDiv);
    }
})

// SORT BUTTONS LOGIC
const sortBtnsDiv = dashboardPosts.querySelector(".sorting-btns");

const postSortRecent = dashboardPosts.querySelector("#recent");
const postSortOldest = dashboardPosts.querySelector("#id");
const postSortTitle = dashboardPosts.querySelector("#title");
const postSortStartDate = dashboardPosts.querySelector("#start-date");
const postSortEndDate = dashboardPosts.querySelector("#end-date");
const postSortCatSearch = dashboardPosts.querySelector("#category-search");
const postSortCatGive = dashboardPosts.querySelector("#category-give");
const postSortCatShare = dashboardPosts.querySelector("#category-share");

postSortRecent.addEventListener("click", () => {
    if (!postSortRecent.className.includes('active')) {
        changeSortBtn(sortBtnsDiv, postSortRecent);
        
        postCardsDiv.innerHTML = "";

        fetchPosts("recent")
        .then((response) =>{
            for (const post of approvedPosts) {
                renderPost(post, postCardsDiv);
            }
        })
    }        
    return;
});

postSortOldest.addEventListener("click", () => {
    if (!postSortOldest.className.includes('active')) {
        changeSortBtn(sortBtnsDiv, postSortOldest);

        postCardsDiv.innerHTML = "";

        fetchPosts("oldest")
        .then((response) =>{
            for (const post of approvedPosts) {
                renderPost(post, postCardsDiv);
            }
        })
    }        
    return;
});

postSortTitle.addEventListener("click", () => {
    if (!postSortTitle.className.includes('active')) {
        changeSortBtn(sortBtnsDiv, postSortTitle);

        postCardsDiv.innerHTML = "";

        fetchPosts("title")
        .then((response) =>{
            for (const post of approvedPosts) {
                renderPost(post, postCardsDiv);
            }
        })
    }
    
    return;
});

postSortStartDate.addEventListener("click", () => {
    if (!postSortStartDate.className.includes('active')) {
        changeSortBtn(sortBtnsDiv, postSortStartDate);

        postCardsDiv.innerHTML = "";

        fetchPosts("start date")
        .then((response) =>{
            for (const post of approvedPosts) {
                renderPost(post, postCardsDiv);
            }
        })
    }        
    return;
});

postSortEndDate.addEventListener("click", () => {
    if (!postSortEndDate.className.includes('active')) {
        changeSortBtn(sortBtnsDiv, postSortEndDate);

        postCardsDiv.innerHTML = "";

        fetchPosts("end date")
        .then((response) =>{
            for (const post of approvedPosts) {
                renderPost(post, postCardsDiv);
            }
        })
    }        
    return;
});

postSortCatSearch.addEventListener("click", () => {
    if (!postSortCatSearch.className.includes('active')) {
        changeSortBtn(sortBtnsDiv, postSortCatSearch);

        postCardsDiv.innerHTML = "";

        fetchPosts("in search of")
        .then((response) =>{
            for (const post of approvedPosts) {
                renderPost(post, postCardsDiv);
            }
        })
    }        
    return;
});

postSortCatGive.addEventListener("click", () => {
    if (!postSortCatGive.className.includes('active')) {
        changeSortBtn(sortBtnsDiv, postSortCatGive);

        postCardsDiv.innerHTML = "";

        fetchPosts("to give away")
        .then((response) =>{
            for (const post of approvedPosts) {
                renderPost(post, postCardsDiv);
            }
        })
    }        
    return;
});

postSortCatShare.addEventListener("click", () => {
    if (!postSortCatShare.className.includes('active')) {
        changeSortBtn(sortBtnsDiv, postSortCatShare);

        postCardsDiv.innerHTML = "";

        fetchPosts("something to share")
        .then((response) =>{
            for (const post of approvedPosts) {
                renderPost(post, postCardsDiv);
            }
        })
    }        
    return;
});