from flask_jwt_extended import JWTManager

from ..errors.register_errors_users import set_jwt_error_handlers
from ..modules.blacklist import BLACKLIST


class JWTManagerUsers(JWTManager):
    def __init__(self):
        super().__init__()
        set_jwt_error_handlers(self)
        self.loaders()

    def loaders(self):
        # print('JWTManagerUsers ->')
        # This method will check if a token is blacklisted, and will be
        # called automatically when blacklist is enabled

        @self.token_in_blocklist_loader
        def check_if_token_in_block_list(jwt_header, jwt_payload):
            jti = jwt_payload['jti']
            return jti in BLACKLIST
            # return decripted_token['jti'] in BLACKLIST
            # Here we blacklist particular
            # JWTs that have been created in the past. jti - unique
            # identity.

        # The following callbacks are used for customizing jwt response/
        # error messages.
        # The original ones may not be in a very pretty format
        # (opinionated)

        @self.additional_claims_loader
        # decorator link the function with jwt
        def add_claim_to_jwt(identity):
            # identity - same as we pass to
            # JWT extended in create_access_token.
            # Remember identity is what we define when creating
            # the access token
            return {'id': identity}


jwt_users = JWTManagerUsers()
