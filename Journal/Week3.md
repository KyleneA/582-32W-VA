# Week 3 | Integrated Prototype
- [x] frontend connected to the backend
- [x] real database content displayed
- [ ] primary workflow works from beginning to end
- [x] user input is validated
- [x] successful actions provide feedback
- [x] errors are visible to the user
- [x] navigation is functional
- [ ] responsive design is substantially implemented
- [x] interface matches the design direction
- [x] no major feature relies on hard-coded placeholder data

*The application may still require cleanup, but its main purpose should already work.*

## Monday Aug 10 2026
### Tasks done today
- creating building information related databases
- working on editing building information template
- creating admin and resident js classes for easier display
- refactoring base code in dashboard.js to separate logic

### What is blocking me?
- 

### To Do
- [x] finish edit building template
- [x] create test edit and delete routes for users and content
~~- [ ] build custom elements to display users and content ~~


## Tuesday Aug 11 2026
### Tasks done today
- finished the add_info.html page (renamed from edit building template)
- reworked first login logic flow for first admin to be `login -> reset password -> set building info (contains default values as placeholders)`
- added logic to add building information to db (proper validation not yet implemented)


### What is blocking me?
- I was having trouble with how to design the form, particularly for the time inputs debating if I should have the time for each day to have separate columns in the table
- using dicts decided to organise form inputs and keep table columns to a minimum
- adding global styling to website using root variables

### To Do
- [ ] display users (focusing on admin flows for now)
- [ ] display content (announcements) to be able to present what it will look like (will be similar for posts)
- [ ] implement missing routing to edit and delete content & users


## Wednesday Aug 12 2026
### Tasks done today
- worked on logic to display admin users in users.html
- created announcement class and custom element to display announcements in dashboard
- reformatted html pages most important for presenting progress to display page name in banner and add script blocks where necessary (also adding cancel buttons to most pages)
- added quick access buttons to dashboard linking to manage users and announcements (admin) and posts (residents)

### What is blocking me?
- because there are a few different column names for the admin and announcement tables, I made a few typos that were hard for me to locate. That took me a while to identify.

### To Do
- [ ] catch errors for all fetch types


## Thursday-Sunday, Aug 13-16 2026
### Tasks done today
- implemented "highlight" feature to display immediate urgency announcements at the top of the page
- refactored app routing with blueprints to more easily see missing features and more easily make changes (main (authentication & home/dashboard), users (admin & resident), content (announcement, post, building info), api)
- added sorting display for announcements and admin
- improved immediate announcement section by checking contents if section had any content in it and removing the section from main if empty
- added a sortType to all api to be able to more easily implement sorting logic without having to create several different routes
- added a status column to content tables to allow for more easy filtering in manage post page.
- created flow for initial set up (ex: after forking repo) => create admin user -> login -> reset password -> set building information
- improving announcement display flow
- created and implemented display of post custom element using Post class
- created base med-fidelity design for manage announcement page to guide process
- created macros for announcement and post templates to be able to used them on manage pages
- finished resident view of manage pages

### What is blocking me?
- I was having trouble trying to figure out which element I should be looking at to determine if the section is empty because I slipped my mind that the setting display none doesn't removed the element from the node.
- it slipped my mind that the isApproved attribute is initially set to false so the Post class instances wouldnt be created since I set it to throw an error !isApproved. 
    - In Post class constructor, I changed the logic to `obj.isApproved ? obj.isApproved === true : false` and in the fromObject method set the check to look that the type of isApproved so that it won't automatically throw an error if the post is set to false

### To Do
- [ ] post approval logic
- [ ] manage announcements
- [ ] add buttons to edit/delete admins in manage users
- [ ] add residents display with edit/delete in manage users
- [ ] decide if edited posts should be set to pending again