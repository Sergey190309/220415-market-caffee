# from auxiliary.init_procedures.api_init import api_init
# from auxiliary.init_procedures.jwt_init import jwt_init
from auxiliary.init_procedures.admin_init import admin_init
from auxiliary.init_procedures.db_init import db_init
# from auxiliary.init_procedures.bb_init import bb_init


def initialization():
    '''
    The procedure run all initialization ones.
    It started after all modules connection to flask application.
    '''

    # Create table if they do not exixt
    db_init()

    # print("It's init")
    # admin user creation
    admin_init()
