from .database import db, bcrypt


class Users(db.Model):
    __tablename__ = "usuario"

    id_usuario = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(75), nullable=False)
    apellido = db.Column(db.String(75), nullable=False)
    mail = db.Column(db.String(75), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    def __init__(self, nombre, apellido, mail, password):
        self.nombre = nombre
        self.apellido = apellido
        self.mail = mail
        self.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def delete(self):
        db.session.delete(self)
        db.session.commit()


class Stock(db.Model):
    __tablename__ = "stock"

    id_stock = db.Column(db.Integer, primary_key=True, autoincrement=True)
    stock = db.Column(db.Boolean, nullable=False)

    def __init__(self, stock):
        self.stock = stock


class Categoria(db.Model):
    __tablename__ = "categoria"

    id_categoria = db.Column(db.Integer, primary_key=True, autoincrement=True)
    categoria = db.Column(db.String(50), nullable=False)

    def __init__(self, categoria):
        self.categoria = categoria


class PathImg(db.Model):
    __tablename__ = "path_img"

    id_path_img_producto = db.Column(db.Integer, primary_key=True, autoincrement=True)
    path_img_producto_productos = db.Column(db.String(150), nullable=False)
    path_img_producto_inicio = db.Column(db.String(150), nullable=False)

    articulos = db.relationship(
        "Articulo", back_populates="path_img", overlaps="path_img_rel"
    )

    def __init__(self, path_img_producto_productos, path_img_producto_inicio):
        self.path_img_producto_productos = path_img_producto_productos
        self.path_img_producto_inicio = path_img_producto_inicio


class Products(db.Model):
    __tablename__ = "producto"

    id_producto = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_categoria = db.Column(
        db.Integer, db.ForeignKey("categoria.id_categoria"), nullable=False
    )
    id_stock = db.Column(db.Integer, db.ForeignKey("stock.id_stock"), nullable=False)
    precio = db.Column(db.Integer, nullable=False)
    producto = db.Column(db.String(100), nullable=False)

    tiempo_de_subida = db.Column(
        db.DateTime, default=db.func.current_timestamp(), nullable=False
    )

    categoria_rel = db.relationship(
        "Categoria", backref=db.backref("productos", lazy=True)
    )
    stock_rel = db.relationship("Stock", backref=db.backref("productos", lazy=True))
    articulos = db.relationship(
        "Articulo", back_populates="producto", overlaps="articulo_rel"
    )

    def __init__(self, id_categoria, id_stock, precio, producto):
        self.id_categoria = id_categoria
        self.id_stock = id_stock
        self.precio = precio
        self.producto = producto


class Articulo(db.Model):
    __tablename__ = "articulo"

    id_articulo = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_producto = db.Column(
        db.Integer, db.ForeignKey("producto.id_producto"), nullable=False
    )
    id_path_img_producto = db.Column(
        db.Integer, db.ForeignKey("path_img.id_path_img_producto"), nullable=False
    )

    path_img = db.relationship(
        "PathImg", back_populates="articulos", overlaps="articulo_rel"
    )
    producto = db.relationship(
        "Products", back_populates="articulos", overlaps="articulo_rel"
    )

    def __init__(self, id_producto, id_path_img_producto):
        self.id_producto = id_producto
        self.id_path_img_producto = id_path_img_producto
