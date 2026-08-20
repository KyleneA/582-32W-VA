import { fetchUserPosts, fetchPosts } from "./api.js";
import { changeSortBtn, renderManagePostCard, displayError } from "./ui.js";

const userPostsDiv = document.querySelector(".user-posts-div");
const sortBtnsDiv = userPostsDiv.querySelector(".sorting-btns");
const userPosts = userPostsDiv.querySelector(".user-posts");
const errorMsg = userPostsDiv.querySelector('div.error-msg');

let postStatusDisplayed = "pending";

let posts = userPosts.className.includes('resident') ? fetchUserPosts('recent') : fetchPosts('recent');

posts
.then((response) => {
    renderManagePostCard(response, postStatusDisplayed, userPosts);
})
.catch((error) => {
    displayError(error, errorMsg)
});

// DISPLAY BUTTONS
const displayBtnsDiv = document.querySelector("div.display-btns");
const pendingDisplayBtn = displayBtnsDiv.querySelector("div.display-btns button#btn-pending");
const approvedDisplayBtn = displayBtnsDiv.querySelector("div.display-btns button#btn-approved");
const rejectedDisplayBtn = displayBtnsDiv.querySelector("div.display-btns button#btn-rejected");
const archivedDisplayBtn = displayBtnsDiv.querySelector("div.display-btns button#btn-archived");

// PENDING
pendingDisplayBtn.addEventListener("click", () => {
    if (!pendingDisplayBtn.className.includes('active')) {
        postStatusDisplayed = "pending";
        
        posts
        .then((response) => {
            changeSortBtn(displayBtnsDiv, pendingDisplayBtn);
            userPosts.innerHTML = "";
    
            renderManagePostCard(response, postStatusDisplayed, userPosts);
        })
        .catch((error) => {
            displayError(error, errorMsg)
        });
    }
});

// APPROVED
approvedDisplayBtn.addEventListener("click", () => {
    if (!approvedDisplayBtn.className.includes('active')) {
        postStatusDisplayed = "approved";
        
        posts
        .then((response) => {
            changeSortBtn(displayBtnsDiv, approvedDisplayBtn);
            userPosts.innerHTML = "";
    
            renderManagePostCard(response, postStatusDisplayed, userPosts);
        })
        .catch((error) => {
            displayError(error, errorMsg)
        });
    }
});

// REJECTED
rejectedDisplayBtn.addEventListener("click", () => {
    if (!rejectedDisplayBtn.className.includes('active')) {
        postStatusDisplayed = "rejected";
        
        posts
        .then((response) => {
            changeSortBtn(displayBtnsDiv, rejectedDisplayBtn);
            userPosts.innerHTML = "";
    
            renderManagePostCard(response, postStatusDisplayed, userPosts);
        })
        .catch((error) => {
            displayError(error, errorMsg)
        });
    }
});

// Archived
if (userPosts.className.includes('resident')) {
    archivedDisplayBtn.addEventListener("click", () => {
        if (!archivedDisplayBtn.className.includes('active')) {
            postStatusDisplayed = "archived";
            
            posts
            .then((response) => {
                changeSortBtn(displayBtnsDiv, archivedDisplayBtn);
                userPosts.innerHTML = "";
        
                renderManagePostCard(response, postStatusDisplayed, userPosts);
            })
            .catch((error) => {
                displayError(error, errorMsg)
            });
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
        posts = userPosts.className.includes('resident') ? fetchUserPosts('recent') : fetchPosts('recent');
        
        posts
        .then((response) =>{
            changeSortBtn(sortBtnsDiv, postSortRecent);
            
            userPosts.innerHTML = "";
    
            renderManagePostCard(response, postStatusDisplayed, userPosts);
        })
        .catch((error) => {
            displayError(error, errorMsg)
        });
    }
    
    return;
});

postSortOldest.addEventListener("click", () => {
    if (!postSortOldest.className.includes('active')) {
        posts = userPosts.className.includes('resident') ? fetchUserPosts('oldest') : fetchPosts('oldest');
        
        posts
        .then((response) =>{
            changeSortBtn(sortBtnsDiv, postSortOldest);
    
            userPosts.innerHTML = "";
    
            renderManagePostCard(response, postStatusDisplayed, userPosts);
        })
        .catch((error) => {
            displayError(error, errorMsg)
        });
    }

    return;
});

postSortTitle.addEventListener("click", () => {
    if (!postSortTitle.className.includes('active')) {
        posts = userPosts.className.includes('resident') ? fetchUserPosts('title') : fetchPosts('title');
        
        posts
        .then((response) =>{
            changeSortBtn(sortBtnsDiv, postSortTitle);
    
            userPosts.innerHTML = "";
    
            renderManagePostCard(response, postStatusDisplayed, userPosts);
        })
        .catch((error) => {
            displayError(error, errorMsg)
        });
    }

    return;
});

postSortStartDate.addEventListener("click", () => {
    if (!postSortStartDate.className.includes('active')) {
        posts = userPosts.className.includes('resident') ? fetchUserPosts('start date') : fetchPosts('start date');
        
        posts
        .then((response) =>{
            changeSortBtn(sortBtnsDiv, postSortStartDate);
    
            userPosts.innerHTML = "";
    
            renderManagePostCard(response, postStatusDisplayed, userPosts);
        })
        .catch((error) => {
            displayError(error, errorMsg)
        });
    }

    return;
});

postSortEndDate.addEventListener("click", () => {
    if (!postSortEndDate.className.includes('active')) {
        posts = userPosts.className.includes('resident') ? fetchUserPosts('end date') : fetchPosts('end date');
        
        posts
        .then((response) =>{
            changeSortBtn(sortBtnsDiv, postSortEndDate);
    
            userPosts.innerHTML = "";
    
            renderManagePostCard(response, postStatusDisplayed, userPosts);
        })
        .catch((error) => {
            displayError(error, errorMsg)
        });
    }
    
    return;
});

postSortCatSearch.addEventListener("click", () => {
    if (!postSortCatSearch.className.includes('active')) {
        posts = userPosts.className.includes('resident') ? fetchUserPosts('in search of') : fetchPosts('in search of');
        
        posts
        .then((response) =>{
            changeSortBtn(sortBtnsDiv, postSortCatSearch);
    
            userPosts.innerHTML = "";
    
            renderManagePostCard(response, postStatusDisplayed, userPosts);
        })
        .catch((error) => {
            displayError(error, errorMsg)
        });
    }

    return;
});

postSortCatGive.addEventListener("click", () => {
    if (!postSortCatGive.className.includes('active')) {
        posts = userPosts.className.includes('resident') ? fetchUserPosts('to give away') : fetchPosts('to give away');
        
        posts
        .then((response) =>{
            changeSortBtn(sortBtnsDiv, postSortCatGive);
    
            userPosts.innerHTML = "";
    
            renderManagePostCard(response, postStatusDisplayed, userPosts);
        })
        .catch((error) => {
            displayError(error, errorMsg)
        });
    }      
    
    return;
});

postSortCatShare.addEventListener("click", () => {
    if (!postSortCatShare.className.includes('active')) {
        posts = userPosts.className.includes('resident') ? fetchUserPosts('something to share') : fetchPosts('something to share');
        
        posts
        .then((response) => {
            changeSortBtn(sortBtnsDiv, postSortCatShare);
    
            userPosts.innerHTML = "";
    
            renderManagePostCard(response, postStatusDisplayed, userPosts);
        })
        .catch((error) => {
            displayError(error, errorMsg)
        });
    } 
        
    return;
});