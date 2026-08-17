from flask import Blueprint, render_template, redirect, flash, request, url_for
from flask_login import login_required, current_user

from models import db, Announcement, Post, BuildingInfo, Guideline

from helperFunctions import find_user, convert_to_date, validate_apartment, validate_email, validate_date, validate_locker, validate_name, validate_parking_status, validate_password, flash_errors, area_options, urgency_options, validate_affected_area, validate_body, validate_title, validate_select_options, post_categories, contact_types, validate_contact, check_for_errors

content = Blueprint("content", __name__)

# ANNOUNCEMENTS
@content.route("/announcement", methods=["GET"])
@login_required
def announcement_manage():
    ...

    return render_template("manage_announcements.html")

@content.route("/announcement/add", methods=["GET", "POST"])
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
        urgency_errors = validate_select_options(urgency, "urgency", urgency_options)
        start_date_errors = validate_date(start_date, False, input_type="start")
        end_date_errors = validate_date(end_date, False, input_type="end")
        
        validation_results = [title_errors, body_errors, affected_area_errors, urgency_errors, start_date_errors, end_date_errors]

        for result in validation_results:
            if result:
                errors.append(result)
        
        if errors:
            flash_errors(errors)
            return render_template("add_announcement.html", area_options=area_options, urgency_options=urgency_options, title=title, body=body, affected_area=affected_area, urgency=urgency, start_date=start_date, end_date=end_date, image=image_url)

        announcement = Announcement(admin=current_user, title=title, body=body, status="posted",affected_area=",".join(affected_area), urgency=urgency, start_date=convert_to_date(start_date), end_date=convert_to_date(end_date), image_url=image_url)

        db.session.add(announcement)
        db.session.commit()

        flash(f"Announcement has been created", "success")

        return redirect(url_for("dashboard"))
    
    return render_template("add_announcement.html", area_options=area_options, urgency_options=urgency_options)

# POSTS
@content.route("/post", methods=["GET", "POST"])
@login_required
def post_manage():
    ...

    return render_template("manage_posts.html")

@content.route("/post/add", methods=["GET", "POST"])
@login_required
def post_add():
    if current_user.is_admin():
        return redirect(url_for("dashboard"))
    
    if request.method == "POST":
        title = request.form["title"].strip().title()
        body = request.form["body"].strip()
        category = request.form['category']
        contact_method = request.form['contact-method']
        contact = request.form["contact"].strip()
        contact_info = f"{contact_method}: {contact}" if contact else contact_method
        start_date = request.form["start-date"]
        end_date = request.form["end-date"]
        image_url = request.form["image"]

        title_errors = validate_title(title, "community post")
        body_errors = validate_body(body, "community post")
        category_errors = validate_select_options(category, "post category", post_categories)
        contact_errors = validate_contact(contact_types, contact_method, contact)
        start_date_errors = validate_date(start_date, is_required=False, input_type="start date")
        end_date_errors = validate_date(end_date, is_required=False, input_type="end date")

        validation_results = [title_errors, body_errors, category_errors, contact_errors, start_date_errors, end_date_errors]

        errors = check_for_errors(validation_results)

        if errors:
            flash_errors(errors)
            
            return render_template("add_post.html", post_categories=post_categories, contact_types=contact_types, title=title, body=body, category=category, start_date=start_date, end_date=end_date, image=image_url, contact=contact, contact_method=contact_method)

        post = Post(resident=current_user, title=title, body=body, status="pending", category=category, is_approved=False, contact_info=contact_info, start_date=convert_to_date(start_date), end_date=convert_to_date(end_date), image_url=image_url)

        db.session.add(post)
        db.session.commit()

        flash("Post has been created", "success")

        return redirect(url_for("content.post_manage"))
    
    return render_template("add_post.html", post_categories=post_categories, contact_types=contact_types)

@content.route("/post/edit/<int:post_id>", methods=["GET", "POST"])
@login_required
def post_edit(post_id):
    if current_user.is_admin():
        return redirect(url_for('content.post_manage'))
    
    post = Post.query.filter_by(id=post_id).first()

    if not post.author_id == current_user.id:
        return redirect(url_for('content.post_manage'))

    if request.method == "POST":
        title = request.form["title"].strip().title()
        body = request.form["body"].strip()
        category = request.form['category']
        contact_method = request.form['contact-method']
        contact = request.form["contact"].strip()
        contact_info = f"{contact_method}: {contact}" if contact else contact_method
        start_date = request.form["start-date"]
        end_date = request.form["end-date"]
        image_url = request.form["image"]

        title_errors = validate_title(title, "community post")
        body_errors = validate_body(body, "community post")
        category_errors = validate_select_options(category, "post category", post_categories)
        contact_errors = validate_contact(contact_types, contact_method, contact)
        start_date_errors = validate_date(start_date, is_required=False, input_type="start date")
        end_date_errors = validate_date(end_date, is_required=False, input_type="end date")

        validation_results = [title_errors, body_errors, category_errors, contact_errors, start_date_errors, end_date_errors]

        errors = check_for_errors(validation_results)

        if errors:
            flash_errors(errors)
            
            return render_template("add_post.html", post_categories=post_categories, contact_types=contact_types, title=title, body=body, category=category, start_date=start_date, end_date=end_date, image=image_url, contact=contact, contact_method=contact_method)

        post.title = title
        post.body = body
        # Should edited posts be set to pending again?
        post.status = "pending"
        post.category = category
        post.is_approved = False
        post.contact_info = contact_info
        post.start_date = convert_to_date(start_date)
        post.end_date = convert_to_date(end_date)
        post.image_url = image_url

        db.session.commit()

        flash("Post has been updated", "success")

        return redirect(url_for("content.post_manage"))

    return render_template("edit_post.html", post=post, post_categories=post_categories, contact_types=contact_types)

