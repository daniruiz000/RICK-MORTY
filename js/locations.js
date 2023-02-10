let urllocationsNext;
let locationsCards;
let locationsData;

const goLocationsBack = ()=>{

    printPage('HOME');
}

const printLocations = () => {
 
    getLocations().then(response =>{

        locationsData = response;
        locationsCards = formatLocationsCard(locationsData);
        printLocationsContent(locationsCards,response);
    });
}

const printLocationsContent = (locations,response)=>{
    
    mainContainer.innerHTML = `

    <section class = "section">
        <h3 class = "section__title">LOCATION FINDER</h3>
        <div class = "section__finder">
            <a hrf= "#" class = "section__icon" ><i class= "fa-solid fa-magnifying-glass"></i></a>
            <input class = "section__input" type = "text" placeholder = "Find locations..."></input>
        </div>
        <section class = "section__container">
            ${locations}
        </section>
        <button class = "section__more">+MORE</button>
    </section>
    `;

    let buttonMore = document.querySelector('.section__more');
    buttonMore.addEventListener('click', getMoreLocations);

    let buttonMoreDetails = [...document.getElementsByClassName('card__details')];
    buttonMoreDetails.forEach((element, i) => {
        element.addEventListener('click', ()=> moreDetailsLocations(response[i]));
    }); 

    const buttonBack = document.querySelector('.header__icon');
    buttonBack.addEventListener('click', goLocationsBack);

    let containerFind = document.querySelector('.section__input')
    const buttonFind = document.querySelector('.section__icon');
    buttonFind.addEventListener('click', ()=> findLocations(containerFind.value));
    console.log(containerFind)
    console.log(containerFind.value)
    console.log(buttonFind)
}

const getMoreLocations = ()=>{

    getLocations().then(response=>{

        response.forEach(element => {
            locationsData.push(element);
        });
        locationsCards = formatLocationsCard(locationsData);

        printLocationsContent(locationsCards, locationsData);
    });

}

const formatLocationsCard = (locations)=>{

    let templateLocations = locations.map(locations =>{
        
        return `
    <div class = 'card card--locations'>
        <div class= 'card__container card__container--locations'>
            <div class = 'card__header card__header--locations'>
                <h4 class='card__name card__name--locations'>${locations.name}</h4>
            </div>
            <div class = 'card__body card__body--locations'> 
                <div class ='card__data-container card__data-container--locations'>
                    <div class = 'card__type--locations'>
                        <h3 class='card__text card__text--locations'>TYPE</h3>
                        <h4 class='card__data card__data--locations'>${locations.type}</h4>
                    </div>
                    <div class = 'card__dimension--locations'>
                        <h3 class='card__text card__text--locations'>DIMENSION</h3>
                        <h4 class='card__data card__data--locations'>${locations.dimension}</h4>
                    </div>
                </div>  
            </div>
        </div>
        <button class='card__details'>+ MORE DETAILS</button>
    </div>  
        `;

    }).join('');

    return templateLocations;
}

const moreDetailsLocations = (location)=>{

    printPage('LOCATIONS', location.url)
}

const getLocations =  async() => {

    let urlCalled;  
                                       
    if ( urllocationsNext === null || urllocationsNext === undefined){  

        urlCalled = URL_BASE + "/location";

    } else {

        urlCalled = urllocationsNext;
    }

    let response = await fetch(urlCalled);                        
    let data = await response.json(); 

    urllocationsNext = data.info.next;                           
    dataMapped = mapDataLocations(data.results); 

    return dataMapped; 
}

const mapDataLocations = (data)=>{

    let dataMapped = data.map(location =>{

        let object = {

            name:location.name,
            type:location.type,
            dimension:location.dimension,
            url:location.url
        }
        
        return object;
    });

    return dataMapped;
}

const findLocations = (name)=>{

    urlNext = `${URL_BASE}/location/?name=${name}`;
    printLocations()

}


