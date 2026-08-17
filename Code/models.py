from flask_login import UserMixin
from werkzeug.security import (check_password_hash, generate_password_hash)

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Date, DateTime
from datetime import date, datetime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from typing import Optional

class Base(DeclarativeBase):
    pass

db = SQLAlchemy(model_class=Base)

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
        nullable=False
    )

    password_hash: Mapped[str] = mapped_column(
        db.String(255),
        nullable=False
    )

    is_new_acc: Mapped[bool] = mapped_column(nullable=False)

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
    
    def login_one(self):
        self.is_new_acc = False

    def __repr__(self):
        # returns the class name and the user's id
        return f"<{self.__class__.__name__}:{self.id}>"
    
    def get_id(self):
        return f"{self.role}:{self.id}"

class Admin(User):
    __tablename__ = "admins"

    id: Mapped[int] = mapped_column(db.ForeignKey("users.id"), primary_key=True)
    
    # residents: Mapped[list["Resident"]] = relationship()

    announcements: Mapped[list["Announcement"]] = relationship(back_populates="admin")

    __mapper_args__ = {
        "polymorphic_identity": "admin"
    }

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role,
        }

class Resident(User):
    __tablename__ = "residents"

    id: Mapped[int] = mapped_column(db.ForeignKey("users.id"), primary_key=True)

    # admin_id: Mapped[int] = mapped_column(
    #     db.ForeignKey("admins.id"),
    # )

    # admin: Mapped["Admin"] = relationship(back_populates="residents")

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

    posts: Mapped[list["Post"]] = relationship(back_populates="resident")

    __mapper_args__ = {
        "polymorphic_identity": "resident"
    }

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role,
            "apartment": self.apartment,
            "lockerLocation": self.locker_location,
            "leaseDate": self.lease_date,
            "parkingStatus": self.parking_status
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

    status: Mapped[str] = mapped_column(
        # options: "posted", "pending", "rejected", "archived"
        db.String(8),
        nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        default=datetime.now,
        nullable=False
    )

    def __repr__(self):
        return f"<{self.__class__.__name__}: {self.id} - {self.title}>"

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

    start_date: Mapped[Optional[date]] = mapped_column(
        db.Date(),
        nullable=True
    )

    end_date: Mapped[Optional[date]] = mapped_column(
        db.Date(),
        nullable=True
    )

    # only 1 image url for now
    image_url: Mapped[Optional[str]] = mapped_column(
        db.String(2048)
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "createdAt": self.created_at,
            "status": self.status,
            "authorId": self.author_id,
            "affectedArea": self.affected_area,
            "urgency": self.urgency,
            "startDate": self.start_date,
            "endDate": self.end_date,
            "imageURL": self.image_url
        }

class Post(Content, db.Model):
    __tablename__ = "posts"

    author_id: Mapped[int] = mapped_column(
        db.ForeignKey("residents.id"),
        nullable=False
    )

    resident: Mapped["Resident"] = relationship(back_populates="posts")

    category: Mapped[str] = mapped_column(
        # categories: "to give away", "in search of", "something to share"
        db.String(18),
        nullable=False
    )

    is_approved: Mapped[bool] = mapped_column(nullable=False)

    contact_info: Mapped[Optional[str]] = mapped_column(
        db.String(255),
        nullable=True
    )

    start_date: Mapped[Optional[date]] = mapped_column(
        db.Date(),
        nullable=True
    )

    end_date: Mapped[Optional[date]] = mapped_column(
        db.Date(),
        nullable=True
    )

    # only 1 image url for now
    image_url: Mapped[Optional[str]] = mapped_column(
        db.String(2048)
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "createdAt": self.created_at,
            "status": self.status,
            "authorId": self.author_id,
            "author": self.resident.name,
            "category": self.category,
            "isApproved": self.is_approved,
            "contactInfo": self.contact_info,
            "startDate": self.start_date,
            "endDate": self.end_date,
            "imageURL": self.image_url
        }

    def approve_post(self):
        self.is_approved = True

class BuildingInfo(db.Model):
    __tablename__ = "building_info"

    id: Mapped[int] = mapped_column(primary_key=True)

    monday_hours: Mapped[str] = mapped_column(
        db.String(20),
        nullable=False
    )
    tuesday_hours: Mapped[str] = mapped_column(
        db.String(20),
        nullable=False
    )
    wednesday_hours: Mapped[str] = mapped_column(
        db.String(20),
        nullable=False
    )
    thursday_hours: Mapped[str] = mapped_column(
        db.String(20),
        nullable=False
    )
    friday_hours: Mapped[str] = mapped_column(
        db.String(20),
        nullable=False
    )
    saturday_hours: Mapped[str] = mapped_column(
        db.String(20),
        nullable=False
    )
    sunday_hours: Mapped[str] = mapped_column(
        db.String(20),
        nullable=False
    )
    office_room: Mapped[str] = mapped_column(
        db.String(50),
        nullable=False
    )
    street_address: Mapped[str] = mapped_column(
        db.String(100),
        nullable=False
    )
    city: Mapped[str] = mapped_column(
        db.String(50),
        nullable=False
    )
    province: Mapped[str] = mapped_column(
        db.String(2),
        nullable=False
    )
    postal_code: Mapped[str] = mapped_column(
        db.String(7),
        nullable=False
    )
    phone: Mapped[str] = mapped_column(
        db.String(14),
        nullable=False
    )
    email: Mapped[str] = mapped_column(
        db.String(255),
        nullable=False,
    )

    guidelines: Mapped[list["Guideline"]] = relationship(back_populates="building_info")

    def to_dict(self):
        return {
            "officeHours": {
                "monday": self.monday_hours,
                "tuesday": self.tuesday_hours,
                "wednesday": self.wednesday_hours,
                "thursday": self.thursday_hours,
                "friday": self.friday_hours,
                "saturday": self.saturday_hours,
                "sunday": self.sunday_hours
            },
            "officeLocation": {
                "room": self.office_room,
                "address": self.street_address,
                "city": self.city,
                "province": self.province,
                "postalCode": self.postal_code,
            },
            "contactInformation": {
                "phone": self.phone,
                "email": self.email
            }
        }

class Guideline(db.Model):
    __tablename__ = "guidelines"

    id: Mapped[int] = mapped_column(primary_key=True)
    
    rule: Mapped[str] = mapped_column(
        db.String(150),
        nullable=False
    )

    rule_type: Mapped[str] = mapped_column(
        db.String(20),
        nullable=False
    )

    info_id: Mapped[int] = mapped_column(
        db.ForeignKey("building_info.id"),
        nullable=False
    )

    building_info: Mapped["BuildingInfo"] = relationship(back_populates="guidelines")