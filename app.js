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
