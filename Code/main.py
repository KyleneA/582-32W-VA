import os
from dotenv import load_dotenv

from flask import render_template, url_for, redirect, request, flash, jsonify
from flask_login import (LoginManager, current_user, login_required, login_user, logout_user)

from config import app
from models import db, User, Admin, Resident, Announcement, Post, BuildingInfo, Guideline
from helperFunctions import find_user, convert_to_date, validate_apartment, validate_email, validate_date, validate_locker, validate_name, validate_parking_status, validate_password, flash_errors, area_options, urgency_options, validate_affected_area, validate_body, validate_title, validate_select_options, post_categories, contact_types, validate_contact, check_for_errors

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
    if db.session.query(User).first() is None:
        return redirect(url_for('user.initialize'))
    
    if db.session.query(BuildingInfo).first() is None:
        return redirect(url_for('content.building_info_add'))
    
    building_info = BuildingInfo.query.first()

    return render_template("home.html", building_info=building_info)

@app.route("/login", methods=["GET", "POST"])
def login():
    if db.session.query(User).first() is None:
        flash("Please create an account", "error")
        return redirect(url_for('user.initialize'))

    if current_user.is_authenticated:
        return redirect(url_for("dashboard")) 

    if request.method == "POST":
        email = request.form["email"].strip()
        password = request.form["password"].strip()

        user = find_user(email)

        if user is None or not user.check_password(password):
            flash("Invalid username or password", "error")

            return render_template("login.html", email=email)
        
        login_user(user)

        if user.is_new_acc:
            flash(f"Loging in for the first time? Reset your password to secure your account.")

            return redirect(url_for("first_login"))

        flash(f"You are now logged in, {user.role}!", "success")

        return redirect(url_for("home")) # change to dashboard

    return render_template("login.html")

@app.route("/first-login", methods=["GET", "POST"])
@login_required
def first_login():
    if not current_user.is_new_acc:
        return redirect(url_for("home"))
    
    if request.method == "POST":
        new_password = request.form["password"]
        confirm_password = request.form["confirm-password"]

        errors = []

        if not new_password == confirm_password:
            errors.append(["Password fields do not match"])

        password_errors = validate_password(new_password)

        if password_errors:
            errors.append(password_errors)

        if errors:
            flash_errors(errors)
            return render_template("first_login.html")

        current_user.login_one()
        db.session.commit()
        
        flash("You have successfully reset your password", "success")

        if current_user.is_admin() and not BuildingInfo.query.first():
            return redirect(url_for("content.building_info_add"))
        
        return redirect(url_for("home"))
    
    return render_template("first_login.html")


@app.route("/logout", methods = ["POST"])
@login_required
def logout():
    logout_user()

    flash("You have been logged out", "success")

    return redirect(url_for("home"))


# @app.route("/user/<string:user_type>/add", methods = ["GET", "POST"])
# @login_required 
# def user_add(user_type):
#     if not current_user.is_admin():
#         return redirect(url_for("home")) # change redirect url to dashboard
    
#     user_role = user_type

#     if request.method == "POST":
#         # user_role = request.form["user-role"]
#         name = request.form["full-name"].strip()
#         email = request.form["email"].strip()
#         password = request.form["password"].strip()
#         errors = []

#         name_errors = validate_name(name)
#         email_errors = validate_email(email)
#         password_errors = validate_password(password)

#         validation_results = [name_errors, email_errors, password_errors]

#         if user_role == "resident":
#             apartment = request.form["apartment"]
#             locker = request.form["locker"]
#             lease_date = request.form["lease-date"]
#             parking_status = request.form["parking-status"]

#             apartment_errors = validate_apartment(apartment)
#             locker_errors = validate_locker(locker)
#             lease_date_errors = validate_date(lease_date)
#             parking_status_errors = validate_parking_status(parking_status)

#             validation_results.extend([apartment_errors, locker_errors, lease_date_errors, parking_status_errors])

