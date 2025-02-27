// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//   res.send('la vie la terre le soleil');
// });

// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });



const express = require('express'); // importation de express  framework

const { sequelize, Joke } = require('./models'); // importation de joke et de sequilize(connexion) pour interagir avec la base de donnée  
                                                  // joke et le model quon retrouve dans la base de donnée

const app = express(); // cration de app  express 
app.use(express.json()); // Utilisation du middleware pour traiter les données JSON dans les requêtes

const cors = require('cors'); // Importation du middleware CORS pour autoriser les requêtes cross-origin


// Activez CORS  permettre les requette venant de nimporte 
app.use(cors());









// // pour consulter une blague en mode ramdom aleatoire 

// // async permet de traiter plusieur requette sans que celle-ci soit finit sinon chaque action doit attendre que la précédente soit terminée avant de continuer
// app.get('/blagues/random', async (req, res) => {    // la méthode GET fait référence à l'URL spécifiée
//   try {
//     const randomJoke = await Joke.findOne({   // utilise la méthode findOne() de Sequelize pour récupérer une blague au hasard
//       order: sequelize.literal('RANDOM()') // choisir une blague au hasard avec sequelize dans la base de donnée
//     });

//     if (!randomJoke) {
//       return res.status(404).json({ message: 'Aucune blague trouvée' }); // si aucune blague est trouve alors erreur 404
//     }

//     res.status(200).json(randomJoke); // sinon Renvoie la blague aléatoire avec status 200 OK 
//   } catch (error) {
//     console.error('Erreur lors de la récupération de la blague aléatoire:', error); // sinon status 500 avec un message d'erreur 
//     res.status(500).json({ message: 'Erreur serveur' }); // et un message d'erreur pour le server 
//   }
// });




// //  pour ajouter une blague

// // async permet de traiter plusieur requette sans rien bloquer
// app.post('/blagues', async (req, res) => {
//   try {
//     const { content } = req.body; // recupere le contenu de la blague car "content" via la requete
//     const newJoke = await Joke.create({ content }); // utilise la méthode create() de Sequelize pour insérer la blague dans la base de données
//     res.status(201).json(newJoke);  // renvoi la blague cree en status 201  
//   } catch (error) {                  // chope en cas d'erreur  avec un status 500 avec le message
//     res.status(500).json({ error: 'Erreur lors de l\'ajout de la blague' });
//   }
// });


     // pour consulter une blague avec son ID 

// // toujours en async 
// app.get('/blagues/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const joke = await Joke.findByPk(id); // Recherche une blague avec la methode (findByPk) de sequilizze avec id
//     if (joke) {
//       res.status(200).json(joke); // Si la blague existe, la renvoyer status 200 ok
//     } else {
//       res.status(404).json({ message: 'Blague non trouvée' }); // Si la blague n'existe pas status 404
//     }
//   } catch (error) {
//     console.error('Erreur lors de la récupération de la blague:', error); // prendre l 'erreur la catcher avec un status 500 avec son message 
//     res.status(500).json({ message: 'Erreur lors de la récupération de la blague' });
//   }
// });




// // pour recuprer toutes les jokesss 

// // toujours en async 
// app.get('/blagues', async (req, res) => {
//   try {
//     const allJokes = await Joke.findAll(); // Récupère toutes les blagues avec la methode findAll() de sequilize
//     res.status(200).json(allJokes); // Envoie les blagues en réponse avec son status
//   } catch (error) {
//     console.error('Error fetching jokes:', error);  // catch l'erreur avec son message 
//     res.status(500).json({ message: 'Error fetching jokes' });
//   }
// });






//------------SWAGGER---SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER----------------------------------------
//------------SWAGGER---SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER----------------------------------------
//------------SWAGGER---SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER----------------------------------------
//------------SWAGGER---SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER----------------------------------------
//------------SWAGGER---SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER----------------------------------------
//------------SWAGGER---SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER--SWAGGER----------------------------------------



  // pour intergrer SWAGGER 
  // importation swager

const swaggerJsdoc = require('swagger-jsdoc'); // Import de swagger-jsdoc
const swaggerUi = require('swagger-ui-express'); // Import de swagger-ui-express


  
// Configuration de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Carambar & Co',
      version: '1.0.0',
      description: 'API pour gérer une collection de blagues Carambar',
      contact: {
        name: 'ALL-ALL',
        url: 'https://all-all-all.github.io/Mini-App-carambar-and-co/'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de développement'
      },
      {
        url: 'https://mini-app-carambar-and-co.onrender.com',
        description: 'Serveur de production'
      }
    ],
  },
  apis: ['./server.js'], // Le fichier qui contient les routes
};


const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Génération des documents Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // // on peux voir la terminaison - /api-docs - une fois que express recoi la requete donc elle  doit se servir de l'interface Swagger UI


