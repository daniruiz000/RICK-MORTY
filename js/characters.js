
let urlCharactersNext;
let charactersData;
let charactersCards;

const printCharacters = () => {

    section = 'CHARACTERS';

    getData(section).then(response=>{

        charactersData = response;
        charactersCards = formatCard(section, charactersData);
        printContent(section, charactersCards, charactersData);
    });
}
