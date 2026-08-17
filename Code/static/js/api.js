export async function fetchAdmins(sortType) {
    const cleanSortType = sortType.replaceAll(" ", "-");
    const response = await fetch(`/api/user/admin/${cleanSortType}`);

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return await response.json();
}

export async function fetchResidents(sortType) {
    const cleanSortType = sortType.replaceAll(" ", "-");

    const response = await fetch(`/api/user/resident/${cleanSortType}`);

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return await response.json();
}

export async function fetchAnnouncements(sortType) {
    const cleanSortType = sortType.replaceAll(" ", "-");

    const response = await fetch(`/api/content/announcement/${cleanSortType}`);

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return await response.json();
}

export async function fetchPosts(sortType) {
    const cleanSortType = sortType.replaceAll(" ", "-");

    const response = await fetch(`/api/content/post/${cleanSortType}`);

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return await response.json();
}

export async function fetchUserPosts(sortType) {
    const cleanSortType = sortType.replaceAll(" ", "-");

    const response = await fetch(`/api/content/post/${cleanSortType}/user`);

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }
    
    return await response.json();
}