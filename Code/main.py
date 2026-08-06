import os
from dotenv import load_dotenv

from flask import render_template, url_for, redirect, request, flash, jsonify
from flask_login import (LoginManager, current_user, login_required, login_user, logout_user)

from config import app
from models import db, User, Admin, Resident, Announcement, Post
from helperFunctions import find_user, convert_to_date, validate_apartment, validate_email, validate_date, validate_locker, validate_name, validate_parking_status, validate_password, flash_errors, area_options, urgency_options, validate_affected_area, validate_body, validate_title, validate_urgency, post_category

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
    if not current_user.is_admin():
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

        return redirect(url_for("home")) # change url to dashboard
    
    return render_template("add_user.html")

@app.route("/announcement/add", methods=["GET", "POST"])
@login_required
def announcement_add():
    if not current_user.is_admin():
        return redirect(url_for("home")) # change redirect url to dashboard

    if request.method == "POST":
        title = request.form["title"].strip().title()
        body = request.form["body"].strip()
        affected_area = request.form.getlist("affected-area")
        urgency = request.form["urgency"]
        start_date = request.form["start-date"]
        end_date = request.form["end-date"]
        image_url = request.form["image"]
        errors = []

        title_errors = validate_title(title, "announcement")
        body_errors = validate_body(body, "announcement")
        affected_area_errors = validate_affected_area(affected_area)
        urgency_errors = validate_urgency(urgency)
        start_date_errors = validate_date(start_date, False, "start")
        end_date_errors = validate_date(end_date, False, "end")
        
        validation_results = [title_errors, body_errors, affected_area_errors, urgency_errors, start_date_errors, end_date_errors]

        for result in validation_results:
            if result:
                errors.append(result)
        
        if errors:
            flash_errors(errors)
            return render_template("add_announcement.html", area_options=area_options, urgency_options=urgency_options, title=title, body=body, affected_area=affected_area, urgency=urgency, start_date=start_date, end_date=end_date, image=image_url)

        announcement = Announcement(admin=current_user, title=title, body=body, affected_area=",".join(affected_area), urgency=urgency, start_date=convert_to_date(start_date), end_date=convert_to_date(end_date), image_url=image_url)

        db.session.add(announcement)
        db.session.commit()

        flash(f"Announcement has been created", "success")

        return redirect(url_for("home")) # change url to dashboard

    
    return render_template("add_announcement.html", area_options=area_options, urgency_options=urgency_options)

@app.route("/post/add", methods=["GET", "POST"])
@login_required
def post_add():
    if current_user.is_admin():
        return redirect(url_for("dashboard"))
    
    if request.method == "POST":
        title = request.form["title"].strip().title()
        body = request.form["body"].strip()
        category = request.form["category"]
        contact = request.form["contact"]
        start_date = request.form["start-date"]
        end_date = request.form["end-date"]
        image_url = request.form["image"]
        errors = []

        post = Post(resident=current_user, title=title, body=body, category=category, is_approved=False, contact_info=contact, start_date=convert_to_date(start_date), end_date=convert_to_date(end_date), image_url=image_url)
        # print(title, body, category, start_date, end_date, image_url)

        db.session.add(post)
        db.session.commit()

        # return render_template("add_post.html", post_category=post_category, title=title, body=body, category=category, start_date=start_date, end_date=end_date, image=image_url, contact=contact)
        return render_template("add_post.html", post_category=post_category)
    
    return render_template("add_post.html", post_category=post_category)


@app.route("/dashboard", methods=["GET"])
@login_required
def dashboard():
    admins = redirect(url_for("get_admins"))
    print(admins)
    return render_template("dashboard.html", page_name="dashboard", admins=admins)

@app.route("/api/user/admin", methods=["GET"])
@login_required
def get_admins():
    admins = Admin.query.order_by(Admin.id).all()

    return jsonify([user.to_dict() for user in admins])

@app.route("/api/user/resident", methods=["GET"])
@login_required
def get_residents():
    residents = Resident.query.order_by(Resident.id).all()

    return jsonify([user.to_dict() for user in residents])

@app.route("/api/content/announcement", methods=["GET"])
@login_required
def get_announcements():
    announcements = Announcement.query.order_by(Announcement.id).all()

    return jsonify([content.to_dict() for content in announcements])

@app.route("/api/content/post", methods=["GET"])
@login_required
def get_posts():
    posts = Post.query.order_by(Post.id).all()

    return jsonify([content.to_dict() for content in posts])