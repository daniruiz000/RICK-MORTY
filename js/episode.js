
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
        buttonAtras.addEventListener('click', goSeasonAtras);
    })
}

const goSeasonAtras = ()=>{

    printPage('SEASONS');
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
    <div class = 'detail'>
        <div class = 'detail__header'>
            <h4 class='detail__name'>${episode.name}</h4>
        </div>
        <div class='detail__body'>
            <h3 class='detail__text'>EPISODE</h3>
            <h4 class='detail__data'>${episode.episode}</h4>
            <h3 class='detail__text'>DATE</h3>
            <h4 class='detail__data'>${episode.date}</h4>
            <h3 class='detail__text '>CHARACTERS</h3>
            <div class='detail__data detail__data--residentes'>${charactersTemplate}</div>
        </div>
    </div>  
`;
}