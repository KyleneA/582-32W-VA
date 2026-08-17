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


export function renderAnnouncements(response, cardsDiv) {
    cardsDiv.innerHTML = "";

    if (response.length === 0) {
        cardsDiv.textContent = "There are currently no announcements."
    }

    for (const announcement of response) {
        const announcementCard = document.createElement('announcement-card');
        announcementCard.announcementDetails = Announcement.fromObject(announcement);
        
        cardsDiv.appendChild(announcementCard);
    }
}

export function renderPost(post, cardsDiv) {
    const postCard = document.createElement('post-card');
    postCard.postDetails = Post.fromObject(post);
    
    cardsDiv.appendChild(postCard);
}

export function changeSortBtn(btnsDiv, clickedBtn) {
    for (const btn of btnsDiv.childNodes) {
        btn.className = "btn";
    }

    clickedBtn.className = "btn active";
    return;
}