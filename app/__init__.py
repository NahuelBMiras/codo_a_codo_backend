from flask import Flask
from .database import db, ma, bcrypt
from .views import main_bp
from dotenv import load_dotenv
import os

def create_app():
    load_dotenv()

    app = Flask(__name__)
    app.secret_key = os.getenv("SECRET_KEY", "default_secret_key")
    
    app.config.from_object('app.config.Config')

    # Inicializar extensiones
    db.init_app(app)
    ma.init_app(app)
    bcrypt.init_app(app)
    
    # Registrar blueprints
    app.register_blueprint(main_bp)

    return app