@content.route("/post/delete/<int:post_id>", methods=["POST"])
@login_required
def post_delete(post_id):
    if current_user.is_admin():
        return redirect(url_for('content.post_manage'))
    
    post = Post.query.get_or_404(post_id)

    if not post.author_id == current_user.id:
        return redirect(url_for('content.post_manage'))
    
    if request.method == "POST":
        db.session.delete(post)
        db.session.commit()

        flash("Post was successfully was deleted", "success")
        return redirect(url_for("content.post_manage"))

# BUILDING INFORMATION
@content.route("/building-info/guidelines/edit", methods=["GET", "POST"])
@login_required
def edit_guidelines():
    if not current_user.is_admin():
        return redirect(url_for("home"))
    

    
    return render_template("building_info.html")

@content.route("/building-info/add", methods=["GET", "POST"])
@login_required
def building_info_add():
    if not current_user.is_admin():
        return redirect(url_for("home")) # Change to dashboard
    
    building_hrs = {
        "monday": {
            "is_closed": None,
            "opening": '09:00',
            "closing":'17:00'
        },
        "tuesday": {
            "is_closed": None,
            "opening": '09:00',
            "closing": '17:00'
        },
        "wednesday": {
            "is_closed": None,
            "opening": '09:00',
            "closing": '17:00'
        },
        "thursday": {
            "is_closed": None,
            "opening": '08:00',
            "closing": '17:00'
        },
        "friday": {
            "is_closed": None,
            "opening": '08:00',
            "closing": '17:00'
        },
        "saturday": {
            "is_closed": 'on',
            "opening": '',
            "closing": ''
        },
        "sunday": {
            "is_closed": 'on',
            "opening": '',
            "closing": ''
        }
    }
    
    if request.method == "POST":
        monday = {
            "is_closed": request.form.get('monday-closed'),
            "opening": request.form['monday-opening'],
            "closing": request.form['monday-closing']
        }

        tuesday = {
            "is_closed": request.form.get('tuesday-closed'),
            "opening": request.form['tuesday-opening'],
            "closing": request.form['tuesday-closing']
        }

        wednesday = {
            "is_closed": request.form.get('wednesday-closed'),
            "opening": request.form['wednesday-opening'],
            "closing": request.form['wednesday-closing']
        }

        thursday = {
            "is_closed": request.form.get('thursday-closed'),
            "opening": request.form['thursday-opening'],
            "closing": request.form['thursday-closing']
        }

        friday = {
            "is_closed": request.form.get('friday-closed'),
            "opening": request.form['friday-opening'],
            "closing": request.form['friday-closing']
        }

        saturday = {
            "is_closed": request.form.get('saturday-closed'),
            "opening": request.form['saturday-opening'],
            "closing": request.form['saturday-closing']
        }

        sunday = {
            "is_closed": request.form.get('sunday-closed'),
            "opening": request.form['sunday-opening'],
            "closing": request.form['sunday-closing']
        }

        room = request.form['room'].strip()
        address = request.form['address'].strip()
        city = request.form['city'].strip()
        province = request.form['province'].strip()
        postal_code = request.form['postal-code'].strip()
        phone = request.form['phone'].strip()
        email = request.form['email'].strip()

        office_hours = {}

        office_hours["monday_hrs"] = f"{monday['opening']} - {monday['closing']}" if not monday["is_closed"] else ''
        office_hours["tuesday_hrs"] = f"{tuesday['opening']} - {tuesday['closing']}" if not tuesday["is_closed"] else ''
        office_hours["wednesday_hrs"] = f"{wednesday['opening']} - {wednesday['closing']}" if not wednesday["is_closed"] else ''
        office_hours["thursday_hrs"] = f"{thursday['opening']} - {thursday['closing']}" if not thursday["is_closed"] else ''
        office_hours["friday_hrs"] = f"{friday['opening']} - {friday['closing']}" if not friday["is_closed"] else ''
        office_hours["saturday_hrs"] = f"{saturday['opening']} - {saturday['closing']}" if not saturday["is_closed"] else ''
        office_hours["sunday_hrs"] = f"{sunday['opening']} - {sunday['closing']}" if not sunday["is_closed"] else ''

        info = BuildingInfo(
            monday_hours=office_hours.get('monday_hrs'),
            tuesday_hours=office_hours.get('tuesday_hrs'),
            wednesday_hours=office_hours.get('wednesday_hrs'),
            thursday_hours=office_hours.get('thursday_hrs'),
            friday_hours=office_hours.get('friday_hrs'),
            saturday_hours=office_hours.get('saturday_hrs'),
            sunday_hours=office_hours.get('sunday_hrs'),
            office_room=room,
            street_address=address,
            city=city,
            province=province,
            postal_code=postal_code,
            phone=phone,
            email=email
            )
        
        db.session.add(info)
        db.session.commit()

        return redirect(url_for("home"))
    
    return render_template("add_info.html", building_hrs=building_hrs)