import { fetchAnnouncements } from "./api.js";
import { changeSortBtn, renderAnnouncement, renderAnnouncements, renderManageAnnouncements } from "./ui.js";
import { AnnouncementCard } from "./AnnouncementCard.js";


const announcementsDiv = document.querySelector('section.announcements div.announcements-div');
const announcementCards = announcementsDiv.querySelector('div.announcement-cards');

console.log("announcements!", announcementsDiv, announcementCards);

fetchAnnouncements('recent')
.then((response) => {
    const postedAnnouncements = response.filter((announcement) => announcement.status === 'posted');

    renderManageAnnouncements(postedAnnouncements, announcementCards);
})