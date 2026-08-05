import os
from dotenv import load_dotenv

from flask import render_template, url_for, redirect, request, flash
from flask_login import (LoginManager, current_user, login_required, login_user, logout_user)

from config import app
from models import db, User, Admin, Resident
from helperFunctions import find_user, convert_to_date, validate_apartment, validate_email, validate_lease_date, validate_locker, validate_name, validate_parking_status, validate_password, flash_errors

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
    return render_template("home.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if current_user.is_authenticated:
        return redirect(url_for("home")) # Change redirect url to dashboard

    if request.method == "POST":
        email = request.form["email"].strip()
        password = request.form["password"].strip()

        user = find_user(email)

        if user is None or not user.check_password(password):
            flash("Invalid username or password", "error")

            return render_template("login.html", email=email)
        
        login_user(user)
        flash(f"You are now logged in, {user.role}!", "success")

        return redirect(url_for("home"))

    return render_template("login.html")

@app.route("/logout", methods = ["POST"])
@login_required
def logout():
    logout_user()

    flash("You have been logged out", "success")

    return redirect(url_for("home"))


@app.route("/user/add", methods = ["GET", "POST"])
@login_required 
def user_add():
    if not current_user.role == "admin":
        return redirect(url_for("home")) # change redirect url to dashboard

    if request.method == "POST":
        user_role = request.form["user-role"]
        name = request.form["full-name"].strip()
        email = request.form["email"].strip()
        password = request.form["password"].strip()
        errors = []

        name_errors = validate_name(name)
        email_errors = validate_email(email)
        password_errors = validate_password(password)

        validation_results = [name_errors, email_errors, password_errors]

        if user_role == "resident":
            apartment = request.form["apartment"]
            locker = request.form["locker"]
            lease_date = request.form["lease-date"]
            parking_status = request.form["parking-status"]

            apartment_errors = validate_apartment(apartment)
            locker_errors = validate_locker(locker)
            lease_date_errors = validate_lease_date(lease_date)
            parking_status_errors = validate_parking_status(parking_status)

            validation_results.extend([apartment_errors, locker_errors, lease_date_errors, parking_status_errors])

            for result in validation_results:
                if result:
                    errors.append(result)
            
            if errors:
                flash_errors(errors)
                return render_template("add_user.html", user_role=user_role, full_name=name, email=email, apartment=apartment, locker=locker, lease_date=lease_date, parking_status=parking_status)

            resident = Resident(name=name, email=email, apartment=apartment, locker_location=locker, lease_date=convert_to_date(lease_date), parking_status=parking_status)
            resident.set_password(password)

            db.session.add(resident)
            db.session.commit()
            flash(f"Resident account for {resident.apartment} has been created", "success")

            return redirect(url_for("home")) # Change redirect url to 

        for result in validation_results:
            if result:
                errors.append(result)
        
        if errors:
            flash_errors(errors)
            return render_template("add_user.html", user_role=user_role, full_name=name, email=email)
        
        admin = Admin(name=name, email=email)
        admin.set_password(password)

        db.session.add(admin)
        db.session.commit()
        flash(f"Admin account has been created", "success")

        return redirect(url_for("home"))
    
    return render_template("add_user.html")