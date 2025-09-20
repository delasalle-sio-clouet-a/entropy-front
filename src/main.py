from flask import Flask, redirect, url_for, render_template
from flask_cors import CORS
import logging
from secrets import token_hex
from os import path, environ
import requests

# récupérer la configuration
from config import config

# emplacement des répertoires templates (html) et static (css, ts et js)
templates_folder = path.abspath("../web/templates/")
static_folder = path.abspath("../web/static/")

if(__name__ == "__main__"):

    # récupérer le minEntropy et maxRedundancy de l'api
    try:
        urlConfig:str = config.urlApi + "/config"
        configApi = requests.get(urlConfig).json()["config"]
        config.minEntropy = configApi["minEntropy"]
        config.maxRedundancy = configApi["maxRedundancy"]
        print(f"config.minEntropy : {config.minEntropy}")
        print(f"config.maxRedundancy : {config.maxRedundancy}")
    except Exception as e:
        raise Exception(f"Une erreur est survenue lors de la récupération des paramètres depuis l'api :\r\n{e}")

    # instance de flask
    app:Flask = Flask(template_folder=templates_folder, static_folder=static_folder, import_name="app")
    app.logger.setLevel(logging.INFO)
    app.config["SECRET_KEY"] = token_hex(16)
    cors = CORS(app) # autoriser le cors pour toutes les routes

    # route racine
    @app.get("/")
    def root():
        return render_template("application.html",
                               urlApi=config.urlApi,
                               minEntropy=config.minEntropy,
                               maxRedundancy=config.maxRedundancy)
    
    app.run(host='0.0.0.0', port=int(environ.get("PORT", 5000)))