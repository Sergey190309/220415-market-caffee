import os

DEBUG = True

# print('\nSECRET_KEY -', SECRET_KEY)

# SQLALCHEMY_DATABASE_URI = 'sqlite:///home/sa/code/201201-market-caffee/backend/testdb.sqlite3'

SQLALCHEMY_DATABASE_URI = \
    'mysql+pymysql://' + \
    os.getenv('DATABASE_USER') + ':' + \
    os.getenv('DATABASE_PASSWORD') + '@' + \
    os.getenv('DATABASE_HOST') + '/' + \
    os.getenv('DATABASE_NAME')

# print('SQLALCHEMY_DATABASE_URI -', SQLALCHEMY_DATABASE_URI)

SQLALCHEMY_TRACK_MODIFICATIONS = False
PROPAGATE_EXCEPTIONS = True
SECRET_KEY = os.getenv('APP_SECRET_KEY')
JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
JWT_BLACKLIST_ENABLED = True
JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']
# Limit maximum bytes from incoming request data:
MAX_CONTENT_LENGTH = 10 * 1024 * 1024  # that's 10 mB
# Path for image uploads. Second name IMAGES in UPLOADED_IMAGES_DEST
# should be same as a "images" in
# IMAGE_SET = UploadSet("images", IMAGES)  in image_helper.py
UPLOADED_IMAGES_DEST = os.path.join('static', 'images')

# BASE_URL = 'http://localhost:5000'

# Mailing
MAIL_SERVER = 'smtp.gmail.com'
MAIL_PORT = 465
MAIL_USE_SSL = True
MAIL_USERNAME = os.getenv('MAIL_USERNAME')
MAIL_PASSWORD = os.getenv('MAIL_PASSWORD')
MAIL_DEFAULT_SENDER = ('TestSender', MAIL_USERNAME)
MAIL_USE_SSL = True