#             for result in validation_results:
#                 if result:
#                     errors.append(result)
            
#             if errors:
#                 flash_errors(errors)
#                 return render_template("add_user.html", user_role=user_role, full_name=name, email=email, apartment=apartment, locker=locker, lease_date=lease_date, parking_status=parking_status)

#             resident = Resident(name=name, email=email, is_new_acc=True, apartment=apartment, locker_location=locker, lease_date=convert_to_date(lease_date), parking_status=parking_status)
#             resident.set_password(password)

#             db.session.add(resident)
#             db.session.commit()
#             flash(f"Resident account for {resident.apartment} has been created", "success")

#             return redirect(url_for("dashboard")) # Change redirect url to dashboard

#         for result in validation_results:
#             if result:
#                 errors.append(result)
        
#         if errors:
#             flash_errors(errors)
#             return render_template("add_user.html", user_role=user_role, full_name=name, email=email)
        
#         admin = Admin(name=name, email=email, is_new_acc=True)
#         admin.set_password(password)

#         db.session.add(admin)
#         db.session.commit()
#         flash(f"Admin account has been created", "success")

#         return redirect(url_for("dashboard"))
    
#     return render_template("add_user.html", user_role=user_role)

# @app.route("/announcement/add", methods=["GET", "POST"])
# @login_required
# def announcement_add():
#     if not current_user.is_admin():
#         return redirect(url_for("home")) # change redirect url to dashboard

#     if request.method == "POST":
#         title = request.form["title"].strip().title()
#         body = request.form["body"].strip()
#         affected_area = request.form.getlist("affected-area")
#         urgency = request.form["urgency"]
#         start_date = request.form["start-date"]
#         end_date = request.form["end-date"]
#         image_url = request.form["image"]
#         errors = []

#         title_errors = validate_title(title, "announcement")
#         body_errors = validate_body(body, "announcement")
#         affected_area_errors = validate_affected_area(affected_area)
#         urgency_errors = validate_select_options(urgency, "urgency", urgency_options)
#         start_date_errors = validate_date(start_date, False, input_type="start")
#         end_date_errors = validate_date(end_date, False, input_type="end")
        
#         validation_results = [title_errors, body_errors, affected_area_errors, urgency_errors, start_date_errors, end_date_errors]

#         for result in validation_results:
#             if result:
#                 errors.append(result)
        
#         if errors:
#             flash_errors(errors)
#             return render_template("add_announcement.html", area_options=area_options, urgency_options=urgency_options, title=title, body=body, affected_area=affected_area, urgency=urgency, start_date=start_date, end_date=end_date, image=image_url)

#         announcement = Announcement(admin=current_user, title=title, body=body, affected_area=",".join(affected_area), urgency=urgency, start_date=convert_to_date(start_date), end_date=convert_to_date(end_date), image_url=image_url)

#         db.session.add(announcement)
#         db.session.commit()

#         flash(f"Announcement has been created", "success")

#         return redirect(url_for("dashboard"))
    
#     return render_template("add_announcement.html", area_options=area_options, urgency_options=urgency_options)

# @app.route("/post/add", methods=["GET", "POST"])
# @login_required
# def post_add():
#     if current_user.is_admin():
#         return redirect(url_for("dashboard"))
    
#     if request.method == "POST":
#         title = request.form["title"].strip().title()
#         body = request.form["body"].strip()
#         category = request.form['category']
#         contact_method = request.form['contact-method']
#         contact = request.form["contact"].strip()
#         contact_info = f"{contact_method}: {contact}"
#         start_date = request.form["start-date"]
#         end_date = request.form["end-date"]
#         image_url = request.form["image"]

#         title_errors = validate_title(title, "community post")
#         body_errors = validate_body(body, "community post")
#         category_errors = validate_select_options(category, "post category", post_categories)
#         contact_errors = validate_contact(contact_types, contact_method, contact)
#         start_date_errors = validate_date(start_date, is_required=False, input_type="start date")
#         end_date_errors = validate_date(end_date, is_required=False, input_type="end date")

