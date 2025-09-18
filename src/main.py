from flask import Flask, redirect, url_for, render_template
import logging
from secrets import token_hex
from os import path

# récupérer la configuration
from config import config

# emplacement des répertoires templates (html) et static (css, ts et js)
templates_folder = path.abspath("../web/templates/")
static_folder = path.abspath("../web/static/")

if(__name__ == "__main__"):

    # instance de flask
    app:Flask = Flask(template_folder=templates_folder, static_folder=static_folder, import_name="app")
    app.logger.setLevel(logging.INFO)
    app.config["SECRET_KEY"] = token_hex(16)

    # enregistrement des contrôleurs
    from blueprints.AuthBlueprint import authBP
    app.register_blueprint(authBP)

    # route racine
    @app.get("/")
    def root():
        #return redirect(url_for("authBP.connexion"))
        return render_template("application.html", urlApi=config.urlApi)
    
    app.run(host='0.0.0.0', port=5001)