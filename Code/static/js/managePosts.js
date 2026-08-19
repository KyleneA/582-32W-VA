import { fetchUserPosts, fetchPosts } from "./api.js";
import { changeSortBtn, renderPost, renderManagePostCard } from "./ui.js";

const userPostsDiv = document.querySelector(".user-posts-div");
const sortBtnsDiv = userPostsDiv.querySelector(".sorting-btns");
const userPosts = userPostsDiv.querySelector(".user-posts");

let postStatusDisplayed = "pending";

let posts = userPosts.className.includes('resident') ? fetchUserPosts('recent') : fetchPosts('recent');

posts
.then((response) => {
    renderManagePostCard(response, postStatusDisplayed, userPosts);
})

// DISPLAY BUTTONS
const displayBtnsDiv = document.querySelector(".display-btns")
const pendingDisplayBtn = displayBtnsDiv.querySelector("div.display-btns button#btn-pending");
const approvedDisplayBtn = displayBtnsDiv.querySelector("div.display-btns button#btn-approved");
const rejectedDisplayBtn = displayBtnsDiv.querySelector("div.display-btns button#btn-rejected");
const archivedDisplayBtn = displayBtnsDiv.querySelector("div.display-btns button#btn-archived");

// PENDING
pendingDisplayBtn.addEventListener("click", () => {
    if (!pendingDisplayBtn.className.includes('active')) {
        changeSortBtn(displayBtnsDiv, pendingDisplayBtn);
        userPosts.innerHTML = "";

        postStatusDisplayed = "pending";

        posts
        .then((response) => {
            renderManagePostCard(response, postStatusDisplayed, userPosts);
        })
    }
});

// APPROVED
approvedDisplayBtn.addEventListener("click", () => {
    if (!approvedDisplayBtn.className.includes('active')) {
        changeSortBtn(displayBtnsDiv, approvedDisplayBtn);
        userPosts.innerHTML = "";

        postStatusDisplayed = "approved";
        
        posts
        .then((response) => {
            renderManagePostCard(response, postStatusDisplayed, userPosts);
        })
    }
});

// REJECTED
rejectedDisplayBtn.addEventListener("click", () => {
    if (!rejectedDisplayBtn.className.includes('active')) {
        changeSortBtn(displayBtnsDiv, rejectedDisplayBtn);
        userPosts.innerHTML = "";

        postStatusDisplayed = "rejected";
        
        posts
        .then((response) => {
            renderManagePostCard(response, postStatusDisplayed, userPosts);
        })
    }
});

// Archived
if (userPosts.className.includes('resident')) {
    archivedDisplayBtn.addEventListener("click", () => {
        if (!archivedDisplayBtn.className.includes('active')) {
            changeSortBtn(displayBtnsDiv, archivedDisplayBtn);
            userPosts.innerHTML = "";
    
            postStatusDisplayed = "archived";
            
            posts
            .then((response) => {
                renderManagePostCard(response, postStatusDisplayed, userPosts);
            })
        }
    });
}


// Sorting btns
const postSortRecent = userPostsDiv.querySelector("#recent");
const postSortOldest = userPostsDiv.querySelector("#id");
const postSortTitle = userPostsDiv.querySelector("#title");
const postSortStartDate = userPostsDiv.querySelector("#start-date");
const postSortEndDate = userPostsDiv.querySelector("#end-date");
const postSortCatSearch = userPostsDiv.querySelector("#category-search");
const postSortCatGive = userPostsDiv.querySelector("#category-give");
const postSortCatShare = userPostsDiv.querySelector("#category-share");

postSortRecent.addEventListener("click", () => {
    if (!postSortRecent.className.includes('active')) {
        changeSortBtn(sortBtnsDiv, postSortRecent);
        
        userPosts.innerHTML = "";

        posts = userPosts.className.includes('resident') ? fetchUserPosts('recent') : fetchPosts('recent');

        posts
        .then((response) =>{
            renderManagePostCard(response, postStatusDisplayed, userPosts);
        })
    }
    
    return;
});

postSortOldest.addEventListener("click", () => {
    if (!postSortOldest.className.includes('active')) {
        changeSortBtn(sortBtnsDiv, postSortOldest);

        userPosts.innerHTML = "";

        posts = userPosts.className.includes('resident') ? fetchUserPosts('oldest') : fetchPosts('oldest');

        posts
        .then((response) =>{
            renderManagePostCard(response, postStatusDisplayed, userPosts);
        })
    }

    return;
});

postSortTitle.addEventListener("click", () => {
    if (!postSortTitle.className.includes('active')) {
        changeSortBtn(sortBtnsDiv, postSortTitle);

        userPosts.innerHTML = "";

        posts = userPosts.className.includes('resident') ? fetchUserPosts('title') : fetchPosts('title');

        posts
        .then((response) =>{
            renderManagePostCard(response, postStatusDisplayed, userPosts);
        })
    }

    return;
});

postSortStartDate.addEventListener("click", () => {
    if (!postSortStartDate.className.includes('active')) {
        changeSortBtn(sortBtnsDiv, postSortStartDate);

        userPosts.innerHTML = "";

        posts = userPosts.className.includes('resident') ? fetchUserPosts('start date') : fetchPosts('start date');

        posts
        .then((response) =>{
            renderManagePostCard(response, postStatusDisplayed, userPosts);
        })
    }

    return;
});

postSortEndDate.addEventListener("click", () => {
    if (!postSortEndDate.className.includes('active')) {
        changeSortBtn(sortBtnsDiv, postSortEndDate);

        userPosts.innerHTML = "";

        posts = userPosts.className.includes('resident') ? fetchUserPosts('end date') : fetchPosts('end date');
        
        posts
        .then((response) =>{
            renderManagePostCard(response, postStatusDisplayed, userPosts);
        })
    }
    
    return;
});

postSortCatSearch.addEventListener("click", () => {
    if (!postSortCatSearch.className.includes('active')) {
        changeSortBtn(sortBtnsDiv, postSortCatSearch);

        userPosts.innerHTML = "";

        posts = userPosts.className.includes('resident') ? fetchUserPosts('in search of') : fetchPosts('in search of');

        posts
        .then((response) =>{
            renderManagePostCard(response, postStatusDisplayed, userPosts);
        })
    }

    return;
});

postSortCatGive.addEventListener("click", () => {
    if (!postSortCatGive.className.includes('active')) {
        changeSortBtn(sortBtnsDiv, postSortCatGive);

        userPosts.innerHTML = "";

        posts = userPosts.className.includes('resident') ? fetchUserPosts('to give away') : fetchPosts('to give away');

        posts
        .then((response) =>{
            renderManagePostCard(response, postStatusDisplayed, userPosts);
        })
    }      
    
    return;
});

postSortCatShare.addEventListener("click", () => {
    if (!postSortCatShare.className.includes('active')) {
        changeSortBtn(sortBtnsDiv, postSortCatShare);

        userPosts.innerHTML = "";

        posts = userPosts.className.includes('resident') ? fetchUserPosts('something to share') : fetchPosts('something to share');

        posts
        .then((response) => {
            renderManagePostCard(response, postStatusDisplayed, userPosts);
        })
    } 
        
    return;
});