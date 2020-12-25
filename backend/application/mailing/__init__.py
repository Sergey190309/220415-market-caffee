from flask import Blueprint, current_app


def create_mailing():
    mailing_bp = Blueprint(
        'mailing_bp', __name__
    )

    with current_app.app_context():
        # Flask-Mail application
        from .modules.fml import fml
        fml.init_app(current_app)

    return mailing_bp
