const printHome = () => {
    mainContainer.innerHTML = `

        <section class="section-home">
            <h3 class="section-home__title">Descubre todos los personajes, lugares y episodios de las aventuras interespaciales de este abuelo chiflado y su nieto </h3>
            <nav class="nav">
                <a href="#" class="nav__link">CHARACTERS</a>
                <a href="#" class="nav__link">SEASONS</a>
                <a href="#" class="nav__link">LOCATIONS</a>
            </nav>
        </section>
    `;

    addEventsToHomeLinks();
}


const addEventsToHomeLinks = () => {
    const homeLinks =[...document.getElementsByClassName('nav__link')];
    homeLinks.forEach( element => {
        element.addEventListener('click', () => {
            printPage(element.textContent);
        });
    });
}