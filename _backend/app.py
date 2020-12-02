from flask_extentions.app_init import FlaskInit

# It's here to give possibility other modules have access to env on their initiation.
app = FlaskInit(__name__)

from initiation.init import connect_modules
# from flask_extentions.api import api
# from flask_extentions.fbp import fbp

connect_modules(app)

if __name__ == "__main__":

    connect_modules(app)

    app.run(host="0.0.0.0", port=5000)
