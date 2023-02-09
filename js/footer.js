

const initFooter = ()=>{
    const containerFooter = document.querySelector('.footer__container-text');
    containerFooter.addEventListener('click', ()=> printPage('HOME'));
    addEventsToFooterLinks();
} 
const addEventsToFooterLinks = () => {
    const footerLinks =[...document.getElementsByClassName('footer__nav')];
    footerLinks.forEach( element => {
        element.addEventListener('click', () => {
            printPage(element.textContent);
        });
    });
}
