from flask import jsonify

from flask_babelplus import lazy_gettext as _

from ..modules.blacklist import BLACKLIST


def set_loaders(jwt):
    '''
    The procedure register error handling resulted from
    flask JWT extended activity.
    '''
    # This method will check if a token is blacklisted, and will be called
    # automatically when blacklist is enabled
    @jwt.token_in_blacklist_loader
    def check_if_token_in_black_list(decripted_token):
        return decripted_token['jti'] in BLACKLIST
        # Here we blacklist particular
        # JWTs that have been created in the past. jti - unique identity.

    # The following callbacks are used for customizing jwt response/
    # error messages.
    # The original ones may not be in a very pretty format (opinionated)
    @jwt.user_claims_loader  # decorator link the function with jwt
    def add_claim_to_jwt(identity):  # identity - same as we pass to
        # JWT extended in create_access_token.
        # Remember identity is what we define when creating
        # the access token
        return identity

    # The following callbacks are used for customizing jwt response/
    # error messages.
    # The original ones may not be in a very pretty format (opinionated)
    @jwt.expired_token_loader
    #  the function called when token expired
    def expired_token_callback():
        return jsonify({
            # 'description': 'The token has expired.',
            'description': str(_('The token has expired.')),
            'error': 'token_expired'
        }), 401

    @jwt.invalid_token_loader
    def invalid_token_callback(error):  # we have to keep the
        # argument here, since it's passed in by the caller internally
        return jsonify({
            'description': str(_('Signature verification failed.')),
            'error': 'invalid_token'
        }), 401

    @jwt.unauthorized_loader
    def missing_token_callback(error):
        return jsonify({
            'description': str(_('Request does not contain an access token.')),
            'error': 'authorization_required'
        }), 401

    @jwt.needs_fresh_token_loader
    def token_not_fresh_callback():
        return jsonify({
            'description': str(_('The token is not fresh.')),
            'error': 'fresh_token_required'
        }), 401

    @jwt.revoked_token_loader
    def revoked_token_callback():
        return jsonify({
            'description': str(_('The token has been revoked.')),
            'error': 'token_revoked'
        }), 401
