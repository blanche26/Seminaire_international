const API_URL =
    "https://6a3676af766b831960f941b8.mockapi.io/participants";

/*
====================================
INITIALISATION DE LA PAGE
====================================
*/
function initPageListe() {

    recupererMembres();

    const formulaire =
        document.getElementById(
            "add-participant-form"
        );

    if (formulaire) {
        formulaire.addEventListener(
            "submit",
            enregistrerMembre
        );
    }

    const boutonReconnect =
        document.getElementById(
            "btn-reconnect"
        );

    if (boutonReconnect) {
