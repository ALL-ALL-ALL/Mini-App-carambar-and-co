// models.js

const { Sequelize, DataTypes } = require('sequelize');

// Créer une instance Sequelize avec SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Ceci va créer le fichier de base de données SQLite
});


// Test de la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie !'); 
  })
  .catch((err) => {
    console.error('Impossible de se connecter à la base de données:', err);
  });


// Définir un modèle (par exemple, pour les blagues)
const Joke = sequelize.define('Joke', {
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});



// Synchroniser les modèles avec la base de données
sequelize.sync()
  .then(() => {
    console.log('La base de données a été synchronisée avec succès.');
  })
  .catch((err) => {
    console.error('Erreur de synchronisation:', err);
  });

module.exports = { sequelize, Joke };
 
