const section = document.querySelector("section.dashboard");
console.log(section);

async function getAdmins() {
    const response = await fetch("/api/user/admin");

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return response.json();
}

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

const admins = await getAdmins();

renderAdmins(admins);

async function getAnnouncements() {
    const response = await fetch("/api/content/announcement");

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return response.json();
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

const announcements = await getAnnouncements();

renderAnnouncements(announcements);