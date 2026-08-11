function renderAdmins(admins) {
    const adminsList = document.createElement("ul");
    
    if (admins.length === 0) {
        adminsList.innerHTML = `<li>No admins has been added.</li>`;
        
        return;
    }
    
    // render each item and add to HTML
    admins.forEach((admin) => {
        const listItem = document.createElement("li");
    
        listItem.textContent = `${admin.name} - ${admin.role}`;
    
        adminsList.appendChild(listItem);
    });

    section.append(adminsList);
}


function renderAnnouncements(announcements) {
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
