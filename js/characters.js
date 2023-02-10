let urlNext;
let charactersData;
let charactersCards;

const goCharactersBack = ()=>{
    urlNext = null;
    printPage('HOME',urlNext);
}

const printCharacters = () => {

    getCharacters().then(response =>{

        charactersData = response;
        charactersCards = formatCharactersCard(response);
        printCharactersContent(charactersCards,response);
    });
}


const printCharactersContent = (characters,response)=>{
    
    mainContainer.innerHTML = `

    <section class = "section">
        <h3 class = "section__title">CHARACTER FINDER</h3>
        <div class = "section__finder">
            <a hrf= "#" class = "section__icon"><i class = "fa-solid fa-magnifying-glass"></i></a>
            <input class = "section__input" type = "text" placeholder = "Busca el personaje..."></input>
        </div>
        <section class = "section__container">
            ${characters}
        </section>
        <button class = "section__more">+MORE</button>
    </section>
    `;

    let buttonMore = document.querySelector('.section__more');
    buttonMore.addEventListener('click', getMoreCharacters);
    let buttonMoreDetails = [...document.getElementsByClassName('card__details')];
    buttonMoreDetails.forEach((element, i) => {
        element.addEventListener('click', ()=> moreDetailsCharacter(response[i]));
    }); 

    const buttonBack = document.querySelector('.header__icon');
    buttonBack.addEventListener('click', goCharactersBack);

    let containerFind = document.querySelector('.section__input')
    const buttonFind = document.querySelector('.section__icon');
    buttonFind.addEventListener('click', ()=> findCharacters(containerFind.value));

    
    console.log(containerFind.value)
}

const findCharacters = (name)=>{
    console.log(name)
    urlNext = `${URL_BASE}/character/?name=${name}`;
    printCharacters()
    console.log(name)
}

const getMoreCharacters = ()=>{

    getCharacters().then(response=>{

        response.forEach(element => {
            charactersData.push(element);
        });
        personajesCards = formatCharactersCard(charactersData);

        printCharactersContent(personajesCards, charactersData);
    });

}

const formatCharactersCard = (characters)=>{
    let templateCharacters = characters.map(character =>{
        
        return `
    <div class = 'card'>
        <div class= 'card__container'>
            <div class = 'card__header'>
                <h4 class='card__name'>${character.name}</h4>
                <h4 class='card__status card__status--${character.status}'>${character.status}</h4>  
            </div>
            <div class = 'card__body'>
                <img class='card__img' src='${character.image}'>    
                <div class ='card__data-container'>
                    <h3 class='card__text'>SPECIES</h3>
                    <h4 class='card__data'>${character.species}</h4>
                    <h3 class='card__text'>>GENDER</h3>
                    <h4 class='card__data'>${character.gender}</h4>
                    <h3 class='card__text'>ORIGIN</h3>
                    <h4 class='card__data'>${character.origin}</h4>
                    <h3 class='card__text'>LOCATION</h3>
                    <h4 class='card__data'>${character.location}</h4>
                </div>  
            </div>
        </div>
        <button class='card__details'>+MORE DETAILS</button>
    </div>  
        `;

    }).join('');

    return templateCharacters;
}


const moreDetailsCharacter = (character)=>{
    urlNext = null;
    printPage('CHARACTERS', character.url)
}

const getCharacters =  async() => {

    let url;        

    if ( urlNext === null || urlNext === undefined){            
        url = URL_BASE + "/character";
    } else {
        url = urlNext;
    }

    let response = await fetch(url);                        
    let data = await response.json();                      
    urlNext = data.info.next;                               
    dataMapped = mapDataCharacters(data.results);         
    return dataMapped ; 
                                               
}

const mapDataCharacters = (data)=>{
    let dataMapped = data.map(character =>{
        let object = {
            name:character.name,
            image:character.image,
            status:character.status,
            species:character.species,
            gender:character.gender,
            origin:character.origin.name,
            location:character.location.name,
            url:character.url
        }
        
        return object;
    });
    return dataMapped;
     
}




