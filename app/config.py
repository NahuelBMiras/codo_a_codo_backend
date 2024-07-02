import os
import logging


class Config:
    DB_USER = os.getenv("DB_USER", "nahuelBmiras")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "TigritoTegrita")
    DB_HOST = os.getenv("DB_HOST", "nahuelBmiras.mysql.pythonanywhere-services.com")
    DB_NAME = os.getenv("DB_NAME", "nahuelBmiras$test")
    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:3306/{DB_NAME}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Log the database URI
    logging.basicConfig(level=logging.INFO)
    logging.info(f"SQLALCHEMY_DATABASE_URI: {SQLALCHEMY_DATABASE_URI}")
