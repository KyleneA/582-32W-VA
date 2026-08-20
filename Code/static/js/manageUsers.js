import { fetchAdmins, fetchResidents } from "./api.js";
import { changeSortBtn, renderAdmins, renderResidents, displayError } from "./ui.js";
import Admin from "./Admin.js";

// Residents
const residentSection = document.querySelector('section.resident-users');
const residentList = residentSection.querySelector("div.container ul.resident-list");
const residentSortBtns = residentSection.querySelector("div.sorting-btns");
const errorMsgR = residentSection.querySelector('div.error-msg');

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
.catch((error) => {
    displayError(error, errorMsgR);
});

residentSortDefault.addEventListener(("click"), () => {
    if (!residentSortDefault.className.includes('active')) {
        fetchResidents("id")
        .then((response) => {
            changeSortBtn(residentSortBtns, residentSortDefault);
            
            renderResidents(response, residentList);
        })
        .catch((error) => {
            displayError(error, errorMsgR);
        });
    }

    return;
});

residentSortName.addEventListener(("click"), () => {
    if (!residentSortName.className.includes('active')) {
        fetchResidents("name")
        .then((response) => {
            changeSortBtn(residentSortBtns, residentSortName);
    
            renderResidents(response, residentList);
        })
        .catch((error) => {
            displayError(error, errorMsgR);
        });
    }

    return;
});

residentSortEmail.addEventListener(("click"), () => {
    if (!residentSortEmail.className.includes('active')) {
        fetchResidents("email")
        .then((response) => {
            changeSortBtn(residentSortBtns, residentSortEmail);
    
            renderResidents(response, residentList);
        })
        .catch((error) => {
            displayError(error, errorMsgR);
        });
    }

    return;
});

residentSortApartment.addEventListener(("click"), () => {
    if (!residentSortApartment.className.includes('active')) {
        fetchResidents("apartment")
        .then((response) => {
            changeSortBtn(residentSortBtns, residentSortApartment);
    
            renderResidents(response, residentList);
        })
        .catch((error) => {
            displayError(error, errorMsgR);
        });
    }

    return;
});

residentSortLease.addEventListener(("click"), () => {
    if (!residentSortLease.className.includes('active')) {
        fetchResidents("lease date")
        .then((response) => {
            changeSortBtn(residentSortBtns, residentSortLease);
    
            renderResidents(response, residentList);
        })
        .catch((error) => {
            displayError(error, errorMsgR);
        });
    }

    return;
});

residentSortParking.addEventListener(("click"), () => {
    if (!residentSortParking.className.includes('active')) {
        fetchResidents("parking status")
        .then((response) => {
            changeSortBtn(residentSortBtns, residentSortParking);
    
            renderResidents(response, residentList);
        })
        .catch((error) => {
            displayError(error, errorMsgR);
        });
    }

    return;
});


// Admins
const adminSection = document.querySelector('section.admin-users');
const adminList = adminSection.querySelector("div.container ul.admin-list");
const errorMsgA = adminSection.querySelector('div.error-msg');

const adminSortBtns = adminSection.querySelector("div.sorting-btns");
const adminSortDefault = adminSection.querySelector('#default');
const adminSortName = adminSection.querySelector('#name');
const adminSortEmail = adminSection.querySelector('#email');


// Admins
fetchAdmins("id")
.then((response) => {
    renderAdmins(response,adminList);
})
.catch((error) => {
    displayError(error, errorMsgA);
});

adminSortDefault.addEventListener(("click"), () => {
    if (!adminSortDefault.className.includes('active')) {
        fetchAdmins("id")
        .then((response) => {
            changeSortBtn(adminSortBtns, adminSortDefault);
            renderAdmins(response,adminList);
        })
        .catch((error) => {
            displayError(error, errorMsgA);
        });
    }

    return;
});

adminSortName.addEventListener(("click"), () => {
    if (!adminSortName.className.includes('active')) {
        fetchAdmins("name")
        .then((response) =>{
            changeSortBtn(adminSortBtns, adminSortName);
            renderAdmins(response, adminList);
        })
        .catch((error) => {
            displayError(error, errorMsgA);
        });
    }

    return;
});

adminSortEmail.addEventListener(("click"), () => {
    if (!adminSortEmail.className.includes('active')) {
        fetchAdmins("email")
        .then((response) =>{
            changeSortBtn(adminSortBtns, adminSortName);
            renderAdmins(response, adminList);
        })
        .catch((error) => {
            displayError(error, errorMsgA);
        });
    }

    return;
});