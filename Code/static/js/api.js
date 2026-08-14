export async function fetchAdmins(sortType) {
    const response = await fetch(`/api/user/admin/${sortType}`);

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return await response.json();
}

export async function fetchResidents() {
    const response = await fetch("/api/user/resident");

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return await response.json();
}

export async function fetchAnnouncements() {
    const response = await fetch("/api/content/announcement");

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return await response.json();
}

export async function fetchPosts() {
    const response = await fetch("/api/content/post");

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return await response.json();
}