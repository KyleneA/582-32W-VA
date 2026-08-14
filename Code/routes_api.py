from flask import Blueprint, jsonify
from flask_login import login_required

from models import db, User, Admin, Resident, Announcement, Post, BuildingInfo, Guideline
from sqlalchemy import desc, nullslast, nullsfirst

api = Blueprint("api", __name__)


@api.route("/api/user/admin/<string:sort_type>", methods=["GET"])
@login_required
def get_admins(sort_type):
    if sort_type == "id":
        admins = Admin.query.order_by(Admin.id).all()

    if sort_type == "name":
        admins = Admin.query.order_by(Admin.name).all()

    if sort_type == "email":
        admins = Admin.query.order_by(Admin.email).all()

    return jsonify([user.to_dict() for user in admins])

@api.route("/api/user/resident/<string:sort_type>", methods=["GET"])
@login_required
def get_residents(sort_type):
    residents = Resident.query.order_by(Resident.id).all()

    return jsonify([user.to_dict() for user in residents])

@api.route("/api/content/announcement/<string:sort_type>", methods=["GET"])
@login_required
def get_announcements(sort_type):
    sort_options = ["id", "title", "start-date", "end-date", "recent", "recent-immediate"]

    if sort_type == "id":
        announcements = Announcement.query.order_by(Announcement.id).all()

    if sort_type == "title":
        announcements = Announcement.query.order_by(Announcement.title).all()

    if sort_type == "start-date":
        announcements = Announcement.query.order_by(nullsfirst(Announcement.start_date)).all()

    if sort_type == "end-date":
        announcements = Announcement.query.order_by(nullslast(Announcement.end_date.desc())).all()

    if sort_type == "recent":
        announcements = Announcement.query.order_by(Announcement.id.desc()).all()

    if sort_type == "recent-immediate":
        announcements = Announcement.query.order_by(Announcement.id.desc()).filter_by(urgency="immediate")

    return jsonify([content.to_dict() for content in announcements])

@api.route("/api/content/post/<string:sort_type>", methods=["GET"])
@login_required
def get_posts(sort_type):
    posts = Post.query.order_by(Post.id).all()

    return jsonify([content.to_dict() for content in posts])

# @api.route("/api/building-info", methods=["GET"])
# def get_building_info():
#     building_info = BuildingInfo.query.first()

#     return jsonify([building_info.to_dict()])