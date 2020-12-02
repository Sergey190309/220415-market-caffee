from app import app
from initiation.init import connect_modules

connect_modules(app)

if __name__ == "__main__":
    # app.run(host="0.0.0.0")
    app.run()