#         validation_results = [title_errors, body_errors, category_errors, contact_errors, start_date_errors, end_date_errors]

#         errors = check_for_errors(validation_results)

#         if errors:
#             flash_errors(errors)
            
#             return render_template("add_post.html", post_categories=post_categories, contact_types=contact_types, title=title, body=body, category=category, start_date=start_date, end_date=end_date, image=image_url, contact=contact, contact_method=contact_method)

#         post = Post(resident=current_user, title=title, body=body, category=category, is_approved=False, contact_info=contact_info, start_date=convert_to_date(start_date), end_date=convert_to_date(end_date), image_url=image_url)

#         db.session.add(post)
#         db.session.commit()

#         flash("Post has been created", "success")

#         return redirect(url_for("dashboard"))
    
#     return render_template("add_post.html", post_categories=post_categories, contact_types=contact_types)

# @app.route("/building-info/guidelines/edit", methods=["GET", "POST"])
# @login_required
# def edit_guidelines():
#     if not current_user.is_admin():
#         return redirect(url_for("home"))
    

    
#     return render_template("building_info.html")

# @app.route("/building-info/add", methods=["GET", "POST"])
# @login_required
# def add_building_info():
#     if not current_user.is_admin():
#         return redirect(url_for("home")) # Change to dashboard
    
#     building_hrs = {
#         "monday": {
#             "is_closed": None,
#             "opening": '09:00',
#             "closing":'17:00'
#         },
#         "tuesday": {
#             "is_closed": None,
#             "opening": '09:00',
#             "closing": '17:00'
#         },
#         "wednesday": {
#             "is_closed": None,
#             "opening": '09:00',
#             "closing": '17:00'
#         },
#         "thursday": {
#             "is_closed": None,
#             "opening": '08:00',
#             "closing": '17:00'
#         },
#         "friday": {
#             "is_closed": None,
#             "opening": '08:00',
#             "closing": '17:00'
#         },
#         "saturday": {
#             "is_closed": 'on',
#             "opening": '',
#             "closing": ''
#         },
#         "sunday": {
#             "is_closed": 'on',
#             "opening": '',
#             "closing": ''
#         }
#     }
    
#     if request.method == "POST":
#         monday = {
#             "is_closed": request.form.get('monday-closed'),
#             "opening": request.form['monday-opening'],
#             "closing": request.form['monday-closing']
#         }

#         tuesday = {
#             "is_closed": request.form.get('tuesday-closed'),
#             "opening": request.form['tuesday-opening'],
#             "closing": request.form['tuesday-closing']
#         }

#         wednesday = {
#             "is_closed": request.form.get('wednesday-closed'),
#             "opening": request.form['wednesday-opening'],
#             "closing": request.form['wednesday-closing']
#         }

#         thursday = {
#             "is_closed": request.form.get('thursday-closed'),
#             "opening": request.form['thursday-opening'],
#             "closing": request.form['thursday-closing']
#         }

#         friday = {
#             "is_closed": request.form.get('friday-closed'),
#             "opening": request.form['friday-opening'],
#             "closing": request.form['friday-closing']
#         }

#         saturday = {
#             "is_closed": request.form.get('saturday-closed'),
#             "opening": request.form['saturday-opening'],
#             "closing": request.form['saturday-closing']
#         }

#         sunday = {
#             "is_closed": request.form.get('sunday-closed'),
#             "opening": request.form['sunday-opening'],
#             "closing": request.form['sunday-closing']
#         }

#         room = request.form['room'].strip()
#         address = request.form['address'].strip()
#         city = request.form['city'].strip()
#         province = request.form['province'].strip()
#         postal_code = request.form['postal-code'].strip()
#         phone = request.form['phone'].strip()
#         email = request.form['email'].strip()

#         office_hours = {}

