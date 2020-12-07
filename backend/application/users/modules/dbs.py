from flask_sqlalchemy import SQLAlchemy


def _load_models():
    '''
    User to allow create_all create those tables.
    Error is normal.
    '''
    from ..models.confirmations import ConfirmationModel
    from ..models.users import UserModel
    from ..models.roles import RoleModel
    from ..models.locales import LocaleModel
    # print('\nmodules.dbs.SQLAlchemyBackend.__init__\n')


class SQLAlchemyBackend(SQLAlchemy):
    def __init__(self):
        # def __init__(self, module):
        super().__init__()

        # print('\nmodules.dbs.SQLAlchemyBackend.__init__\n')

        # self.init_app(module)

        # self.init_dbs()

    def init_dbs(self):
        _load_models()

        # print(
        #     '\nmodules.dbs.SQLAlchemyBackend.init_dbs -',
        #     self.engine,
        #     '\n'
        # )

        try:
            # print('\nmodules.dbs.SQLAlchemyBackend.init_dbs within try\n')
            # Create tables if not exists.
            self.create_all()
            # self.create_all(app=self)
        except Exception as err:
            print('modules.dbs.SQLAlchemyBackend.init_app error:\n', err)
        # print(
        #     '\nmodules.dbs.SQLAlchemyBackend.init_dbs after crate all -',
        #     self.get_app(),
        #     '\n'
        # )


dbs = SQLAlchemyBackend()
