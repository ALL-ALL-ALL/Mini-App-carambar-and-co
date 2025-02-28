const button = document.getElementById('getjoke'); // sélectionne l'élément HTML qui a l'ID getjoke
const jokeContent = document.getElementById('jokeContent'); // selectione la blague la ou elle sera affichee 

button.addEventListener('click', () => {             // ajoute un écouteur D'événements au click 
  fetch('https://mini-app-carambar-and-co.onrender.com/blagues/random')   // elle envoie une requête GET à L'URL 'http://localhost:3000/blagues/random'
    .then(response => response.json()) // converti le reponse en json
    .then(data => {                   
      jokeContent.textContent = data.content; // data.content contient la ou ya la blague
    })
    .catch(error => {
      console.error('Erreur lors de la récupération de la blague:', error);   // affiche l'erreur dans la console si ya erreur 
      jokeContent.textContent = 'Erreur lors de la récupération de la blague';
    });
});

 