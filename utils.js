/**
 * Fonctions utilitaires (utils.js)
 * Gère l'affichage des états de chargement (loading) et des messages d'erreur
 */

function gererStatutChargement(idElement, afficher) {
    const conteneur = document.getElementById(idElement);
    if (conteneur) {
        conteneur.style.display = afficher ? "block" : "none";
    }
}

function afficherMessageErreur(idElement, message) {
    const conteneur = document.getElementById(idElement);
    if (conteneur) {
        conteneur.textContent = message;
        conteneur.style.display = "block";
    }
}
