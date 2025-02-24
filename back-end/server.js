// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//   res.send('la vie la terre le soleil');
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });



const express = require('express');
const { sequelize, Joke } = require('./models'); // Importer sequelize et Joke

const app = express();
app.use(express.json());
const cors = require('cors'); // cors

// Activez CORS
app.use(cors());

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Serveur est en marche sur http://localhost:3000');
});







// pour consulter une blague en mode ramdom aleatoire 

app.get('/blagues/random', async (req, res) => {
  try {
    const randomJoke = await Joke.findOne({
      order: sequelize.literal('RANDOM()') // Choisir une blague au hasard
    });

    if (!randomJoke) {
      return res.status(404).json({ message: 'Aucune blague trouvée' });
    }

    res.status(200).json(randomJoke); // Renvoie la blague aléatoire
  } catch (error) {
    console.error('Erreur lors de la récupération de la blague aléatoire:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

//  pour ajouter une blague

app.post('/blagues', async (req, res) => {
  try {
    const { content } = req.body;
    const newJoke = await Joke.create({ content });
    res.status(201).json(newJoke);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la blague' });
  }
});


     // pour consulter une blague avec son ID 

app.get('/blagues/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const joke = await Joke.findByPk(id); // Recherche une blague par son id
    if (joke) {
      res.status(200).json(joke); // Si la blague existe, la renvoyer
    } else {
      res.status(404).json({ message: 'Blague non trouvée' }); // Si la blague n'existe pas
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la blague:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la blague' });
  }
});




// pour recuprer toutes les jokesss 


app.get('/blagues', async (req, res) => {
  try {
    const allJokes = await Joke.findAll(); // Récupère toutes les blagues
    res.status(200).json(allJokes); // Envoie les blagues en réponse
  } catch (error) {
    console.error('Error fetching jokes:', error);
    res.status(500).json({ message: 'Error fetching jokes' });
  }
});

