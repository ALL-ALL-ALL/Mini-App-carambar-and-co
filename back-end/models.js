// models.js
// conexion a la base de donnée avec -sequilize - data type pour les model 
const { Sequelize, DataTypes } = require('sequelize'); //elle importe deux element pour travailler avec la base de donnée 

// Créer une instance Sequelize avec SQLite 
// pour établir la connexion à votre base de données SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite', // dit que on utlise sqlite comme base de donnée 
  storage: './database.sqlite', //  base de données sera stocké a ./database.sqlite
});


// Test test de la connexion à la base de données
sequelize.authenticate()  //méthode teste la connexion à la base de donnéesvia sequelize
  .then(() => {
    console.log('Connexion à la base de données réussie !');  // si ca reussi ya se message
  })
  .catch((err) => {
    console.error('Impossible de se connecter à la base de données:', err);
  });


// Définir un modèle (pour les blagues)
const Joke = sequelize.define('Joke', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


// plus besoin d'ecrire du code manuellement en sql pour cree mes table
// Synchroniser les modèles avec la base de données
sequelize.sync()
  .then(() => {
    console.log('La base de données a été synchronisée avec succès.');
  })
  .catch((err) => {
    console.error('Erreur de synchronisation:', err);
  });

module.exports = { sequelize, Joke }; // permet au server express a acceder o model jokepour des operation (crud )(cree lire suprimer metre a jour )
 
