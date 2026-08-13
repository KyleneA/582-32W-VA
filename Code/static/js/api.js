export async function fetchAdmins() {
    const response = await fetch("/api/user/admin");

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