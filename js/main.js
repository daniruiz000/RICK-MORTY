
const mainContainer = document.querySelector('.main');
const URL_BASE = "https://rickandmortyapi.com/api";
let arrayRecent=[];

window.onload = () => {

    printPage('HOME');
    initFooter();
}

const goBack = ()=>{

    urlLocationsNext=null;
    urlCharactersNext=null;

    arrayRecent.pop();

    lastDirrection = arrayRecent[arrayRecent.length-1];

    printPage(lastDirrection.section, lastDirrection.url);
    arrayRecent.pop();
}

const printPage = (section, url) => {
   
    let recentDirection = {section,url};
    arrayRecent.push(recentDirection);
  
    adaptHeader(section);
    
    switch (section){

        case 'HOME':

            urlLocationsNext=null;
            urlCharactersNext=null;

            printHome();

            break;

        case 'CHARACTERS':

            urlLocationsNext=null;

            if(url===undefined || url===null){

                printCharacters()

            }else printCharacter(url)

            break;

        case 'SEASONS':

            urlLocationsNext=null;
            urlCharactersNext=null;

            if(url===undefined || url===null){

                printSeasons()

            }else printEpisode(url)
        
            break;
            

        case 'LOCATIONS':

            urlLocationsNext=null;

            if(url===undefined || url===null){

                printLocations()

            }else printLocation(url)

            break;

        default:

            urlLocationsNext=null;
            urlCharactersNext=null;

            printHome();

            break;
    }

    window.scrollTo(0,0);
}

const adaptHeader = (section) => {

    const header = document.querySelector('header');

    if(section === 'HOME'){

        header.classList.add('header--home');

    } else {

        header.classList.remove('header--home');
    }
}