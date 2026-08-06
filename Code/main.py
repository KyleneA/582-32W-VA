import os
from dotenv import load_dotenv

from flask import render_template, url_for, redirect, request, flash
from flask_login import (LoginManager, current_user, login_required, login_user, logout_user)

from config import app
from models import db, User, Admin, Resident, Announcement
from helperFunctions import find_user, convert_to_date, validate_apartment, validate_email, validate_date, validate_locker, validate_name, validate_parking_status, validate_password, flash_errors

login_manager = LoginManager()
login_manager.login_view = "login"

login_manager.init_app(app)

with app.app_context():
    db.create_all()
    

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
            lease_date_errors = validate_date(lease_date)
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

@app.route("/announcement/add", methods=["GET", "POST"])
@login_required
def announcement_add():
    area_options = ["whole building", "1st floor", "2nd floor", "3rd floor", "4th floor", "5th floor", "parking lot"]
    urgency_options = ["immediate", "high", "medium", "low"]

    if request.method == "POST":
        title = request.form["title"].strip().title()
        body = request.form["body"].strip()
        affected_area = request.form.getlist("affected-area")
        urgency = request.form["urgency"]
        start_date = request.form["start-date"]
        end_date = request.form["end-date"]
        image_url = request.form["image"]

        print(current_user)

        announcement = Announcement(admin=current_user, title=title, body=body, affected_area=",".join(affected_area), urgency=urgency, start_date=convert_to_date(start_date), end_date=convert_to_date(end_date), image_url=image_url)

        db.session.add(announcement)
        db.session.commit()

    
    return render_template("add_announcement.html", area_options=area_options, urgency_options=urgency_options)