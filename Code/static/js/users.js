console.log("users!");

import { fetchAdmins, fetchResidents } from "./api.js";
import { renderAdmins } from "./ui.js";

const residentList = document.querySelector("section.resident-users div.container ul.resident-list");
const adminList = document.querySelector("section.admin-users div.container ul.admin-list");

fetchAdmins()
.then((response) => {
    const template = document.querySelector('.template-admin-display');
    for (const user of response) {
        console.log(user.displayName, user.name);
        const clone = template.content.cloneNode(true);

        const nameH3 = clone.querySelector('.name');
        nameH3.textContent = user.displayName;

        const emailP = clone.querySelector('.email');
        emailP.textContent = user.email;

        const editA = clone.querySelector('.btn.edit');
        editA.href = `/user/${user.role}/${user.id}/edit`

        const deleteForm = clone.querySelector('.delete-user');
        deleteForm.action = `/user/${user.role}/${user.id}/delete`

        console.log(adminList, "loop!")
        adminList.appendChild(clone);
    }
})
