# from auxiliary.modules.api import api
# from auxiliary.modules.ma import ma
# from auxiliary.modules.db import db
# from auxiliary.modules.fb import fb
# from auxiliary.modules.jwt import jwt
# from auxiliary.modules.bb import bb
# from auxiliary.modules.oa import oauth

# from auxiliary.initialization import initialization

from app import app
from initiation.init import connect_modules

connect_modules(app)

# api.init_app(app)  # RESTful
# db.init_app(app)  # SQLAlchemy
# ma.init_app(app)  # Marshmallow
# fb.init_app(app)  # Bcrypt
# jwt.init_app(app)  # JWTManager
# bb.init_app(app)  # Babel
# oauth.init_app(app)  # OAuth
# with app.app_context():
#     initialization()

if __name__ == "__main__":
    # app.run(host="0.0.0.0", port=5000, debug=True)
    app.run()
