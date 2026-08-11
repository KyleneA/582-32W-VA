export async function getAdmins() {
    const response = await fetch("/api/user/admin");

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return response.json();
}

export async function getResidents() {
    const response = await fetch("/api/user/resident");

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return response.json();
}

export async function getAnnouncements() {
    const response = await fetch("/api/content/announcement");

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return response.json();
}

export async function getPosts() {
    const response = await fetch("/api/content/post");

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return response.json();
}