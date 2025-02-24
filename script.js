const button = document.getElementById('getjoke');
const jokeContent = document.getElementById('jokeContent');

button.addEventListener('click', () => {
  fetch('http://localhost:3000/blagues/random')
    .then(response => response.json()) // On transforme la réponse en JSON
    .then(data => {
      // On affiche la blague dans le HTML
      jokeContent.textContent = data.content; // data.content contient la blague
    })
    .catch(error => {
      console.error('Erreur lors de la récupération de la blague:', error);
      jokeContent.textContent = 'Erreur lors de la récupération de la blague';
    });
});



app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
}));