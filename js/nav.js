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
    GESTION DU CLIC
    */
    for (let i = 0; i < liens.length; i++) {
        liens[i].addEventListener("click", function () {

            // Enlever la classe active sur tous les liens
            for (let j = 0; j < liens.length; j++) {
                liens[j].classList.remove("active");
            }

            // Ajouter la classe active sur le lien cliqué
            this.classList.add("active");
        });
    }
}

// On lance la fonction immédiatement pour qu'elle soit active
initMobileNav();
