export async function fetchAdmins(sortType) {
    const response = await fetch(`/api/user/admin/${sortType}`);

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return await response.json();
}

export async function fetchResidents(sortType) {
    const response = await fetch(`/api/user/resident/${sortType}`);

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return await response.json();
}

export async function fetchAnnouncements(sortType) {
    const response = await fetch(`/api/content/announcement/${sortType}`);

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return await response.json();
}

export async function fetchPosts(sortType) {
    const response = await fetch(`/api/content/post/${sortType}`);

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return await response.json();
}