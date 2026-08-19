import { fetchAdmins, fetchResidents } from "./api.js";
import { changeSortBtn, renderAdmins, renderResidents } from "./ui.js";
import Admin from "./Admin.js";

// Residents
const residentSection = document.querySelector('section.resident-users');
const residentList = residentSection.querySelector("div.container ul.resident-list");
const residentSortBtns = residentSection.querySelector("div.sorting-btns");


const residentSortDefault = residentSortBtns.querySelector('#default');
const residentSortName = residentSortBtns.querySelector('#name');
const residentSortEmail = residentSortBtns.querySelector('#email');
const residentSortApartment = residentSortBtns.querySelector('#apartment');
const residentSortLease = residentSortBtns.querySelector('#lease');
const residentSortParking = residentSortBtns.querySelector('#parking');

fetchResidents("id")
.then((response) => {
    renderResidents(response, residentList);
})

residentSortDefault.addEventListener(("click"), () => {
    if (!residentSortDefault.className.includes('active')) {
        changeSortBtn(residentSortBtns, residentSortDefault);

        fetchResidents("id")
        .then((response) => {
            renderResidents(response, residentList);
        })
    }

    return;
});

residentSortName.addEventListener(("click"), () => {
    if (!residentSortName.className.includes('active')) {
        changeSortBtn(residentSortBtns, residentSortName);

        fetchResidents("name")
        .then((response) => {
            renderResidents(response, residentList);
        })
    }

    return;
});

residentSortEmail.addEventListener(("click"), () => {
    if (!residentSortEmail.className.includes('active')) {
        changeSortBtn(residentSortBtns, residentSortEmail);

        fetchResidents("email")
        .then((response) => {
            renderResidents(response, residentList);
        })
    }

    return;
});

residentSortApartment.addEventListener(("click"), () => {
    if (!residentSortApartment.className.includes('active')) {
        changeSortBtn(residentSortBtns, residentSortApartment);

        fetchResidents("apartment")
        .then((response) => {
            renderResidents(response, residentList);
        })
    }

    return;
});

residentSortLease.addEventListener(("click"), () => {
    if (!residentSortLease.className.includes('active')) {
        changeSortBtn(residentSortBtns, residentSortLease);

        fetchResidents("lease date")
        .then((response) => {
            renderResidents(response, residentList);
        })
    }

    return;
});

residentSortParking.addEventListener(("click"), () => {
    if (!residentSortParking.className.includes('active')) {
        changeSortBtn(residentSortBtns, residentSortParking);

        fetchResidents("parking status")
        .then((response) => {
            renderResidents(response, residentList);
        })
    }

    return;
});


// Admins
const adminSection = document.querySelector('section.admin-users');
const adminList = adminSection.querySelector("div.container ul.admin-list");
const adminSortDefault = adminSection.querySelector('#default');
const adminSortName = adminSection.querySelector('#name');
const adminSortEmail = adminSection.querySelector('#email');

// Admins
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