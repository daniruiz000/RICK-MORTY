
const goLocationBack = ()=>{

    printPage('LOCATIONS');
}

const printLocation = (url)=>{  

    getLocation(url).then(response =>{

        let locationDetail = formatLocationDetail(response);
        mainContainer.innerHTML = `
            <section class="section">
                <h3 class="section__title">LOCATION DETAIL</h3>
                <section class="section__container">
                    ${locationDetail}
                </section>
            </section>

        `;
        let buttonResidents = [...document.getElementsByClassName('section__resident')];
        buttonResidents.forEach((element, i) => {
            element.addEventListener('click', ()=> moreDetailsResidents(response.urlResidents[i]));
        }); 
        
    const buttonBack = document.querySelector('.header__icon');
    buttonBack.addEventListener('click', goLocationBack);
    })
}

const moreDetailsResidents = (resident)=>{

    printPage('CHARACTERS', resident)
}

const getLocation = async(url)=>{
    
    let response = await fetch(url);
    let data = await response.json();
    data = formatLocation(data);
    return data;
}

const getNumberResidents = (array)=>{

    let arrayNumberResidents = [] 
    array.forEach(element => {

        let numberResident = element.replaceAll('https://rickandmortyapi.com/api/character/','');
        arrayNumberResidents.push(numberResident);
    });

    return arrayNumberResidents;
}   


const formatLocation = (location)=>{

    let arrayNumberResidents = getNumberResidents(location.residents);
    let dataFormated = {
        id:location.id,
        name:location.name.toUpperCase(),
        type:location.type,
        dimension:location.dimension,
        residents:arrayNumberResidents,
        urlResidents:location.residents,
        urlDetail:location.url,
        created:location.created
    }
 
    return dataFormated;
}

const createUrlImgResident = (number)=>{

    let urlImg = `https://rickandmortyapi.com/api/character/avatar/${number}.jpeg`;

    return urlImg;
}

const  getUrlResidents = (array)=>{
    let arrayUrlImgResidents = [];
    array.forEach(element => {

        urlImgResident = createUrlImgResident(element);
        arrayUrlImgResidents.push(urlImgResident);
    });

    return arrayUrlImgResidents;
}

const formatResidents = (array)=>{

    let residentsTemplate = array.map(element=>{

        return `
            <img class='section__resident' src='${element}'>
        `
    }).join('');

    return residentsTemplate;
}

const formatLocationDetail = (location) => {
    let arrayUrlImgResidents = getUrlResidents(location.residents); 
    let residentsTemplate = formatResidents(arrayUrlImgResidents); 

    return `
    <div class = 'detail detail--location'>
        <div class = 'detail__header detail__header--location'>
            <h4 class='detail__name detail__name--location'>${location.name}</h4>
        </div>
        <div class='detail__body detail__body--location'>
            <div class='detail__type--location'>
                <h3 class='detail__text detail__text--location' >TYPE</h3>
                <h4 class='detail__data detail__data--location-location'>${location.type}</h4>
            </div>
            <div class='detail__body-container--location'>
                <div class='detail__dimension--location'>
                    <h3 class='detail__text detail__text--location'>DIMENSION</h3>
                    <h4 class='detail__data detail__data--location-location'>${location.dimension}</h4>
                </div>
            <div>
                <h3 class='detail__text detail__text--location'>RESIDENTS</h3>
                <div class='detail__data detail__data--residentes'>${residentsTemplate}</div>
            </div>
           
        </div>
    </div>  
    `;



}