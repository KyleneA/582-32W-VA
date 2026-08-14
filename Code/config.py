import os

from flask import Flask

from routes_user import user
from routes_content import content
from routes_api import api

from models import db

app = Flask(__name__)
app.register_blueprint(user)
app.register_blueprint(content)
app.register_blueprint(api)

app.config["SQLALCHEMY_DATABASE_URI"] = ("sqlite:///xyzapartment.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

db.init_app(app)