// Route d'accueil pour rediriger vers la documentation
app.get('/', (req, res) => {
  res.send('API Carambar & Co - Accédez à la documentation sur /api-docs');
});


// voila le model swagger et de mes routes (des 4 end-point)
// le shemas du model joke  que lon va retrouver tout en bas dans la page 

/**
 * @swagger
 * components:
 *   schemas:
 *     Joke:
 *       type: object
 *       required:
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *           description: ID automatique de la blague
 *         content:
 *           type: string
 *           description: Le texte de la blague
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création (automatique)
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière modification (automatique)
 */


// la je documente mon end-point RANDOM
/**
 * @swagger
 * /blagues/random:
 *   get:                                         // il precise que c'est une requete get 
 *     summary: Récupère une blague aléatoire
 *     tags: [Blagues]                            // il le tag  à blague
 *     responses:                                 // reponse 200 ok 
 *       200:
 *         description: Une blague aléatoire      
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       404:                                         //  réponses rien de trouvée
 *         description: Aucune blague disponible      
 *       500:                                       // erreur server 
 *         description: Erreur serveur
 */

// async permet de traiter plusieur requette sans que celle-ci soit finit sinon chaque action doit attendre que la précédente soit terminée avant de continuer
app.get('/blagues/random', async (req, res) => {    // la méthode GET fait référence à l'URL spécifiée
  try {
    const randomJoke = await Joke.findOne({   // utilise la méthode findOne() de Sequelize pour récupérer une blague au hasard
      order: sequelize.literal('RANDOM()') // choisir une blague au hasard avec sequelize dans la base de donnée
    });

    if (!randomJoke) {
      return res.status(404).json({ message: 'Aucune blague trouvée' }); // si aucune blague est trouve alors erreur 404
    }

    res.status(200).json(randomJoke); // sinon Renvoie la blague aléatoire avec status 200 OK 
  } catch (error) {
    console.error('Erreur lors de la récupération de la blague aléatoire:', error); // sinon status 500 avec un message d'erreur 
    res.status(500).json({ message: 'Erreur serveur' }); // et un message d'erreur pour le server 
  }
});




// la je documente mon end-point POST donc l'ajout de blagues

/**
 * @swagger
 * /blagues:
 *   post:
 *     summary: Ajoute une nouvelle blague
 *     tags: [Blagues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Le texte de la blague
 *     responses:
 *       201:
 *         description: Blague créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       500:
 *         description: Erreur lors de l'ajout de la blague
 */

// async permet de traiter plusieur requette sans rien bloquer
app.post('/blagues', async (req, res) => {
  try {
    const { content } = req.body; // recupere le contenu de la blague car "content" via la requete
    const newJoke = await Joke.create({ content }); // utilise la méthode create() de Sequelize pour insérer la blague dans la base de données
    res.status(201).json(newJoke);  // renvoi la blague cree en status 201  
  } catch (error) {                  // chope en cas d'erreur  avec un status 500 avec le message
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la blague' });
  }
});




// la je documente mon end-point GET avec ID de la blague


/**
 * @swagger
 * /blagues/{id}:
 *   get:
 *     summary: Récupère une blague par son ID
 *     tags: [Blagues]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la blague
 *     responses:
 *       200:
 *         description: Détails de la blague
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Joke'
 *       404:
 *         description: Blague non trouvée
 *       500:
 *         description: Erreur lors de la récupération de la blague
 */
// toujours en async 
app.get('/blagues/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const joke = await Joke.findByPk(id); // Recherche une blague avec la methode (findByPk) de sequilizze avec id
    if (joke) {
      res.status(200).json(joke); // Si la blague existe, la renvoyer status 200 ok
    } else {
      res.status(404).json({ message: 'Blague non trouvée' }); // Si la blague n'existe pas status 404
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la blague:', error); // prendre l 'erreur la catcher avec un status 500 avec son message 
    res.status(500).json({ message: 'Erreur lors de la récupération de la blague' });
  }
});


// la je documente mon end-point GET pour recuperer toutes les blagues


/**
 * @swagger
 * /blagues:
 *   get:
 *     summary: Récupère toutes les blagues
 *     tags: [Blagues]
 *     responses:
 *       200:
 *         description: Liste de toutes les blagues
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Joke'
 *       500:
 *         description: Erreur lors de la récupération des blagues
 */
// toujours en async 
app.get('/blagues', async (req, res) => {
  try {
    const allJokes = await Joke.findAll(); // Récupère toutes les blagues avec la methode findAll() de sequilize
    res.status(200).json(allJokes); // Envoie les blagues en réponse avec son status
  } catch (error) {
    console.error('Error fetching jokes:', error);  // catch l'erreur avec son message 
    res.status(500).json({ message: 'Error fetching jokes' });
  }
});



// Démarrer le serveur 3000 avec un console.log message Serveur est en marche sur http://localhost:3000
app.listen(3000, () => {
  console.log('Serveur est en marche sur http://localhost:3000');
});