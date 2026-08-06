from sqlalchemy import Date, DateTime
from datetime import date, datetime

from models import db, User, Admin, Resident
from flask import flash

def find_user(email):
    return User.query.filter_by(email=email).first()

def convert_to_date(date):
    date_obj = datetime.strptime(date,  "%Y-%m-%d")

    return date_obj

def validate_name(name):
    name_errors = []

    if not name:
        name_errors.append("Name is a required field")

    if len(name) < 5:
        name_errors.append("Name should be at least 5 characters")
    if len(name) > 100:
        name_errors.append("Name cannot have more than 50 characters")
    
    if not any(character.isspace() for character in name):
        name_errors.append("Name should include first name and last name")
    
    if not name_errors:
        return None

    return name_errors

def validate_email(email):
    email_errors = []

    if not email:
        email_errors.append("Email is a required field")

    if len(email) < 6:
        email_errors.append("Email address must contain at least 6 characters")
    if len(email) > 255:
        email_errors.append("Email address cannot be longer than 254 characters")
    
    if not ("@" in email and "." in email):
        email_errors.append("Please enter a valid email address")

    existing_email = User.query.filter_by(email=email).first()
    if existing_email:
        email_errors.append("This email is not available. Enter a different email address")
    
    if not email_errors:
        return None

    return email_errors

def validate_password(password):
    password_errors = []

    if not password:
        password_errors.append("Password is a required field")

    if len(password) < 8:
        password_errors.append("Password must contain at least 8 characters")
    if len(password) > 20:
        password_errors.append("Password must contain at most 20 characters")
    
    if not any(character.isupper() for character in password):
        password_errors.append("Password must contain at least one uppercase letter")
    
    if not any(character.isdigit() for character in password):
        password_errors.append("Password must contain at least one digit")
    
    if not password_errors:
        return None

    return password_errors

def validate_apartment(apartment):
    apartment_errors = []

    if not apartment:
        apartment_errors.append("Apartment is a required field")
    
    if len(apartment) < 4 or len(apartment) > 4:
        apartment_errors.append("Apartment number should be 4 characters")
    
    if not apartment[-1].isalpha():
        apartment_errors.append("The last character of the apartment number should be a letter")
    
    if not apartment[:3].isdigit():
        apartment_errors.append("The first three characters of the apartment number should be numbers")
    
    if not apartment_errors:
        return None
    
    return apartment_errors

def validate_locker(locker):
    locker_errors = []

    if not locker:
        locker_errors.append("Locker location is a required field")
    
    existing_locker = Resident.query.filter_by(locker_location=locker).first()
    if existing_locker:
        locker_errors.append("Selected locker location is already assigned")
        
    if len(locker) < 4 or len(locker) > 4:
        locker_errors.append("Locker location should be 4 characters")
    
    if not(locker[1] == "-"):
        locker_errors.append("Locker location's second character should be a '-' character")
    
    locker_digits = locker[0] + locker[2:]
    if not locker_digits.isdigit():
        locker_errors.append("All characters other than the '-' should be a number")
    
    if not locker_errors:
        return None
    
    return locker_errors

def validate_date(lease_date):
    date_errors = []

    if not lease_date:
        date_errors.append("Lease date is a required field")

    try:
        datetime.strptime(lease_date, "%Y-%m-%d")

        if not date_errors:
            return None
        
        return date_errors
    
    except ValueError:
        date_errors.append("Date should follow YYYY-mm-dd format")

        return date_errors

def validate_parking_status(parking_status):
    parking_errors = []
    status_options = ["paid", "late", "revoked", "inactive"]

    if not parking_status:
        parking_errors.append("Parking status is a required field")

    if not(parking_status in status_options):
        parking_errors.append("Parking status must be one of 'paid', 'late', 'revoked', or 'inactive'")
    
    if not parking_errors:
        return None
    
    return parking_errors

def flash_errors(errors):
    for error in errors:
        for error_msg in error:
            flash(error_msg, "error")
            print(error_msg)

