import { fetchUserPosts } from "./api.js";
import { changeSortBtn, renderPost } from "./ui.js";

// 3 fetches: pending, approved, rejected, & archived
// in each fetch sort buttons (need to provide inputs for post status displaying)

const userPostsDiv = document.querySelector(".user-posts-div");
const sortBtnsDiv = userPostsDiv.querySelector(".sorting-btns");
const userPosts = userPostsDiv.querySelector(".user-posts");

let postStatusDisplayed = "pending";

fetchUserPosts("recent")
.then((response) => {
    const postsWithStatus = response.filter((post) => post.status === postStatusDisplayed);
    
    if (postsWithStatus.length === 0) {
        userPosts.textContent = `There are currently no ${postStatusDisplayed} posts.`;
        
        return;
    }
    
    for (const post of postsWithStatus) {
        const cardBtnsDiv = document.createElement('div');
        cardBtnsDiv.className = 'card-btns';

        const manageBtnsDiv = document.createElement('div');
        manageBtnsDiv.className = "button-div"
        cardBtnsDiv.appendChild(manageBtnsDiv);
        
        const editBtn = document.createElement('a');
        editBtn.className = "btn edit";
        editBtn.textContent = "edit post"
        editBtn.href = `/post/edit/${post.id}`;
        manageBtnsDiv.appendChild(editBtn);
        
        const deleteForm = document.createElement('form');
        deleteForm.innerHTML = `<form>
        <button class="btn delete" type="submit">delete post</button>
        </form>`;
        deleteForm.action = `/post/delete/${post.id}`;
        deleteForm.method = "POST";
        manageBtnsDiv.appendChild(deleteForm);
        
        renderPost(post, cardBtnsDiv);

        userPosts.appendChild(cardBtnsDiv);
    }
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

        fetchUserPosts("recent")
        .then((response) => {
            const postsWithStatus = response.filter((post) => post.status === postStatusDisplayed);
            
    
            if (postsWithStatus.length === 0) {
                userPosts.textContent = `There are currently no ${postStatusDisplayed} posts.`;
                
                return;
            }
        
            for (const post of postsWithStatus) {
                renderPost(post, userPosts);
            }
        })
    }
});

// APPROVED
approvedDisplayBtn.addEventListener("click", () => {
    if (!approvedDisplayBtn.className.includes('active')) {
        changeSortBtn(displayBtnsDiv, approvedDisplayBtn);
        userPosts.innerHTML = "";

        postStatusDisplayed = "approved";
        
        fetchUserPosts("recent")
        .then((response) => {
            const postsWithStatus = response.filter((post) => post.status === postStatusDisplayed);
            
    
            if (postsWithStatus.length === 0) {
                userPosts.textContent = `There are currently no ${postStatusDisplayed} posts.`;
                
                return;
            }
        
            for (const post of postsWithStatus) {
                renderPost(post, userPosts)
            }
        })
    }
});

// REJECTED
rejectedDisplayBtn.addEventListener("click", () => {
    if (!rejectedDisplayBtn.className.includes('active')) {
        changeSortBtn(displayBtnsDiv, rejectedDisplayBtn);
        userPosts.innerHTML = "";

        postStatusDisplayed = "rejected";
        
        fetchUserPosts("recent")
        .then((response) => {
            const postsWithStatus = response.filter((post) => post.status === postStatusDisplayed);
            
    
            if (postsWithStatus.length === 0) {
                userPosts.textContent = `There are currently no ${postStatusDisplayed} posts.`;
                
                return;
            }
        
            for (const post of postsWithStatus) {
                renderPost(post, userPosts)
            }
        })
    }
});

// Archived
archivedDisplayBtn.addEventListener("click", () => {
    if (!archivedDisplayBtn.className.includes('active')) {
        changeSortBtn(displayBtnsDiv, archivedDisplayBtn);
        userPosts.innerHTML = "";

        postStatusDisplayed = "archived";
        
        fetchUserPosts("recent")
        .then((response) => {
            const postsWithStatus = response.filter((post) => post.status === postStatusDisplayed);
            
    
            if (postsWithStatus.length === 0) {
                userPosts.textContent = `There are currently no ${postStatusDisplayed} posts.`;
                
                return;
            }
        
            for (const post of postsWithStatus) {
                renderPost(post, userPosts)
            }
        })
    }
});


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

        fetchUserPosts("recent")
        .then((response) =>{
            const postsWithStatus = response.filter((post) => post.status === postStatusDisplayed);

            if (postsWithStatus.length === 0) {
                userPosts.textContent = `There are currently no ${postStatusDisplayed} posts.`;
        
                return;
            }

            for (const post of postsWithStatus) {
                renderPost(post, userPosts);
            }
        })
    }
    
    return;
});

