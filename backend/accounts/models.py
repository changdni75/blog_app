from mongoengine import Document, StringField

class User(Document):
    email = StringField(required=True, unique=True)
    password = StringField(required=True)

    @property
    def is_authenticated(self):
        return True

    @property
    def is_anonymous(self):
        return False
