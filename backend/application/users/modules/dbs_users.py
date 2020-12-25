# from flask import current_app
# from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy

# from application.globals import gc


# class SQLAlchemyBackend(SQLAlchemy):
#     def __init__(self):
#         super().__init__()


dbs_users = SQLAlchemy()
# dbs = SQLAlchemyBackend()
