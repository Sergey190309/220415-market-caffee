'''
The file contains class derived from Flask with initiating methods as well as
stand along initiating procedure. This procedure is needed to necessity
to have decorator with app instance.
'''

from dotenv import load_dotenv

from flask import Flask


def app_init(app):
    @app.before_first_request
    def init_before_first_request():
        '''
        The procedure is called before first application to database.
        '''
        pass
        # print('@app.before_first_request')
        # admin_password()
        # print('app_init.app_init')


class FlaskInit(Flask):
    def __init__(self, module_name: str):
        super().__init__(module_name)

        # Load environmental variables.
        load_dotenv('.env', verbose=True)
        self.config.from_object('default_config')
        self.config.from_envvar('APPLICATION_SETTINGS')
        # Flask upload configurations:
        # patch_request_class(self, self.config['MAX_CONTENT_LENGTH'])
        # configure_uploads(self, IMAGE_SET)
