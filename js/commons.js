
const getData = async(section)=>{

    switch (section) {

        case 'CHARACTERS':
            
            if ( urlCharactersNext === null || urlCharactersNext === undefined){  

                urlCalled = URL_BASE + "/character";
        
            } else {
        
                urlCalled = urlCharactersNext;
            }
        
            break;

        case 'LOCATIONS':
            
            if ( urlLocationsNext === null || urlLocationsNext === undefined){  
    
                urlCalled = URL_BASE + "/location";
            
            } else {
            
                urlCalled = urlLocationsNext;
            }
            
            break;
    }

    let response = await fetch(urlCalled);                        
    let data = await response.json(); 

    switch (section) {

        case 'CHARACTERS':

            urlCharactersNext = data.info.next;

            break;
            
        case 'LOCATIONS':

            urlLocationsNext = data.info.next;

            break;
    }
    
    dataObtained = data.results;
    results = mapData(section, dataObtained); 

    return results; 
}

const mapData= (section, data)=>{

    let dataMapped = data.map(element =>{
        
        let object;

        switch (section) {

            case 'CHARACTERS':

                object = {

                    name:element.name,
                    image:element.image,
                    status:element.status,
                    species:element.species,
                    gender:element.gender,
                    origin:element.origin.name,
                    location:element.location.name,
                    url:element.url
                }
                break;

            case 'LOCATIONS':

                object = {

                    name:element.name,
                    type:element.type,
                    dimension:element.dimension,
                    url:element.url
                }
                break;
        }
        
        return object;
    });
    
    return dataMapped;
}

const formatCard = (section, data)=>{

    let templateCards = data.map(element =>{

        switch (section) {

            case 'CHARACTERS':

                return `

                <div class = 'card'>
                    <div class= 'card__container'>
                        <div class = 'card__header'>
                            <h4 class='card__name'>${element.name}</h4>
                            <h4 class='card__status card__status--${element.status}'>${element.status}</h4>  
                        </div>
                        <div class = 'card__body'>
                            <img class='card__img' src='${element.image}'>    
                            <div class ='card__data-container'>
                                <h3 class='card__text'>SPECIES</h3>
                                <h4 class='card__data'>${element.species}</h4>
                                <h3 class='card__text'>GENDER</h3>
                                <h4 class='card__data'>${element.gender}</h4>
                                <h3 class='card__text'>ORIGIN</h3>
                                <h4 class='card__data'>${element.origin}</h4>
                                <h3 class='card__text'>LOCATION</h3>
                                <h4 class='card__data'>${element.location}</h4>
                            </div>  
                        </div>
                    </div>
                    <button class='card__details'>+MORE DETAILS</button>
                </div>  
                    `;
            
                break;
            

            case 'LOCATIONS':

                return `

                <div class = 'card card--locations'>
                    <div class= 'card__container card__container--locations'>
                        <div class = 'card__header card__header--locations'>
                            <h4 class='card__name card__name--locations'>${element.name}</h4>
                        </div>
                        <div class = 'card__body card__body--locations'> 
                            <div class ='card__data-container card__data-container--locations'>
                                <div class = 'card__type--locations'>
                                    <h3 class='card__text card__text--locations'>TYPE</h3>
                                    <h4 class='card__data card__data--locations'>${element.type}</h4>
                                </div>
                                <div class = 'card__dimension--locations'>
                                    <h3 class='card__text card__text--locations'>DIMENSION</h3>
                                    <h4 class='card__data card__data--locations'>${element.dimension}</h4>
                                </div>
                            </div>  
                        </div>
                    </div>
                    <button class='card__details'>+ MORE DETAILS</button>
                </div> 

                `;
                
                break;
        }
    });
    
    templateCards.join('');

    return templateCards;
}

const printContent = (section, content, response)=>{

    switch (section) {

        case 'CHARACTERS':

            mainContainer.innerHTML = `

            <section class = "section">
                <h3 class = "section__title">CHARACTER FINDER</h3>
                <div class = "section__finder">
                    <a hrf= "#" class = "section__icon"><i class = "fa-solid fa-magnifying-glass"></i></a>
                    <input class = "section__input" type = "text" placeholder = "Find a ..."></input>
                </div>
                <section class = "section__container">
                    ${content}
                </section>
                <button class = "section__more">+MORE</button>
            </section>
            `;

            break;

        case 'LOCATIONS':

            mainContainer.innerHTML = `

            <section class = "section">
                <h3 class = "section__title">LOCATION FINDER</h3>
                <div class = "section__finder">
                    <a hrf= "#" class = "section__icon"><i class = "fa-solid fa-magnifying-glass"></i></a>
                    <input class = "section__input" type = "text" placeholder = "Busca el personaje..."></input>
                </div>
                <section class = "section__container">
                    ${content}
                </section>
                <button class = "section__more">+MORE</button>
            </section>
            `;

            break;
    }

    let buttonMore = document.querySelector('.section__more');
    buttonMore.addEventListener('click', ()=> getMore(section));

    let buttonMoreDetails = [...document.getElementsByClassName('card__details')];
    buttonMoreDetails.forEach((element, i) => {
        element.addEventListener('click', ()=> moreDetailsElement(section, response[i]));
    }); 

    let buttonBack = document.querySelector('.header__icon');
    buttonBack.addEventListener('click', goBack);

    let containerFind = document.querySelector('.section__input')
    containerFind.addEventListener("keyup", function(event) {

        if (event.keyCode === 13) {

            findElement(section, containerFind.value);
        }
    });

    let buttonFind = document.querySelector('.section__icon');
    buttonFind.addEventListener('click', ()=> findElement(section, containerFind.value));
}

const getMore = (section)=>{
    
    switch (section) {

        case 'CHARACTERS':

            getData('CHARACTERS').then(response=>{
                
                response.forEach(element => {
        
                    charactersData.push(element);
                });
        
                charactersCards = formatCard(section,charactersData);
                printContent(section, charactersCards, charactersData);
            });
            
            break;
    
        case 'LOCATIONS':

            getData('LOCATIONS').then(response=>{

                response.forEach(element => {
        
                    locationsData.push(element);
                });
        
                locationsCards = formatCard(section,locationsData);
                printContent(section, locationsCards, locationsData);
            });
            
            break;
    }
}

const findElement = (section, name)=>{

    switch (section) {

        case 'CHARACTERS':

            urlCharactersNext = `${URL_BASE}/character/?name=${name}`;

            printCharacters()

            break;
    
        case 'LOCATIONS':

            urlLocationsNext = `${URL_BASE}/location/?name=${name}`;

            printLocations();

            break;
    }
}

const moreDetailsElement = (section, element)=>{
    
    switch (section) {

        case 'CHARACTERS':

            printPage('CHARACTERS', element.url)

            break;

        case 'LOCATIONS':

            printPage('LOCATIONS', element.url)

            break;
    }
}