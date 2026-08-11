import { getAdmins, getResidents, getAnnouncements, getPosts } from "./api.js";

const section = document.querySelector("section.dashboard");

const admins = await getAdmins();

renderAdmins(admins);

const announcements = await getAnnouncements();

renderAnnouncements(announcements);