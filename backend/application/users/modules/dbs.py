from flask_sqlalchemy import SQLAlchemy


class SQLAlchemyBackend(SQLAlchemy):
    def __init__(self):
        super().__init__()
        print('\nmodules.dbs.SQLAlchemyBackend.__init__\n')

    def init_app(self):
        super().__init__()
        try:
            # Create tables if not exists.
            self.create_all()
        except Exception as err:
            print('modules.dbs.SQLAlchemyBackend.init_app error:\n', err)


dbs = SQLAlchemyBackend()
