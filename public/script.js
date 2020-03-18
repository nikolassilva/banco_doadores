/* implementações para fazer o form sumir qnd
clicar no botão "Quero ajudar"
*/
document
    .querySelector('header button')
    .addEventListener("click", function() {
        document.querySelector('.form')
        .classList.toggle('hide')
    })