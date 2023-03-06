# import os

DEBUG = True
# Enable the TESTING flag to disable the error catching during request
# handling so that you get better error reports when performing test
# requests against the application.
TESTING = True
# SECRET_KEY = os.getenv('APP_SECRET_KEY')
# print('\nSECRET_KEY -', SECRET_KEY)

# SQLALCHEMY_DATABASE_URI =
#       'sqlite:////home/sa/code/201201-market-caffee/backend/
# testdb.sqlite3'

DATABASE_USER = 'coffee'
# DATABASE_PASSWORD = 'lkdl;llLLpoi0988**9890'
DATABASE_PASSWORD = 'iij0*(*(*())^%^G'
DATABASE_HOST = 'localhost'
DATABASE_NAME = 'market_coffee_test'

SQLALCHEMY_DATABASE_URI = \
    'mysql+pymysql://' + \
    DATABASE_USER + ':' + \
    DATABASE_PASSWORD + '@' + \
    DATABASE_HOST + '/' + \
    DATABASE_NAME


SQLALCHEMY_TRACK_MODIFICATIONS = False
PROPAGATE_EXCEPTIONS = True
JWT_SECRET_KEY = 'very_SECRET_KEY!'
# JWT_BLACKLIST_ENABLED = True
# JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']

# Limit maximum bytes from incoming request data:

# MAX_CONTENT_LENGTH = 10 * 1024 * 1024  # that's 10 mB

# Path for image uploads. Second name IMAGES in UPLOADED_IMAGES_DEST
# should be same as a "images" in
# IMAGE_SET = UploadSet("images", IMAGES)  in image_helper.py

# UPLOADED_IMAGES_DEST = os.path.join('static', 'images')

# BASE_URL = 'http://localhost:5000'

# Mailing
MAIL_SERVER = 'smtp-relay.sendinblue.com'
MAIL_PORT = 587
MAIL_USERNAME = 'sa6702@gmail.com'
MAIL_PASSWORD = 'xsmtpsib-6c8e1daad205cffaa2feba0c413cf4eba1e7fe5d9f661177d0a7'\
    '249fc70b578b-qRfEaZIH3JVjNwpn'
MAIL_USE_TLS = True
MAIL_USE_SSL = True
