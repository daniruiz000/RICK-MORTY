const printHome = () => {
    mainContainer.innerHTML = `

        <section class="section-home">
            <h3 class="section-home__title">
            Discover all the characters, places and episodes of the interspatial adventures of this crazy grandfather and his grandson </h3>
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