/*
====================================
INITIALISATION DU MENU
====================================
*/
function initMobileNav() {

    const liens = document.querySelectorAll("#main-nav a");

    if (liens.length === 0) {
        return;
    }

    /*
    GESTION DU CLIC ÉTUDIANT
    */
    for (let i = 0; i < liens.length; i++) {
        liens[i].addEventListener("click", function (evenement) {
            
            // 1. On récupère la destination du lien (ex: "#form-section" ou "index.html")
            const cible = this.getAttribute("href");

            // 2. Si le lien pointe vers une section de la page (commence par #)
            if (cible.indexOf("#") === 0) {
                
                // On empêche le navigateur de sauter brutalement ou de recharger
                evenement.preventDefault();

                // On cherche la section correspondante dans la page
                const section = document.querySelector(cible);
                if (section) {
                    // On fait descendre la page proprement de manière fluide
                    section.scrollIntoView({ behavior: "smooth" });
                }
            }

            // 3. Mise à jour visuelle des classes actives
            for (let j = 0; j < liens.length; j++) {
                liens[j].classList.remove("active");
            }
            this.classList.add("active");
        });
    }
}

// Lancement automatique du script
initMobileNav();
