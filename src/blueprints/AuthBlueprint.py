from flask import Blueprint, render_template
from config import config

authBP = Blueprint("authBP", "authBP")

# route de connexion
@authBP.get("/connexion")
def connexion():
    return render_template("connexion.html", urlApi=config.urlApi)

# route pour créer un compte
@authBP.get("/creercompte")
def creercompte():
    return render_template("creercompte.html", urlApi=config.urlApi)