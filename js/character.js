
const goCharacterBack = ()=>{
    
    urlNext = null;
    printPage('CHARACTERS',urlNext);
}


const printCharacter = (url)=>{  

    getCharacter(url).then(response =>{

        let personajeDetail = formatCharacterDetail(response);
        mainContainer.innerHTML = `
            <section class="section">
                <h3 class="section__title">CHARACTER DETAIL</h3>
                <section class="section__container">
                    ${personajeDetail}
                </section>
            </section>

        `;

        let buttonLocation = document.querySelector('.detail__data--character-location');
        buttonLocation.addEventListener('click', ()=> moreDetailsLocation(response.location.url));
        
        let buttonEpisodes = [...document.getElementsByClassName('section__episode')];
        buttonEpisodes.forEach((element, i) => {
            element.addEventListener('click', ()=> moreDetailsEpisodes(response.episodes[i]));
        }); 
        
    const buttonBack = document.querySelector('.header__icon');
    buttonBack.addEventListener('click', goCharacterBack);
    })
}

const moreDetailsLocation = (url)=>{

    printPage('LOCATIONS', url)
}

const moreDetailsEpisodes = (url)=>{

    printPage('SEASONS', url)
}

const getCharacter = async(url)=>{

    let response = await fetch(url);
    let data = await response.json();
    data = formatCharacter(data);

    return data;
}

const getEpisodesNumbers = (array)=>{

    let arrayNumberEpisodes = [] 
    array.forEach(element => {

        let numberEpisode = element.replaceAll('https://rickandmortyapi.com/api/episode/','');
        arrayNumberEpisodes.push(numberEpisode);
    });

    return arrayNumberEpisodes;
}

const formatCharacter = (character)=>{

    let episodesArray = [...character.episode];
    let episodesNumbers = getEpisodesNumbers(character.episode);

    let dataFormated = {

        name:character.name.toUpperCase(),
        image:character.image,
        status:character.status,
        species:character.species,
        origin:{ name: character.origin.name, url: character.origin.url},
        location:{ name: character.location.name, url: character.location.url},
        episodesNumbers: episodesNumbers,
        episodes:episodesArray,
    }

    return dataFormated;
}

const createUrlEpisode= (number)=>{

    let urlEpisode = `https://rickandmortyapi.com/api/episode/${number}`;

    return urlEpisode;
}

const getUrlEpisodes = (array)=>{

    let arrayUrlEpisodes = [];
    array.map(element => {

        urlEpisode = createUrlEpisode(element);
        arrayUrlEpisodes.push(urlEpisode);
    });

    return arrayUrlEpisodes;
}

const formatEpisodesTemplate=(array)=>{

    let episodesTemplate = array.map(element=>{

        return `
            <a class='section__episode section__episode--character'>${element}</a>
        `

    }).join('');

    return episodesTemplate;
}

const formatAliveTemplate = (status)=>{

    if(status === 'Alive'){

        return `detail__status--${status}`

    }else{

        return ''
    }
}

const formatDeadTemplate = (status)=>{

    if(status === 'Dead'){

        return `detail__status--${status}`

    }else{

        return ''
    }
}

const formatUnknownTemplate = (status)=>{

    if (status === 'unknown'){

        return `detail__status--${status}`

    }else{

        return ''
    }
   
}

const formatCharacterDetail = (character) => {

    let episodesTemplate = formatEpisodesTemplate(character.episodesNumbers);   
    let statusAlive = formatAliveTemplate(character.status);
    let statusDead = formatDeadTemplate(character.status);
    let statusUnknown = formatUnknownTemplate(character.status);

    return `
    <div class = 'detail'>
        <div class = 'detail__header'>
            <img class='detail__img' src='${character.image}'>
            <h4 class='detail__name'>${character.name}</h4>
        </div>
        <div class='detail__body'>
            <div class='detail__container-status'>
                <h3 class='detail__text'>STATUS</h3>
                <div class='detail__container-options'>
                    <h4 class='detail__status ${statusAlive} '>ALIVE</h4>
                    <h4 class='detail__status ${statusDead}'>DEAD</h4>
                    <h4 class='detail__status ${statusUnknown}'>UKNOWN</h4>
                </div>
            </div>
            <div class='detail__container-data'>
                <div class='detail__body-dates'>
                    <h3 class='detail__text'>SPECIES</h3>
                    <h4 class='detail__data'>${character.species}</h4>
                </div>
                <div class='detail__body-dates'>
                    <h3 class='detail__text'>ORIGIN</h3>
                    <h4 class='detail__data detail__data'>${character.origin.name}</h4>
                </div>
                <div class='detail__body-dates'>
                    <h3 class='detail__text'>LOCATION</h3>
                    <h4 class='detail__data detail__data--character-location'>${character.location.name}</h4>
                </div>     
            </div>
            <div class='detail__container-episodes'>
                <h3 class='detail__text'>EPISODE</h3>
                <div class='detail__episode'>${episodesTemplate}<div>
            </div>
        </div>
        
    </div>  
    `
    ;

}
