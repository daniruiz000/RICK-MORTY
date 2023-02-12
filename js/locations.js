
let urlLocationsNext;
let locationsCards;
let locationsData;

const printLocations = () => {

    section = 'LOCATIONS';

    getData(section).then(response=>{
        
        locationsData = response;
        locationsCards = formatCard(section, locationsData);
        printContent(section, locationsCards, locationsData);
    });
}

