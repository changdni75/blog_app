from mongoengine import Document, fields
from accounts.models import User  # Import the custom User model

class Blog(Document):
    title = fields.StringField(required=True)
    content = fields.StringField(required=True)
    author = fields.ReferenceField(User)  # Reference the User model
