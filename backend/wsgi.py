# from auxiliary.modules.api import api
# from auxiliary.modules.ma import ma
# from auxiliary.modules.db import db
# from auxiliary.modules.fb import fb
# from auxiliary.modules.jwt import jwt
# from auxiliary.modules.bb import bb
# from auxiliary.modules.oa import oauth

# from auxiliary.initialization import initialization

# print('wsgi.py')
from application import create_app

app = create_app()


if __name__ == "__main__":
    # print('test')
    # app.run(host="0.0.0.0", port=5000, debug=True)
    app.run()
