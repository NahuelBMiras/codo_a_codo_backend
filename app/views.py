from flask import (
    Blueprint,
    request,
    render_template,
    jsonify,
    session,
    redirect,
    url_for,
)
from .models import Users, Products, Articulo, PathImg
from .database import db, bcrypt
from functools import wraps

main_bp = Blueprint("main", __name__)


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if "user_id" not in session:
            return redirect(url_for(".login"))
        return f(*args, **kwargs)

    return decorated_function


@main_bp.route("/", methods=["GET"])
@main_bp.route("/index/", methods=["GET"])
def index():
    # Consulta para obtener los productos con sus artículos y las imágenes asociadas
    productos = (
        Products.query.join(Articulo)
        .join(PathImg)
        .order_by(Products.tiempo_de_subida.desc())
        .limit(6)
        .all()
    )

    # Depuración: imprimir productos obtenidos
    for producto in productos:
        print(f"Producto: {producto.producto}, Precio: {producto.precio}")
        for articulo in producto.articulos:
            print(
                f"  Articulo ID: {articulo.id_articulo}, Imagen: {articulo.path_img.path_img_producto_inicio}"
            )

    return render_template("index.html", productos=productos)


@main_bp.route("/productos/", methods=["GET"])
def productos():
    # Consulta para obtener los productos con sus artículos y las imágenes asociadas
    productos = Products.query.join(Articulo).join(PathImg).all()

    # Depuración: imprimir productos obtenidos
    for producto in productos:
        print(f"Producto: {producto.producto}, Precio: {producto.precio}")
        for articulo in producto.articulos:
            print(
                f"  Articulo ID: {articulo.id_articulo}, Imagen: {articulo.path_img.path_img_producto_productos}"
            )

    return render_template("productos.html", productos=productos)


@main_bp.route("/sobre_nosotros/", methods=["GET"])
def sobre_nosotros():
    return render_template("sobre_nosotros.html")


@main_bp.route("/contacto/", methods=["GET"])
def contacto():
    return render_template("contacto.html")


@main_bp.route("/edit_user/", methods=["GET", "PUT"])
@login_required
def edit_user():
    user_id = session.get("user_id")
    if not user_id:
        # Manejo si el usuario no tiene sesión activa
        return redirect(url_for(".login"))

    user = Users.query.filter_by(id_usuario=user_id).first()

    if request.method == "PUT":
        try:
            data = request.get_json()
            user.nombre = data["nombre"]
            user.apellido = data["apellido"]
            user.mail = data["mail"]
            if "password" in data and data["password"]:
                user.password_hash = bcrypt.generate_password_hash(
                    data["password"]
                ).decode("utf-8")
            db.session.commit()
            return jsonify(success=True, message="Datos actualizados correctamente")

        except Exception as e:
            return (
                jsonify(success=False, message="Se produjo un error", error=str(e)),
                500,
            )

    return render_template("edit_user.jinja", user=user)


@main_bp.route("/user_profile/", methods=["GET"])
@login_required
def user_profile():
    user_id = session["user_id"]
    user = Users.query.filter_by(id_usuario=user_id).first()
    return render_template("user.jinja", user=user)


@main_bp.route("/register/", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        try:
            data = request.get_json()
            nombre = data["nombre"]
            apellido = data["apellido"]
            email = data["mail"]
            password = data["password"]

            user = Users.query.filter_by(mail=email).first()
            if user:
                return jsonify(message="Correo electrónico ya registrado"), 409

            new_user = Users(
                nombre=nombre, apellido=apellido, mail=email, password=password
            )
            db.session.add(new_user)
            db.session.commit()
            return jsonify(success=True, message="Registro exitoso")

        except Exception as e:
            return (
                jsonify(success=False, message="Se produjo un error", error=str(e)),
                500,
            )

    return render_template("register.jinja")


@main_bp.route("/login/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        try:
            data = request.get_json()
            email = data["mail"]
            password = data["password"]

            user = Users.query.filter_by(mail=email).first()
            if user and bcrypt.check_password_hash(user.password_hash, password):
                session["user_id"] = user.id_usuario
                session["user_email"] = user.mail
                return jsonify(
                    success=True, redirect_url=url_for(".user_profile")
                )  # Devuelve JSON con URL de redirección
            else:
                return jsonify(success=False, message="Credenciales inválidas"), 401

        except Exception as e:
            return (
                jsonify(success=False, message="Se produjo un error", error=str(e)),
                500,
            )

    return render_template("login.jinja")


@main_bp.route("/logout/", methods=["POST"])
def logout():
    session.pop("user_id", None)
    session.pop("user_email", None)
    return redirect(url_for(".index"))


@main_bp.route("/delete_account/", methods=["DELETE"])
@login_required
def delete_account():
    user_id = session["user_id"]
    user = Users.query.filter_by(id_usuario=user_id).first()

    if not user:
        return jsonify(success=False, message="Usuario no encontrado"), 404

    try:
        data = request.get_json()
        password = data["password"]

        if bcrypt.check_password_hash(user.password_hash, password):
            db.session.delete(user)
            db.session.commit()
            session.pop("user_id", None)
            session.pop("user_email", None)
            return jsonify(
                success=True,
                message="Cuenta eliminada exitosamente",
                redirect_url=url_for(".index"),
            )
        else:
            return jsonify(success=False, message="Contraseña incorrecta"), 401
    except Exception as e:
        return jsonify(success=False, message="Se produjo un error", error=str(e)), 500
