from flask_login import UserMixin
from werkzeug.security import (check_password_hash, generate_password_hash)

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Date, DateTime
from datetime import date
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass

db = SQLAlchemy()

# Models to create:
# Admin, Resident
# Building_info, Announcement, Post

# Building off SQLAlchemy ORM Inheritance documentation
class User(UserMixin, db.Model):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(
        db.String(100), 
        nullable=False)

    email: Mapped[str] = mapped_column(
        db.String(255),
        unique=True,
        nullable = False
    )

    password_hash: Mapped[str] = mapped_column(
        db.String(255),
        nullable = False
    )

    role: Mapped[str]

    __mapper_args__ = {
        # "polymorphic_identity": "user",
        "polymorphic_on": "role",
    }

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def is_admin(self):
        if self.role == "admin":
            return True
        
        return False

    def __repr__(self):
        # returns the class name and the user's id
        return f"<{self.__class__.__name__}:{self.id}>"
    
    def get_id(self):
        return f"{self.role}:{self.id}"

class Admin(User):
    __tablename__ = "admins"

    id: Mapped[int] = mapped_column(db.ForeignKey("users.id"), primary_key=True)
    residents: Mapped[list["Resident"]] = relationship()

    __mapper_args__ = {
        "polymorphic_identity": "admin"
    }

class Resident(User):
    __tablename__ = "residents"

    id: Mapped[int] = mapped_column(db.ForeignKey("users.id"), primary_key=True)
    
    apartment: Mapped[str] = mapped_column(
        #example 101A -> 100s = floor 1, 01 = room number, A = building side
        db.String(4),
        unique=True,
        nullable=False
    )

    locker_location: Mapped[str] = mapped_column(
        # example "2-01" -> second floor, locker number 01
        db.String(4),
        unique=True,
        nullable=False
    )

    lease_date: Mapped[date] = mapped_column(
        # format: YYYY-MM-DD
        db.Date(),
        nullable=False
    )

    parking_status: Mapped[str] = mapped_column(
        # paid, late, revoked, inactive
        db.String(8),
        nullable=False,
    )

    __mapper_args__ = {
        "polymorphic_identity": "resident"
    }
