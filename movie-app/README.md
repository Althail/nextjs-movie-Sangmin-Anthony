# API Movie

Ce projet vise à fournir une interface via une API permettant d'accéder à une base de données hébergée sur MongoDB, contenant des films et des commentaires.

## Comment utiliser

Pour utiliser l'application, assurez-vous d'avoir Node.js installé en version 18.7.5.

1. Exécutez la commande suivante pour installer toutes les dépendances :
```bash
npm install
```
pour installer toutes les dépendances.

2. Création de l'environnement : 

Créer un fichier `.env.local` à la racine du projet et y ajouter la connexion à MongoDB :
```bash
MONGODB_URI=mongodb+srv://<user>:<password>@<host>/
```

3. Ensuite, lancez l'application en local avec la commande :
```bash
npm run dev
```
Elle sera hébergée sur le port 3000. Assurez-vous d'avoir configuré une connexion à MongoDB et d'avoir une copie de la base de données (il s'agit d'une base de données MongoDB de base).

## Endpoints

Il existe 10 endpoints, tous décrits dans le Swagger à : [Swagger](http://localhost:3000/swagger)

Ces endpoints permettent de récupérer des données, de les mettre à jour, de les supprimer ou d'en ajouter.
