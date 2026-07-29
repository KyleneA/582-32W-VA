# 582-32W-VA | Web Project 1
> [!note]
> Relevant links:
> [Task Board](https://docs.google.com/spreadsheets/d/15zLd31JY0NQlfsA56kHXHvdHl8BFEj11LDNxC7QleA0/edit?usp=sharing)

## Project Summary
For web project 1, I am developping a website that can be used by administration staff and tenants of an apartment complex to display important information or announcements from admin and community posts from tenants that can help foster a sense of community within the complex. 

### Frontend Track
Flask & JavaScript

### The Problem
It can be difficult to ensure that all residents receive important announcements and notices in a timely manner seeing as not all residents access common areas daily especially for important short notice changes. Fostering a sense of community among residents can also help ensure that the important information can be shared with the whole complex. 

### Client Needs and Target Users
Needs:
- Centralized location where residents can access ongoing projects, construction plans, planned outages, and other announcements the building admin may need to share.
- An area for building guidelines and how to contact building admin if needed
    - it would be nice if admin can change update this section in case of any changes
- Being able to create and delete accounts for tenants as they move in or out of the complex
- A space for residents to post about items they are giving away so that they don't just bring them and abandon them in the lobby
    - it may be best if admin staff has a system to approve what goes into this space to reduce unwanted solicitations
    - could be nice to have a set list of the categories residents are allowed to post about to guide the type of things that are added

Nice to haves:
- It would be nice to be able to have an area where they can see their parking pass status, locker location, and their lease renewal date
- It could also be useful to have a system that residents can use to let us know of needed repairs or their concerns when they are unable to come into the office to file in person during office hours.

Target Users:
- Building Administration Staff
- Building Residents 

### Project Scope
Description:
- Website where residents can easily access building administration announcements, building guidelines, and building administration contact information. Residants will also be able to post about set categories like (used item, in search of, something to share) which admin will approve.

Deliverables:
- Home page, 
- dashboard for authenticated users where announcements and posts will appear, 
- create announcement page for admin
- edit and delete announcement feature for admin
- create post page for residents that also contains posting guidelines
- edit and delete post feature for resident's own posts
- approve or decline post feature for resident posts

### Implementation Schedule

### Proposed Database Models & Relationships
![Primary Content Model](./Primary%20Content%20Model.png)
![User Model](./User%20Model.png)

### Route Endpoint List
ADMIN
```
Apartment Website
    ├── Home (Unauthenticated and Authenticated)
    ├── Dashboard (Authenticated)
        ├── Create_announcement (Authenticated)
        ├── Edit_announcement (Authenticated)
        ├── Delete_announcement (Authenticated)
        ├── Create_building_info (Authenticated)
        ├── Edit_building_info (Authenticated)
        └── Manage_posts (Authenticated)
```

Resident
```
Apartment Website
    ├── Home (Unauthenticated and Authenticated)
    ├── Dashboard (Authenticated)
        ├── Create_post (Authenticated)
        ├── Edit_post (Authenticated)
        └── Delete_post (Authenticated)
```