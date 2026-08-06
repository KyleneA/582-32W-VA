# Week 2 | Backend Foundation
> "In general, I believe you're on the right track to finish the project. I think the scope should be fine, however you have to have the backend locked this week to make sure you'll have time for everything. *Don't worry about the frontend design for deliverable 2 and make sure that the backend is bug free as much as possible* and then you can test it properly when the frontend is implemented and integrated."

Required Deliverables:
- [x] application starts correctly
- [x] environment configuration works
- [x] database can be created
- [x] core models exist
- [x] relationships function
- [x] authentication functions if required
- [x] at least one create workflow
- [x] at least one read workflow
- [x] validation is demonstrated
- [x] data persists in the database
- [x] Git history shows meaningful progression

## Monday, Aug 03 2026
> [!Note]
> [Useful frontend/backend integration resource](https://realpython.com/flask-javascript-frontend-for-rest-api/)
> [REST API Tutorial](https://youtu.be/z3YMz-Gocmw?si=hbrAzc5Em4vXagau)
> [Python & JS full stack tutorial](https://youtu.be/PppslXOR7TA?si=rqHpr-dPBJM6t0I1)
> [multiple users flask login](https://stackoverflow.com/questions/47973490/multiple-user-for-flask-login)
> [sqlalchemy inheritance](https://docs.sqlalchemy.org/en/21/orm/inheritance.html)

### Tasks done today
- researched how to set authorization for more than one user type
- wrote out the base for flask app into 3 separate files
- started working on the user database models code

### What is blocking me?
- the solutions found online seemed a bit complex for my application so I have been thinking about how I can simplify them

### To Do
- [x] work on database user models
- [x] start on database content models

## Tuesday, Aug 04 2026
> [!NOTE]
> [Flaks-SQLAlchemy Tutorial using SQLAlchemy ORM](https://youtu.be/L1hRlGR_V_0?si=BIgH8pUYkxf8ByVV)
> [SQLAlchemy one to many relationship](https://youtu.be/3N9JqtpkFJI?si=U7oKJrJBm1P7SKX9)
### Tasks done today
- Set up app base
- Created and tested database user models & load user logic
- Set up page rendering for testing home, login and logout routes
- Created routing and template for adding a new user to be able to test next functions

### What is blocking me?
- I kind of got stuck thinking about how admin would send residents the accounts, how residents would set their password since its a required column

### To Do
- [x] add validation to creating users
- [x] separate routing for creating Resident vs Admin
- [] create and display announcements and posts

## Wednesday, Aug 05 2026
### Tasks done today
- added validation to creating users
- created and added validations for creating announcements
- created preliminary dashboard
- created api routes for accessing all users and content

### What is blocking me?
- I am still thinking about how residents will be able to set up their account after admin creates the account

### To Do
- [ ] create posts route
- [ ] figure out how I want to display posts and announcement (integrated sorted by date vs separate tabs type of view)
- [ ]

## Thursday, Aug 06 2026
### Tasks done today
- ...

### What is blocking me?
- currently thinking that I can add has logged in column to the users page that would direct new users to reset password upon first login

### To Do
- [ ] 