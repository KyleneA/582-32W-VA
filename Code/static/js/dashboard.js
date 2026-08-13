import { fetchAdmins, fetchResidents, fetchAnnouncements, fetchPosts } from "./api.js";
import { renderAdmins, renderAnnouncements } from "./ui.js"
import Announcement from "./Announcement.js";
import { AnnouncementCard } from "./AnnouncementCard.js";

fetchAdmins()


fetchAnnouncements()
.then((response) => {
    const dashboardAnnouncements = document.querySelector("section.dashboard div.container div.announcements");

    for (const announcement of response) {
        const announcementCard = document.createElement('announcement-card');
        announcementCard.announcementDetails = Announcement.fromObject(announcement);

        dashboardAnnouncements.appendChild(announcementCard);
    }

})