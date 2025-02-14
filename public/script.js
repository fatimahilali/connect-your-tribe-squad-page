/**
 * @file script.js
 * @bron stackoverflow.com , restack.io/ ,
 * @author Fatima Elhilali
 * @description Dit script haalt gebruikersgegevens op uit een API, 
 * vult een dropdown met favoriete boekgenres en toont gefilterde gebruikers in een modal.
 */



/**
 * Basis-URL van de API, inclusief filters en sortering
 * - We halen gebruikers op uit de Directus API
 * - We filteren op mensen uit "FDND Jaar 1"
 * - We selecteren alleen mensen uit cohort "2425"
 * - We sorteren de resultaten op naam
 * @constant {string}
 */
  const API_URL = "https://fdnd.directus.app/items/person/?fields=*,squads.squad_id.name,squads.squad_id.cohort&filter=" +
    encodeURIComponent(JSON.stringify({
        _and: [
            { squads: { squad_id: { tribe: { name: "FDND Jaar 1" } } } },
            { squads: { squad_id: { cohort: "2425" } } }
        ]
    })) + "&sort=name";

/**
 * Haalt data op uit de API en retourneert een lijst met gebruikers.
 * 
 * @async
 * @function
 * @returns {Promise<Array>} Een lijst met gebruikers of een lege array bij een fout.
 */
async function fetchData() {
    try {
        // Verzoek naar de API sturen
        const response = await fetch(API_URL);

        // Controleer of de API een geldige response geeft
        if (!response.ok) throw new Error("Kan data niet ophalen");

        // De API-response omzetten naar JSON
        const jsonData = await response.json();

        // Retourneer de lijst met gebruikers, of een lege array als er geen data is
        return jsonData.data || [];
    } catch (error) {
        // Log de fout in de console als het ophalen mislukt
        console.error("Fout bij ophalen data:", error);
        return [];
    }
}

/**
 * Vult de genre-filter dropdown met unieke genres uit de API.
 * - Haalt eerst de gebruikers op via `fetchData()`
 * - Filtert unieke genres uit de gebruikersdata
 * - Voegt deze toe als opties in de dropdown met id `"genreFilter"`
 * 
 * @async
 * @function
 * @returns {Promise<void>}
 */
  async function populateFilter() {
    // Haal de gebruikers op uit de API
    const data = await fetchData();

    // Haal alle favoriete boekgenres op en verwijder dubbele waarden
    const genres = [...new Set(data.map(user => user.fav_book_genre).filter(Boolean))];

    // Zoek het select-element in de HTML
    const select = document.getElementById("genreFilter");
    if (!select) return;

    // Maak een document fragment voor betere prestaties
    const fragment = document.createDocumentFragment();

    // Voeg de standaardoptie "Author" toe aan de dropdown
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    defaultOption.textContent = "Select an Author";
    fragment.appendChild(defaultOption);

    // Voeg alle unieke genres toe als opties in de dropdown
    genres.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        fragment.appendChild(option);
    });

    // Verwijder oude opties en voeg de nieuwe toe
    select.innerHTML = "";
    select.appendChild(fragment);
}

/**
 * Toont een lijst met gebruikers in een modal.
 * - Leegt eerst de bestaande lijst in de modal.
 * - Voegt dynamisch een lijst van gebruikers met naam en profielfoto toe.
 * - Toont de modal en voegt een blur-effect toe aan de achtergrond.
 * 
 * @function
 * @param {Array} users - Lijst met gefilterde gebruikers.
 */
function displayUsersInModal(users) {
    // Haal de modal, de lijst en de body op
    const modal = document.getElementById("userModal");
    const modalUserList = document.getElementById("modalUserList");
    const body = document.body;

    // Controleer of de modal en de lijst bestaan
    if (!modal || !modalUserList) return;

    // Verwijder oude gebruikers uit de modal
    modalUserList.innerHTML = "";

    // Gebruik een document fragment voor betere prestaties
    const fragment = document.createDocumentFragment();

    // Loop door alle gebruikers en voeg ze toe aan de lijst
    users.forEach(user => {
        const div = document.createElement("div");
        div.classList.add("user");

        // Maak een sterk tekst-element met de naam van de gebruiker
        const strong = document.createElement("strong");
        strong.textContent = user.name;

        // Voeg een profielfoto toe, gebruik een standaardafbeelding als er geen foto is
        const img = document.createElement("img");
        img.src = user.avatar || "https://via.placeholder.com/50";
        img.alt = `Foto van ${user.name}`;
        img.width = 50;

        // Voeg de naam en de afbeelding toe aan de div
        div.appendChild(strong);
        div.appendChild(document.createElement("br"));
        div.appendChild(img);

        // Voeg de gebruiker toe aan het fragment
        fragment.appendChild(div);
    });

    // Voeg alle gebruikers in één keer toe aan de modal
    modalUserList.appendChild(fragment);

    // Maak de modal zichtbaar en voeg een blur-effect toe aan de achtergrond
    modal.style.display = "flex";
    body.classList.add("blur");
}

/**
 * Sluit de modal en reset de dropdown naar "Author".
 */
function closeModal() {
    // Haal de modal, de body en de dropdown op
    const modal = document.getElementById("userModal");
    const body = document.body;
    const genreFilter = document.getElementById("genreFilter");

    // Controleer of de modal en dropdown bestaan
    if (!modal || !genreFilter) return;

    // Verberg de modal en verwijder de blur
    modal.style.display = "none";
    body.classList.remove("blur");

    // Reset de dropdown alleen als de optie "Author" bestaat
    if (genreFilter.querySelector('option[value=""]')) {
        genreFilter.value = "";
    }
}

/**
 * Voegt event listeners toe zodra de pagina is geladen.
 * - Luistert naar wijzigingen in de genre dropdown en filtert de gebruikers
 * - Voegt een klik-event toe aan de sluitknop van de modal
 * - Roept `populateFilter()` aan om de dropdown te vullen
 * 
 * @event DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", () => {
    // Zoek de genre dropdown en de sluitknop
    const genreFilter = document.getElementById("genreFilter");
    const closeButton = document.querySelector(".close");

    // Voeg een event listener toe aan de dropdown om gebruikers te filteren op genre
    if (genreFilter) {
        genreFilter.addEventListener("change", async function () {
            // Haal het geselecteerde genre op
            const selectedGenre = this.value;

            // Haal de gebruikersdata op en filter op het geselecteerde genre
            const data = await fetchData();
            const filteredData = data.filter(user => user.fav_book_genre === selectedGenre);

            // Toon de gefilterde gebruikers in de modal
            displayUsersInModal(filteredData);
        });
    }

    // Voeg een event listener toe aan de sluitknop van de modal
    if (closeButton) {
        closeButton.addEventListener("click", closeModal);
    }

    // Vul de genre dropdown bij het laden van de pagina
    populateFilter();
});
