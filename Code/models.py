from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import (check_password_hash, generate_password_hash)

db = SQLAlchemy()

# Models to create:
# Admin, Resident
# Building_info, Announcement, Post

# Building off google ai overview 
class User(db.Model):
    __abstract__ = True

    
