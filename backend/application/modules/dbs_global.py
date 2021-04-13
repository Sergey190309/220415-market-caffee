from flask_sqlalchemy import SQLAlchemy


# import application.components.models

class SQLAlchemyGlobal(SQLAlchemy):
    def __init__(self):
        # print('\nSQLAlchemyGlobal')
        super().__init__()


# dbs_global = SQLAlchemy()
dbs_global = SQLAlchemyGlobal()
