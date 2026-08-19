from flask import Blueprint, render_template, redirect, flash, request, url_for
from flask_login import login_required, current_user

from models import db, User, Admin, Resident

from helperFunctions import find_user, convert_to_date, validate_apartment, validate_email, validate_date, validate_locker, validate_name, status_options, validate_parking_status, validate_password, flash_errors, area_options, urgency_options, validate_affected_area, validate_body, validate_title, validate_select_options, post_categories, contact_types, validate_contact, check_for_errors

user = Blueprint("user", __name__)


@user.route("/initialize", methods=["GET", "POST"])
def initialize():
    if not db.session.query(User).first() is None:
        return redirect(url_for('home'))
    
    if db.session.query(User).first():
        return redirect(url_for('login'))
    
    if request.method == "POST":
        name = request.form["full-name"].strip()
        email = request.form["email"].strip()
        password = request.form["password"].strip()
        errors = []

        name_errors = validate_name(name)
        email_errors = validate_email(email)
        password_errors = validate_password(password)

        validation_results = [name_errors, email_errors, password_errors]

        for result in validation_results:
            if result:
                errors.append(result)
        
        if errors:
            flash_errors(errors)
            return render_template("add_user.html", full_name=name, email=email)
        
        admin = Admin(name=name, email=email, is_new_acc=True)
        admin.set_password(password)

        db.session.add(admin)
        db.session.commit()

        flash(f"Admin account has been created. Please login to continue website initialization process.", "success")

        return redirect(url_for("login"))

    return render_template("initialize.html")

@user.route("/user/<string:user_type>/add", methods = ["GET", "POST"])
@login_required 
def user_add(user_type):
    if not current_user.is_admin():
        return redirect(url_for("home")) # change redirect url to dashboard
    
    user_role = user_type

    if request.method == "POST":
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

            resident = Resident(name=name, email=email, is_new_acc=True, apartment=apartment, locker_location=locker, lease_date=convert_to_date(lease_date), parking_status=parking_status)
            resident.set_password(password)

            db.session.add(resident)
            db.session.commit()
            flash(f"Resident account for {resident.apartment} has been created", "success")

            return redirect(url_for("user.manage_users")) 

        for result in validation_results:
            if result:
                errors.append(result)
        
        if errors:
            flash_errors(errors)
            return render_template("add_user.html", user_role=user_role, full_name=name, email=email)
        
        admin = Admin(name=name, email=email, is_new_acc=True)
        admin.set_password(password)

        db.session.add(admin)
        db.session.commit()
        flash(f"Admin account has been created", "success")

        return redirect(url_for("user.manage_users"))
    
    return render_template("add_user.html", user_role=user_role, status_options=status_options)

@user.route("/user", methods=["GET", "POST"])
@login_required
def manage_users():
    if not current_user.is_admin:
        return redirect(url_for("dashboard"))
    
    return render_template("manage_users.html")

@user.route("/user/<string:user_type>/<int:id>/edit", methods=["GET", "POST"])
@login_required
def edit_user(user_type, id):
    if not current_user.is_admin:
        return redirect(url_for("dashboard"))
    
    user_role = user_type
    user = User.query.get_or_404(id)

    if not user_role == user.role:
        flash(f"Selected {user_role} user does not exist", "error")
        return redirect(url_for('user.manage_users'))

    if request.method == "POST":
        name = request.form["full-name"].strip()
        email = request.form["email"].strip()
        errors = []

        name_errors = validate_name(name)
        email_errors = validate_email(email, 'edit')

        validation_results = [name_errors, email_errors]

        if user_role == "resident":
            apartment = request.form["apartment"]
            locker = request.form["locker"]
            lease_date = request.form["lease-date"]
            parking_status = request.form["parking-status"]

            apartment_errors = validate_apartment(apartment, 'edit')
            locker_errors = validate_locker(locker, 'edit')
            lease_date_errors = validate_date(lease_date)
            parking_status_errors = validate_parking_status(parking_status)

            validation_results.extend([apartment_errors, locker_errors, lease_date_errors, parking_status_errors])

            for result in validation_results:
                if result:
                    errors.append(result)
            
            if errors:
                flash_errors(errors)
                return render_template("edit_user.html", user_role=user_role, status_options=status_options, user=user, full_name=name, email=email, apartment=apartment, locker=locker, lease_date=lease_date, parking_status=parking_status)

            user.name = name
            user.email = email
            user.apartment = apartment
            user.locker_location = locker
            user.lease_date = convert_to_date(lease_date)
            user.parking_status = parking_status

            db.session.commit()
            flash(f"Resident account for {user.apartment} has been successfully updated", "success")

            return redirect(url_for("user.manage_users")) 

        for result in validation_results:
            if result:
                errors.append(result)
        
        if errors:
            flash_errors(errors)
            return render_template("edit_user.html", user_role=user_role, status_options=status_options, user=user, full_name=name, email=email)
        
        user.name = name
        user.email = email

        db.session.commit()
        flash(f"Admin account for {user.name} has been successfully updated", "success")

        return redirect(url_for("user.manage_users")) 
    
    return render_template("edit_user.html", user_role=user_role, status_options=status_options, id=id, user=user)

@user.route("/user/<string:user_type>/<int:id>/delete", methods=["GET", "POST"])
@login_required
def delete_user(user_type, id):
    if not current_user.is_admin:
        return redirect(url_for("dashboard"))
    
    user_role = user_type
    user = User.query.get_or_404(id)

    if not user_role == user.role:
        flash(f"Selected {user_role} user does not exist", "error")
        return redirect(url_for('user.manage_users'))
    
    db.session.delete(user)
    db.session.commit()

    flash(f"{user_role.capitalize()} user has been successfully deleted", "success")
    
    return redirect(url_for('user.manage_users'))
