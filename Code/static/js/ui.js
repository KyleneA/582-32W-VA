import Admin from "./Admin.js";

export function renderAdmins(response, adminList, sortType) {
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


export function renderAnnouncements(announcements, section) {
    const announcementsList = document.createElement("ul");
    
    if (announcements.length === 0) {
        announcementsList.innerHTML = `<li>No announcements has been added.</li>`;
        
        return;
    }
    
    // render each item and add to HTML
    announcements.forEach((announcement) => {
        const listItem = document.createElement("li");
    
        listItem.textContent = `${announcement.title} - ${new Date(announcement.createdAt).toDateString()}`;
    
        announcementsList.appendChild(listItem);
    });

    section.append(announcementsList);
}
