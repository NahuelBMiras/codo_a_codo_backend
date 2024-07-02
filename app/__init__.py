from flask import Flask
from .database import db, bcrypt
from .views import main_bp
from dotenv import load_dotenv
import os
import logging


def create_app():
    load_dotenv()

    app = Flask(__name__)
    app.secret_key = os.getenv("SECRET_KEY", "default_secret_key")

    app.config.from_object("app.config.Config")

    logging.basicConfig(level=logging.INFO)
    logging.info(f"DB_USER: {os.getenv('DB_USER')}")
    logging.info(f"DB_PASSWORD: {os.getenv('DB_PASSWORD')}")
    logging.info(f"DB_HOST: {os.getenv('DB_HOST')}")
    logging.info(f"DB_NAME: {os.getenv('DB_NAME')}")

    db.init_app(app)
    bcrypt.init_app(app)

    app.register_blueprint(main_bp)

    if not app.debug:
        logging.basicConfig(filename="error.log", level=logging.ERROR)

    return app