postSortOldest.addEventListener("click", () => {
    if (!postSortOldest.className.includes('active')) {
        changeSortBtn(sortBtnsDiv, postSortOldest);

        userPosts.innerHTML = "";

        fetchUserPosts("oldest")
        .then((response) =>{
            const postsWithStatus = response.filter((post) => post.status === postStatusDisplayed);

            if (postsWithStatus.length === 0) {
                userPosts.textContent = `There are currently no ${postStatusDisplayed} posts.`;
        
                return;
            }

            for (const post of postsWithStatus) {
                renderPost(post, userPosts);
            }
        })
    }

    return;
});

postSortTitle.addEventListener("click", () => {
    if (!postSortTitle.className.includes('active')) {
        changeSortBtn(sortBtnsDiv, postSortTitle);

        userPosts.innerHTML = "";

        fetchUserPosts("title")
        .then((response) =>{
            const postsWithStatus = response.filter((post) => post.status === postStatusDisplayed);

            if (postsWithStatus.length === 0) {
                userPosts.textContent = `There are currently no ${postStatusDisplayed} posts.`;
        
                return;
            }

            for (const post of postsWithStatus) {
                renderPost(post, userPosts);
            }
        })
    }

    return;
});

postSortStartDate.addEventListener("click", () => {
    if (!postSortStartDate.className.includes('active')) {
        changeSortBtn(sortBtnsDiv, postSortStartDate);

        userPosts.innerHTML = "";

        fetchUserPosts("start date")
        .then((response) =>{
            const postsWithStatus = response.filter((post) => post.status === postStatusDisplayed);

            if (postsWithStatus.length === 0) {
                userPosts.textContent = `There are currently no ${postStatusDisplayed} posts.`;
        
                return;
            }

            for (const post of postsWithStatus) {
                renderPost(post, userPosts);
            }
        })
    }

    return;
});

postSortEndDate.addEventListener("click", () => {
    if (!postSortEndDate.className.includes('active')) {
        changeSortBtn(sortBtnsDiv, postSortEndDate);

        userPosts.innerHTML = "";

        fetchUserPosts("end date")
        .then((response) =>{
            const postsWithStatus = response.filter((post) => post.status === postStatusDisplayed);

            if (postsWithStatus.length === 0) {
                userPosts.textContent = `There are currently no ${postStatusDisplayed} posts.`;
        
                return;
            }

            for (const post of postsWithStatus) {
                renderPost(post, userPosts);
            }
        })
    }
    
    return;
});

postSortCatSearch.addEventListener("click", () => {
    if (!postSortCatSearch.className.includes('active')) {
        changeSortBtn(sortBtnsDiv, postSortCatSearch);

        userPosts.innerHTML = "";

        fetchUserPosts("in search of")
        .then((response) =>{
            const postsWithStatus = response.filter((post) => post.status === postStatusDisplayed);

            if (postsWithStatus.length === 0) {
                userPosts.textContent = `There are currently no ${postStatusDisplayed} posts with the category "In Search Of".`;
        
                return;
            }

            for (const post of postsWithStatus) {
                renderPost(post, userPosts);
            }
            })
    }

    return;
});

postSortCatGive.addEventListener("click", () => {
    if (!postSortCatGive.className.includes('active')) {
        changeSortBtn(sortBtnsDiv, postSortCatGive);

        userPosts.innerHTML = "";

        fetchUserPosts("to give away")
        .then((response) =>{
            const postsWithStatus = response.filter((post) => post.status === postStatusDisplayed);

            if (postsWithStatus.length === 0) {
                userPosts.textContent = `There are currently no ${postStatusDisplayed} posts with the category "To Give Away".`;
        
                return;
            }

                for (const post of postsWithStatus) {
                    renderPost(post, userPosts);
                }
            })
    }      
    
    return;
});

postSortCatShare.addEventListener("click", () => {
    if (!postSortCatShare.className.includes('active')) {
        changeSortBtn(sortBtnsDiv, postSortCatShare);

        userPosts.innerHTML = "";

        fetchUserPosts("something to share")
        .then((response) => {
            const postsWithStatus = response.filter((post) => post.status === postStatusDisplayed);

            if (postsWithStatus.length === 0) {
                userPosts.textContent = `There are currently no ${postStatusDisplayed} posts with the category "Something to Share".`;
        
                return;
            }

            for (const post of postsWithStatus) {
                renderPost(post, userPosts);
            }
        })
    } 
        
    return;
});