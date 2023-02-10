
const printEpisode = (url)=>{  
    
    getEpisode(url).then(response =>{

        let episodeDetail = formatEpisodeDetail(response);

        mainContainer.innerHTML = `
            <section class="section">
                <h3 class="section__title">EPISODE DETAIL</h3>
                <section class="section__container">
                    ${episodeDetail}
                </section>
            </section>

        `;

        let buttonResidents = [...document.getElementsByClassName('section__resident')];
        buttonResidents.forEach((element, i) => {
      
            element.addEventListener('click', ()=> moreDetailsCharacters(response.characters[i]));
        }); 

        const buttonAtras = document.querySelector('.header__icon');
        buttonAtras.addEventListener('click', goBack);
    })
}

const moreDetailsCharacters = (url)=>{

    printPage('CHARACTERS', url)
}

const getEpisode = async(url)=>{

    let response = await fetch(url);
    let data = await response.json();
    data = formatEpisode(data);

    return data;
}

const getNumberCharacters = (array)=>{

    let arrayNumberResidents = [] 
    array.forEach(element => {

        let numberResident = element.replaceAll('https://rickandmortyapi.com/api/character/','');
        arrayNumberResidents.push(numberResident);
    });

    return arrayNumberResidents;
}   

const formatEpisode = (episode)=>{

    let arrayNumberResidents = getNumberCharacters (episode.characters);
    let dataFormated = {

        characters:episode.characters,
        name:episode.name.toUpperCase(),
        numberCharacters:arrayNumberResidents,
        episode:episode.episode,
        date:episode.air_date
    }
     
    return dataFormated;
}
   
const createUrlImgCharacter = (number)=>{

    let urlImg = `https://rickandmortyapi.com/api/character/avatar/${number}.jpeg`;
   
    return urlImg;
}

const  getUrlCharacters = (array)=>{

    let arrayUrlImgResidents = [];
    array.forEach(element => {

        urlImgResident = createUrlImgCharacter(element);
        arrayUrlImgResidents.push(urlImgResident);
    });

    return arrayUrlImgResidents;
}

const formatCharacters = (array)=>{

    let charactersTemplate = array.map(element=>{

        return `
        <img class='section__resident' src='${element}'>
        `;

    }).join('');

    return charactersTemplate;
}

const formatEpisodeDetail = (episode) => {

    let arrayUrlImgCharacters = getUrlCharacters(episode.numberCharacters); 
    let charactersTemplate = formatCharacters(arrayUrlImgCharacters); 

    return `
    <div class = 'detail detail--episode'>
        <div class = 'detail__header detail__header--episode'>
            <h4 class='detail__name detail__name--episode'>${episode.name}</h4>
        </div>
        <div class='detail__body detail__body--episode'>
            <div class='detail__body-data--episode'>
                <div class='detail__body-episode'>
                    <h3 class='detail__text detail__text--episode'>EPISODE</h3>
                    <h4 class='detail__data detail__data--episode'>${episode.episode}</h4></div>
                <div class='detail__body-dates'>
                    <h3 class='detail__text detail__text--episode'>DATE</h3>
                    <h4 class='detail__data detail__data--episode'>${episode.date}</h4>
                </div>  
            </div>
            <div class='detail__body-residents--espisode'>
                <h3 class='detail__text detail__text--episode'>CHARACTERS</h3>
                <div class='detail__container detail__data--residentes'>${charactersTemplate}</div>
            </div>
        </div>
    </div>  
`;
}