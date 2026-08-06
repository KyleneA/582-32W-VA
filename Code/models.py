from flask_login import UserMixin
from werkzeug.security import (check_password_hash, generate_password_hash)

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Date, DateTime
from datetime import date, datetime
from sqlalchemy.orm import Mapped, mapped_column, relationship

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

    announcements: Mapped[list["Announcement"]] = relationship(back_populates="admin")

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

class Content(db.Model):
    __abstract__ = True

    id: Mapped[int] = mapped_column(primary_key=True)

    title: Mapped[str] = mapped_column(
        db.String(100),
        nullable=False
    )

    body: Mapped[str] = mapped_column(
        db.Text(),
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        default=datetime.now,
        nullable=False
    )

    def __repr__(self):
        return f"<{self.__class__.__name__}: {self.id}>"

class Announcement(Content, db.Model):
    __tablename__ = "announcements"

    # should all admin be able to edit all announcements?
    author_id: Mapped[int] = mapped_column(
        db.ForeignKey("admins.id"),
        nullable=False
    )

    admin: Mapped["Admin"] = relationship(back_populates="announcements")

    affected_area: Mapped[str] = mapped_column(
        # input checkbox: whole building, 1st floor, 2nd floor, 3rd floor, 4th floor, 5th floor, parking lot
        db.String(14),
        nullable=False
    )

    urgency: Mapped[str] = mapped_column(
        # options: immediate, high, medium, low
        db.String(9),
        nullable=False
    )

    start_date: Mapped[date] = mapped_column(
        db.Date()
    )

    end_date: Mapped[date] = mapped_column(
        db.Date()
    )

    # only 1 image url for now
    image_url: Mapped[str] = mapped_column(
        db.String(2048)
    )