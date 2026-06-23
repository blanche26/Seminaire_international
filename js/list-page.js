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
        boutonReconnect.addEventListener(
            "click",
            recupererMembres
        );
    }
}

/*
====================================
RÉCUPÉRATION DES PARTICIPANTS
====================================
*/
function recupererMembres() {

    const zoneTableau =
        document.getElementById(
            "table-body"
        );

    const zoneChargement =
        document.getElementById(
            "loading-container"
        );

    const zoneErreur =
        document.getElementById(
            "error-message"
        );

    if (zoneChargement) {
        zoneChargement.style.display =
            "block";
    }

    if (zoneErreur) {
        zoneErreur.style.display =
            "none";
    }

    fetch(API_URL)

        .then(function (response) {

            if (!response.ok) {
                throw new Error(
                    "Erreur serveur"
                );
            }

            return response.json();
        })

        .then(function (liste) {

            if (zoneChargement) {
                zoneChargement.style.display =
                    "none";
            }

            if (!zoneTableau) {
                return;
            }

            zoneTableau.innerHTML = "";

            for (
                let i = 0;
                i < liste.length;
                i++
            ) {

                const personne =
                    liste[i];

                const ligne =
                    document.createElement(
                        "tr"
                    );

                /*
                PHOTO
                */
                const tdPhoto =
                    document.createElement(
                        "td"
                    );

                const imageProfil =
                    document.createElement(
                        "img"
                    );

                imageProfil.src =
                    personne.avatar ||
                    "https://via.placeholder.com/40";

                imageProfil.style.width =
                    "40px";

                imageProfil.style.height =
                    "40px";

                imageProfil.style.borderRadius =
                    "50%";

                imageProfil.style.objectFit =
                    "cover";

                tdPhoto.appendChild(
                    imageProfil
                );

                ligne.appendChild(
                    tdPhoto
                );

                /*
                NOM
                */
                const tdNom =
                    document.createElement(
                        "td"
                    );

                tdNom.textContent =
                    personne.name ||
                    "Sans nom";

                ligne.appendChild(
                    tdNom
                );

                /*
                STATUT
                */
                const tdStatut =
                    document.createElement(
                        "td"
                    );

                tdStatut.textContent =
                    personne.statut ||
                    "Participant";

                ligne.appendChild(
                    tdStatut
                );

                /*
                PAYS
                */
                const tdPays =
                    document.createElement(
                        "td"
                    );

                tdPays.textContent = personne.pays || "Non spécifié";

                ligne.appendChild(
                    tdPays
                );

                /*
                EMAIL
                */
                const tdEmail =
                    document.createElement(
                        "td"
                    );

                tdEmail.textContent =
                    personne.email ||
                    "—";

                ligne.appendChild(
                    tdEmail
                );

                /*
                TÉLÉPHONE
                */
                const tdTel =
                    document.createElement(
                        "td"
                    );

                tdTel.textContent =
                    personne.telephone ||
                    "—";

                ligne.appendChild(
                    tdTel
                );

                /*
                THÉMATIQUE
                */
                const tdTheme =
                    document.createElement(
                        "td"
                    );

                tdTheme.textContent =
                    personne.thematiquedintervention ||
                    "—";

                ligne.appendChild(
                    tdTheme
                );

                /*
                BOUTONS D'ACTION (VOIR & SUPPRIMER)
                */
                const tdAction =
                    document.createElement(
                        "td"
                    );

                const boutonVoir =
                    document.createElement(
                        "a"
                    );

                boutonVoir.href =
                    "./Participant.html?id=" +
                    personne.id;

                boutonVoir.textContent =
                    "Voir";

                boutonVoir.className =
                    "btn-action-voir";

                tdAction.appendChild(
                    boutonVoir
                );

                // AJOUT DU BOUTON SUPPRIMER
                const boutonSupprimer =
                    document.createElement(
                        "button"
                    );

                boutonSupprimer.textContent =
                    "Supprimer";

                boutonSupprimer.className =
                    "btn-action-supprimer";

                boutonSupprimer.style.marginLeft =
                    "10px";

                boutonSupprimer.addEventListener(
                    "click",
                    function () {
                        supprimerMembre(
                            personne.id,
                            personne.name
                        );
                    }
                );

                tdAction.appendChild(
                    boutonSupprimer
                );

                ligne.appendChild(
                    tdAction
                );

                zoneTableau.appendChild(
                    ligne
                );
            }
        })

        .catch(function (err) {

            console.error(
                "Erreur :",
                err
            );

            if (zoneChargement) {
                zoneChargement.style.display =
                    "none";
            }

            if (zoneErreur) {
                zoneErreur.style.display =
                    "block";
            }
        });
}

/*
====================================
SUPPRESSION D'UN PARTICIPANT (DELETE)
====================================
*/
function supprimerMembre(id, nom) {

    const confirmation = confirm(
        "Voulez-vous vraiment supprimer " + nom + " ?"
    );

    if (!confirmation) {
        return;
    }

    fetch(API_URL + "/" + id, {
        method: "DELETE"
    })
        .then(function (response) {

            if (!response.ok) {
                throw new Error(
                    "Erreur lors de la suppression"
                );
            }

            return response.json();
        })
        .then(function () {
            alert(
                "Le membre a été supprimé avec succès."
            );
            recupererMembres();
        })
        .catch(function (err) {
            console.error(
                "Erreur :",
                err
            );
            alert(
                "Impossible de supprimer ce participant."
            );
        });
}

/*
====================================
AJOUT D'UN PARTICIPANT
====================================
*/
function enregistrerMembre(
    evenement
) {

    evenement.preventDefault();

    const donneesFormulaire = {

        name:
            document
                .getElementById(
                    "input-name"
                )
                .value.trim(),

        statut:
            document
                .getElementById(
                    "select-role"
                )
                .value,

        pays:
            document
                .getElementById(
                    "input-country"
                )
                .value.trim(),

        email:
            document
                .getElementById(
                    "input-email"
                )
                .value.trim(),

        telephone:
            document
                .getElementById(
                    "input-phone"
                )
                .value.trim(),

        thematiquedintervention:
            document
                .getElementById(
                    "input-topic"
                )
                .value.trim(),

        avatar:
            document
                .getElementById(
                    "input-avatar"
                )
                .value.trim()
    };

    fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type":
                "application/json"
        },

        body: JSON.stringify(
            donneesFormulaire
        )
    })

        .then(function (response) {

            if (!response.ok) {
                throw new Error(
                    "Erreur d'enregistrement"
                );
            }

            return response.json();
        })

        .then(function () {

            document
                .getElementById(
                    "add-participant-form"
                )
                .reset();

            recupererMembres();

            alert(
                "Participant enregistré avec succès."
            );
        })

        .catch(function (err) {

            console.error(
                "Erreur :",
                err
            );

            alert(
                "Impossible d'enregistrer le participant."
            );
        });
}
