import Admin from "./Admin.js";
import Announcement from "./Announcement.js";
import { AnnouncementCard } from "./AnnouncementCard.js";
import Post from "./Post.js";
import { PostCard } from "./PostCard.js";

export function renderAdmins(response, adminList) {
    adminList.innerHTML = "";

    const template = document.querySelector('.template-admin-display');

    for (const user of response) {
        const userObj = Admin.fromObject(user);

        const clone = template.content.cloneNode(true);

        const nameH3 = clone.querySelector('.name');
        nameH3.textContent = userObj.displayName;

        const emailP = clone.querySelector('.email');
        emailP.textContent = userObj.email;

        const editA = clone.querySelector('.btn.edit');
        editA.href = `/user/${userObj.role}/${userObj.id}/edit`

        const deleteForm = clone.querySelector('.delete-user');
        deleteForm.action = `/user/${userObj.role}/${userObj.id}/delete`

        adminList.appendChild(clone);
    }
}


export function renderAnnouncement(announcement, cardsDiv, isImmediate, isManage) {
    const announcementCard = document.createElement('announcement-card');
    announcementCard.announcementDetails = Announcement.fromObject(announcement);

    if (isImmediate) {
        announcementCard.section = cardsDiv;
        announcementCard.highlight = true;
    }

    if (isManage) {
        announcementCard.isManagePage = true;
    }
    
    cardsDiv.appendChild(announcementCard);
}

export function renderAnnouncements(response, cardsDiv, isManage) {
    cardsDiv.innerHTML = "";

    if (response.length === 0) {
        cardsDiv.textContent = "There are currently no announcements."
    }

    for (const announcement of response) {
        renderAnnouncement(announcement, cardsDiv, false);
    }
}

function addManageAnnouncementBtns(cardBtnsDiv, announcement) {
    const manageBtnsDiv = document.createElement('div');
    manageBtnsDiv.className = "button-div"
    cardBtnsDiv.appendChild(manageBtnsDiv);

    const editBtn = document.createElement('a');
        editBtn.className = "btn edit";
        editBtn.textContent = "edit announcement"
        editBtn.href = `/announcement/edit/${announcement.id}`;
        manageBtnsDiv.appendChild(editBtn);
        
        if (announcement.status === 'posted') {
            const archiveForm = document.createElement('form');
            archiveForm.innerHTML = `<form>
            <button class="btn archive" type="submit">archive announcement</button>
            </form>`;
            archiveForm.method = "POST";
            archiveForm.action = `/announcement/archive/${announcement.id}`;
            manageBtnsDiv.appendChild(archiveForm);
        }
        
        const deleteForm = document.createElement('form');
        deleteForm.innerHTML = `<form>
        <button class="btn delete" type="submit">delete announcement</button>
        </form>`;
        deleteForm.action = `/announcement/delete/${announcement.id}`;
        deleteForm.method = "POST";
        manageBtnsDiv.appendChild(deleteForm);

        deleteForm.addEventListener("click", (event) => {
            event.preventDefault();

            if (confirm("Are you sure you want to delete this announcement?")) {
                deleteForm.submit();
            }

            return;
        });
}

export function renderManageAnnouncements(response, cardsDiv, displayedStatus) {
    cardsDiv.innerHTML = "";

    const postedAnnouncements = response.filter((announcement) => announcement.status === displayedStatus);

    if (postedAnnouncements.length === 0) {
        cardsDiv.textContent = "There are currently no announcements."
    }

    for (const announcement of postedAnnouncements) {
        const cardBtnsDiv = document.createElement('div');
        cardBtnsDiv.className = 'card-btns';

        addManageAnnouncementBtns(cardBtnsDiv, announcement);

        renderAnnouncement(announcement, cardBtnsDiv, false, true);

        cardsDiv.appendChild(cardBtnsDiv);
    }
}

export function renderPost(post, cardsDiv, isManage) {
    const postCard = document.createElement('post-card');
    postCard.postDetails = Post.fromObject(post);

    if (isManage) {
        postCard.isManagePage = true;
    }
    
    cardsDiv.appendChild(postCard);
}

export function changeSortBtn(btnsDiv, clickedBtn) {
    for (const btn of btnsDiv.childNodes) {
        btn.className = "btn";
    }

    clickedBtn.className = "btn active";
    return;
}

function addManagePostBtns(cardBtnsDiv, post, userPosts) {
    const manageBtnsDiv = document.createElement('div');
    manageBtnsDiv.className = "button-div"
    cardBtnsDiv.appendChild(manageBtnsDiv);
    
    if (userPosts.className.includes('resident')) {
        const editBtn = document.createElement('a');
        editBtn.className = "btn edit";
        editBtn.textContent = "edit post"
        editBtn.href = `/post/edit/${post.id}`;
        manageBtnsDiv.appendChild(editBtn);
        
        const archiveForm = document.createElement('form');
        archiveForm.innerHTML = `<form>
        <button class="btn archive" type="submit">archive post</button>
        </form>`;
        archiveForm.action = `/post/archive/${post.id}`;
        archiveForm.method = "POST";
        manageBtnsDiv.appendChild(archiveForm);
        
        const deleteForm = document.createElement('form');
        deleteForm.innerHTML = `<form>
        <button class="btn delete" type="submit">delete post</button>
        </form>`;
        deleteForm.action = `/post/delete/${post.id}`;
        deleteForm.method = "POST";
        manageBtnsDiv.appendChild(deleteForm);

        deleteForm.addEventListener("click", (event) => {
            event.preventDefault();

            if (confirm("Are you sure you want to delete this announcement?")) {
                deleteForm.submit();
            }

            return;
        });
    }
    
    if (userPosts.className.includes('admin')) {
        if (!post.isApproved) {
            const approveForm = document.createElement('form');
            approveForm.innerHTML = `<form>
            <button class="btn approve" type="submit">approve post</button>
            </form>`;
            approveForm.action = `/post/approve/${post.id}`;
            approveForm.method = "POST";
            manageBtnsDiv.appendChild(approveForm);
        }
        
        const rejectForm = document.createElement('form');
        rejectForm.innerHTML = `<form>
        <button class="btn reject" type="submit"></button>
        </form>`;
        rejectForm.method = "POST";

        if (post.status === 'pending') {
            rejectForm.action = `/post/reject/${post.id}`;
            rejectForm.firstElementChild.textContent = 'reject post';
        } else if (post.status === 'approved') {
            rejectForm.action =`/post/reject/${post.id}`;
            rejectForm.firstElementChild.textContent = 'unapprove post';
            rejectForm.firstElementChild.className = 'btn reject unapprove';
        } else if (post.status === 'rejected') {
            rejectForm.action =`/post/archive/${post.id}`;
            rejectForm.firstElementChild.textContent = 'remove post';
        }
        manageBtnsDiv.appendChild(rejectForm);
    }
}

export function renderManagePostCard(response, postStatusDisplayed, userPosts) {
    const postsWithStatus = response.filter((post) => post.status === postStatusDisplayed);
        
        if (postsWithStatus.length === 0) {
            userPosts.textContent = `There are currently no ${postStatusDisplayed} posts.`;
            
            return;
        }
        
        for (const post of postsWithStatus) {
            const cardBtnsDiv = document.createElement('div');
            cardBtnsDiv.className = 'card-btns';
    
            addManagePostBtns(cardBtnsDiv, post, userPosts);
            
            renderPost(post, cardBtnsDiv, true);
    
            userPosts.appendChild(cardBtnsDiv);
        }
}