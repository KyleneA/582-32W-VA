import os
from dotenv import load_dotenv

from flask_login import (LoginManager, current_user, login_required, login_user, logout_user)

from config import app
from models import db, User, Admin, Resident

from sqlalchemy import Date, DateTime
from datetime import date, datetime

login_manager = LoginManager()
login_manager.login_view = "login"

login_manager.init_app(app)

with app.app_context():
    db.create_all()
    
    # For creating Resident
    # string_date = "2026-08-04"
    # dt = datetime.strptime(string_date,  "%Y-%m-%d")
    # resident1 = Resident(name="Thomas Train", email="ttrain@email.com", apartment="101A", locker_location="2-100", lease_date=dt.date(), parking_status="paid")

    # resident1.set_password("password")

    # db.session.add(resident1)
    # db.session.commit()

    # resident = Resident.query.filter_by(email="ttrain@email.com").first()

    # print(resident, resident.name, resident.locker_location)

@login_manager.user_loader
def load_user(polymorphic_id):
    if not polymorphic_id or ":" not in polymorphic_id:
        return None

    user_role, user_id = polymorphic_id.split(":", 1)

    if user_role == "admin":
        return db.session.get(Admin, int(user_id))

    if user_role == "resident":
        return db.session.get(Resident, int(user_id))

@app.route("/")
def home():
    return "Running"
