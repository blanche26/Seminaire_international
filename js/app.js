document.addEventListener("DOMContentLoaded", function () {

    if (typeof initMobileNav === "function") {
        initMobileNav();
    }

    if (
        document.getElementById("table-body") &&
        typeof initPageListe === "function"
    ) {
        initPageListe();
    }

    if (
        document.getElementById("participant-detail-card") &&
        typeof initPageDetail === "function"
    ) {
        initPageDetail();
    }
});

/* ========================================================================
AJOUT : FONCTION POUR REMPLIR ET MODIFIER LE DETAIL D'UN PARTICIPANT
========================================================================
*/
function initPageDetail() {
    // 1. On récupère l'identifiant (?id=...) dans la barre d'adresse
    const parametres = new URLSearchParams(window.location.search);
    const idParticipant = parametres.get("id");

    if (!idParticipant) {
        alert("Aucun identifiant de membre trouvé.");
        return;
    }

    const zoneChargement = document.querySelector(".loading-placeholder");

    // 2. Récupération des données du participant sur MockAPI
    fetch("https://6a3676af766b831960f941b8.mockapi.io/participants/" + idParticipant)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Impossible de joindre le serveur");
            }
            return response.json();
        })
        .then(function (personne) {
            // On cache le message de chargement
            if (zoneChargement) {
                zoneChargement.style.display = "none";
            }

            // On remplit automatiquement les champs du formulaire de modification
            document.getElementById("edit-name").value = personne.name || "";
            document.getElementById("edit-role").value = personne.statut || "Participant";
            document.getElementById("edit-country").value = personne.pays || "";
            document.getElementById("edit-email").value = personne.email || "";
            document.getElementById("edit-phone").value = personne.telephone || "";
            document.getElementById("edit-avatar").value = personne.avatar || "";
            
            // Utilisation de ta clé exacte 'thematiquedintervention'
            document.getElementById("edit-topic").value = personne.thematiquedintervention || "";
        })
        .catch(function (err) {
            console.error("Erreur :", err);
            if (zoneChargement) {
                zoneChargement.innerHTML = "<p style='color:red;'>Erreur lors de la récupération des détails.</p>";
            }
        });

    // 3. Écoute de la soumission du formulaire pour enregistrer les modifications (PUT)
    const formulaireEdition = document.getElementById("edit-participant-form");
    if (formulaireEdition) {
        formulaireEdition.addEventListener("submit", function (evenement) {
            evenement.preventDefault();

            const donneesModifiees = {
                name: document.getElementById("edit-name").value.trim(),
                statut: document.getElementById("edit-role").value,
                pays: document.getElementById("edit-country").value.trim(),
                email: document.getElementById("edit-email").value.trim(),
                telephone: document.getElementById("edit-phone").value.trim(),
                thematiquedintervention: document.getElementById("edit-topic").value.trim(),
                avatar: document.getElementById("edit-avatar").value.trim()
            };

            fetch("https://6a3676af766b831960f941b8.mockapi.io/participants/" + idParticipant, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(donneesModifiees)
            })
                .then(function (res) {
                    if (!res.ok) {
                        throw new Error("Erreur de mise à jour");
                    }
                    return res.json();
                })
                .then(function () {
                    alert("Le profil a été mis à jour avec succès !");
                    window.location.href = "index.html"; // Retour au grand tableau
                })
                .catch(function (err) {
                    console.error("Erreur :", err);
                    alert("Impossible de modifier le membre.");
                });
        });
    }
}
