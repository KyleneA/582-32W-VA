import os
from dotenv import load_dotenv

from flask_login import (LoginManager, current_user, login_required, login_user, logout_user)

from config import app
from models import db, User

login_manager = LoginManager()
login_manager.login_view = "login"

login_manager.init_app(app)

with app.app_context():
    db.create_all()

@login_manager.user_loader
def load_user(user_id):
    return db.session.get(User, int(user_id))

@app.route("/")
def home():
    return "Running"