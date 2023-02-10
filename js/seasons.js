
const printSeasons = () => {

    getEpisodes().then(response =>{

        let arraySeasons = getSeasons(response);
        let seasonsCards = formatSeasonsCard(arraySeasons);
       

        mainContainer.innerHTML = `

            <section class="section">
                <h3 class="section__title">EPISODES</h3>
                <section class="section__container">
                    ${seasonsCards}
                </section>
            </section>
        `;
        

        let buttonEpisode = [...document.getElementsByClassName('section__episode')];
        buttonEpisode.forEach((element, i) => {
   
            element.addEventListener('click', ()=> moreDetaileEpisode(element));
        }); 
      

    });

    const buttonAtras = document.querySelector('.header__icon');
    buttonAtras.addEventListener('click', goSeasonsAtras);
}

const goSeasonsAtras = ()=>{

    printPage('HOME');
}

const moreDetaileEpisode = (episode)=>{

    printPage('SEASONS', `${URL_BASE}/episode/${episode.id}` )
}



const getEpisodes =  async() => {

    let page = 1;
    let arrayEpisodes = [];

    let nextUrl = await fetch(`${URL_BASE}/episode?page=${page}`);
    let data = await nextUrl.json();

    while (data.info.next) {

        arrayEpisodes = arrayEpisodes.concat(data.results);
        page++;
        nextUrl = await fetch(`${URL_BASE}/episode?page=${page}`);
        data = await nextUrl.json();
    } 

    arrayEpisodes =  mapDataEpisodes(arrayEpisodes.concat(data.results));

    return arrayEpisodes;
    
}

const getSeasonFromEpisodes = (episodeName)=>{

    seasonExtracted = episodeName.slice(2,3);

    return seasonExtracted;
}

const mapDataEpisodes = (data)=>{

    let dataMapped = data.map(episode =>{

        seasonExtracted = getSeasonFromEpisodes(episode.episode)

        let object = {

            id:episode.id,
            season: seasonExtracted,
            name:episode.name,
            air_date:episode.air_date,
            characters:episode.characters,
            url:episode.url,
            created:episode.created
        }
        
        return object;
    });

    return dataMapped;
     
}



const getSeasons = (episodes)=>{

    const seasons = [];

    episodes.forEach(episode => {

        let airDateEpisode = episode.air_date;

        if (!seasons[episode.season]) {

            seasons[episode.season] = {

                name: episode.season,
                earliestAirDate: airDateEpisode,
                latestAirDate: airDateEpisode,
                episodes: [{ name: episode.name, url: episode.url, id: episode.id }]
            };

        } else {

            const season = seasons[episode.season];
            season.episodes.push({ name: episode.name, url: episode.url, id: episode.id});

            if(Date.parse(airDateEpisode) < Date.parse(season.earliestAirDate)){
                season.earliestAirDate = airDateEpisode;
            }

            if(Date.parse(airDateEpisode) > Date.parse(season.latestAirDate)){
                season.latestAirDate = airDateEpisode;
            }
        }
    });

    return seasons;
  
}



const formatEpisodesCard = (array)=>{

    let episodesTemplate = array.map(element=>{

        return `
            <a id= '${element.id}' class='section__episode section__episode--seasons'>${element.name}</a>
        `

    }).join('');

    return episodesTemplate;
}

const formatSeasonsCard = (array)=>{

    let templateSeasons = array.map((season) =>{
    
        let episodesCards = formatEpisodesCard(season.episodes);

        return `
        <div class = 'card'>
            <div class= 'card__container'>
                <div class = 'card__header'>
                    <h4 class='card__name'>SEASON ${season.name}</h4>
                </div>
                <div class = 'card__body'> 
                    <div class ='card__data-container card__data-container--episodes'>
                        <h3 class='card__text'>DATE</h3>
                        <h4 class='card__data card__data--episodes'>${season.earliestAirDate} - ${season.latestAirDate} </h4>
                        <h3 class='card__text'>EPISODES</h3>
                        <div class='card__data card__data--episodes'>${episodesCards}</div>
                    </div>  
                </div>
            </div>
        </div>  
        `;

    }).join('');

    return templateSeasons;
}

