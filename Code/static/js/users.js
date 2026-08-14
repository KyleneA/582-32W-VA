import { fetchAdmins, fetchResidents } from "./api.js";
import { renderAdmins } from "./ui.js";
import Admin from "./Admin.js";

const residentList = document.querySelector("section.resident-users div.container ul.resident-list");

const adminSection = document.querySelector('section.admin-users');
const adminList = adminSection.querySelector("div.container ul.admin-list");
const adminSortDefault = adminSection.querySelector('#default');
const adminSortName = adminSection.querySelector('#name');
const adminSortEmail = adminSection.querySelector('#email');

fetchAdmins("id")
.then((response) => {
    renderAdmins(response,adminList);
})

adminSortDefault.addEventListener(("click"), () => {
    if (!adminSortDefault.className.includes('active')) {
        adminSortDefault.className = "btn active";
        adminSortName.className = "btn";
        adminSortEmail.className = "btn";

        fetchAdmins("id")
        .then((response) => {
            renderAdmins(response,adminList);
        })
    }

    return;
});

adminSortName.addEventListener(("click"), () => {
    if (!adminSortName.className.includes('active')) {
        adminSortDefault.className = "btn";
        adminSortName.className = "btn active";
        adminSortEmail.className = "btn";
        
        fetchAdmins("name")
        .then((response) =>{
            renderAdmins(response, adminList);
        })
    }

    return;
});

adminSortEmail.addEventListener(("click"), () => {
    if (!adminSortEmail.className.includes('active')) {
        adminSortDefault.className = "btn";
        adminSortName.className = "btn";
        adminSortEmail.className = "btn active";
        
        fetchAdmins("email")
        .then((response) =>{
            renderAdmins(response, adminList);
        })
    }

    return;
});