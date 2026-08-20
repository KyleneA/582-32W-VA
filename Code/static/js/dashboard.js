import { fetchAnnouncements, fetchPosts } from "./api.js";

import Announcement from "./Announcement.js";
import { AnnouncementCard } from "./AnnouncementCard.js";
import Post from "./Post.js";
import { PostCard } from "./PostCard.js";
import { displayError, renderAnnouncement, renderAnnouncements, renderPost, changeSortBtn } from "./ui.js";

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
.catch((error) => {
    displayError(error, immediateAnnouncements);
});

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
const errorMsgA = dashboardAnnouncements.querySelector("div.error-msg");

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
.catch((error) => {
    displayError(error, errorMsgA);
});

// SORT BUTTONS LOGIC
const announcementSortBtnsDiv = dashboardAnnouncements.querySelector('div.sorting-btns');
const announcementSortRecent = announcementSortBtnsDiv.querySelector("#recent");
const announcementSortOldest = announcementSortBtnsDiv.querySelector("#id");
const announcementSortTitle = announcementSortBtnsDiv.querySelector("#title");
const announcementSortStartDate = announcementSortBtnsDiv.querySelector("#start-date");
const announcementSortEndDate = announcementSortBtnsDiv.querySelector("#end-date");

announcementSortRecent.addEventListener("click", () => {
    if (!announcementSortRecent.className.includes('active')) {
        fetchAnnouncements("recent")
        .then((response) =>{
            changeSortBtn(announcementSortBtnsDiv, announcementSortRecent);
            
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
        .catch((error) => {
    
            displayError(error, errorMsgA);
        });
    }
    
    return;
});

announcementSortOldest.addEventListener("click", () => {
    if (!announcementSortOldest.className.includes('active')) {
        fetchAnnouncements("oldest")
        .then((response) =>{
            changeSortBtn(announcementSortBtnsDiv, announcementSortOldest);
            
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
        .catch((error) => {
            displayError(error, errorMsgA);
        });
    }
    
    return;
});

announcementSortTitle.addEventListener("click", () => {
    if (!announcementSortTitle.className.includes('active')) {
        fetchAnnouncements("title")
        .then((response) =>{
            changeSortBtn(announcementSortBtnsDiv, announcementSortTitle);
            
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
        .catch((error) => {
    
            displayError(error, errorMsgA);
        });
    }
    
    return;
});

announcementSortStartDate.addEventListener("click", () => {
    if (!announcementSortStartDate.className.includes('active')) {
        fetchAnnouncements("start-date")
        .then((response) =>{
            changeSortBtn(announcementSortBtnsDiv, announcementSortStartDate);
    
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
        .catch((error) => {
    
            displayError(error, errorMsgA);
        });
    }
    
    return;
});

announcementSortEndDate.addEventListener("click", () => {
    if (!announcementSortEndDate.className.includes('active')) {
        fetchAnnouncements("end-date")
        .then((response) =>{
            changeSortBtn(announcementSortBtnsDiv, announcementSortEndDate);
            
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
        .catch((error) => {
            displayError(error, errorMsgA);
        });
    }

    return;
});

// GETTING AND DISPLAYING POSTS
const dashboardPosts = document.querySelector("section.dashboard div.container div.posts-div");
const postCardsDiv = dashboardPosts.querySelector("div.post-cards");
const errorMsgP = dashboardPosts.querySelector("div.error-msg");

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
.catch ((error) => {
    displayError(error, errorMsgP);
});

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
        fetchPosts("recent")
        .then((response) =>{
            changeSortBtn(sortBtnsDiv, postSortRecent);
            
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
        .catch ((error) => {
            displayError(error, errorMsgP);
        });
    }
});

postSortOldest.addEventListener("click", () => {
    if (!postSortOldest.className.includes('active')) {
        fetchPosts("oldest")
        .then((response) =>{
            changeSortBtn(sortBtnsDiv, postSortOldest);
    
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
        .catch ((error) => {
            displayError(error, errorMsgP);
        });
    }
});

postSortTitle.addEventListener("click", () => {
    if (!postSortTitle.className.includes('active')) {
        fetchPosts("title")
        .then((response) =>{
            changeSortBtn(sortBtnsDiv, postSortTitle);
    
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
        .catch ((error) => {
            displayError(error, errorMsgP);
        });
    }
});

postSortStartDate.addEventListener("click", () => {
    if (!postSortStartDate.className.includes('active')) {
        fetchPosts("start date")
        .then((response) =>{
            changeSortBtn(sortBtnsDiv, postSortStartDate);
    
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
        .catch ((error) => {
            displayError(error, errorMsgP);
        });
    }
});

postSortEndDate.addEventListener("click", () => {
    if (!postSortEndDate.className.includes('active')) {
        fetchPosts("end date")
        .then((response) =>{
            changeSortBtn(sortBtnsDiv, postSortEndDate);
    
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
        .catch ((error) => {
            displayError(error, errorMsgP);
        });
    }
});

postSortCatSearch.addEventListener("click", () => {
    if (!postSortCatSearch.className.includes('active')) {
        fetchPosts("in search of")
        .then((response) =>{
            changeSortBtn(sortBtnsDiv, postSortCatSearch);
            
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
        .catch ((error) => {
            displayError(error, errorMsgP);
        });
    }
});

postSortCatGive.addEventListener("click", () => {
    if (!postSortCatGive.className.includes('active')) {
        fetchPosts("to give away")
        .then((response) =>{
            changeSortBtn(sortBtnsDiv, postSortCatGive);
    
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
        .catch ((error) => {
            displayError(error, errorMsgP);
        });
    }
});

postSortCatShare.addEventListener("click", () => {
    if (!postSortCatShare.className.includes('active')) {
        fetchPosts("something to share")
        .then((response) =>{
            changeSortBtn(sortBtnsDiv, postSortCatShare);
    
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
        .catch ((error) => {
            displayError(error, errorMsgP);
        });
    }
});