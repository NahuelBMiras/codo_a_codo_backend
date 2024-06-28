from .database import db, bcrypt

class Users(db.Model):
    __tablename__ = 'usuario'  # Nombre de la tabla existente en tu base de datos

    id_usuario = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(50), nullable=False)
    apellido = db.Column(db.String(50), nullable=False)
    mail = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    def __init__(self, nombre, apellido, mail, password):
        self.nombre = nombre
        self.apellido = apellido
        self.mail = mail
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