#         office_hours["monday_hrs"] = f"{monday['opening']} - {monday['closing']}" if not monday["is_closed"] else ''
#         office_hours["tuesday_hrs"] = f"{tuesday['opening']} - {tuesday['closing']}" if not tuesday["is_closed"] else ''
#         office_hours["wednesday_hrs"] = f"{wednesday['opening']} - {wednesday['closing']}" if not wednesday["is_closed"] else ''
#         office_hours["thursday_hrs"] = f"{thursday['opening']} - {thursday['closing']}" if not thursday["is_closed"] else ''
#         office_hours["friday_hrs"] = f"{friday['opening']} - {friday['closing']}" if not friday["is_closed"] else ''
#         office_hours["saturday_hrs"] = f"{saturday['opening']} - {saturday['closing']}" if not saturday["is_closed"] else ''
#         office_hours["sunday_hrs"] = f"{sunday['opening']} - {sunday['closing']}" if not sunday["is_closed"] else ''

#         info = BuildingInfo(
#             monday_hours=office_hours.get('monday_hrs'),
#             tuesday_hours=office_hours.get('tuesday_hrs'),
#             wednesday_hours=office_hours.get('wednesday_hrs'),
#             thursday_hours=office_hours.get('thursday_hrs'),
#             friday_hours=office_hours.get('friday_hrs'),
#             saturday_hours=office_hours.get('saturday_hrs'),
#             sunday_hours=office_hours.get('sunday_hrs'),
#             office_room=room,
#             street_address=address,
#             city=city,
#             province=province,
#             postal_code=postal_code,
#             phone=phone,
#             email=email
#             )
        
#         db.session.add(info)
#         db.session.commit()

#         return redirect(url_for("home"))
    
#     return render_template("add_info.html", building_hrs=building_hrs)

@app.route("/dashboard", methods=["GET"])
@login_required
def dashboard():

    return render_template("dashboard.html", page_name="dashboard")

# @app.route("/user", methods=["GET", "POST"])
# @login_required
# def manage_users():
#     if not current_user.is_admin:
#         return redirect(url_for("dashboard"))
    
#     return render_template("users.html")

# @app.route("/user/<string:user_type>/<int:id>/edit", methods=["GET", "POST"])
# @login_required
# def edit_user(user_type, id):
#     if not current_user.is_admin:
#         return redirect(url_for("dashboard"))
    
#     user_role = user_type
    
#     return render_template("edit_user.html", user_role=user_role, id=id)

# @app.route("/user/<string:user_type>/<int:id>/delete", methods=["GET", "POST"])
# @login_required
# def delete_user(user_type, id):
#     if not current_user.is_admin:
#         return redirect(url_for("dashboard"))
    
#     user_role = user_type
    
#     return render_template("delete_user.html", user_role=user_role, id=id)


# @app.route("/api/user/admin/<string:sort_type>", methods=["GET"])
# @login_required
# def get_admins(sort_type):
#     if sort_type == "id":
#         admins = Admin.query.order_by(Admin.id).all()

#     if sort_type == "name":
#         admins = Admin.query.order_by(Admin.name).all()

#     if sort_type == "email":
#         admins = Admin.query.order_by(Admin.email).all()

#     return jsonify([user.to_dict() for user in admins])

# @app.route("/api/user/resident", methods=["GET"])
# @login_required
# def get_residents():
#     residents = Resident.query.order_by(Resident.id).all()

#     return jsonify([user.to_dict() for user in residents])

# @app.route("/api/content/announcement", methods=["GET"])
# @login_required
# def get_announcements():
#     announcements = Announcement.query.order_by(Announcement.id).all()

#     return jsonify([content.to_dict() for content in announcements])

# @app.route("/api/content/post", methods=["GET"])
# @login_required
# def get_posts():
#     posts = Post.query.order_by(Post.id).all()

#     return jsonify([content.to_dict() for content in posts])

# # @app.route("/api/building-info", methods=["GET"])
# # def get_building_info():
# #     building_info = BuildingInfo.query.first()

# #     return jsonify([building_info.to_dict()])