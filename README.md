# Présentation du projet

Projet réalisé dans le cadre du cour de NodeJS, c'est un CRUD NodeJS/Express avec pour consigne d'utiliser une BDD MySQL

## Environement

* [NodeJS](https://nodejs.org) avec [Express](http://expressjs.com/)
* [MySQL](https://dev.mysql.com/downloads/mysql/)

## Librairies

* [Bootstrap](http://getbootstrap.com/) CSS & Jquery
* [OpenIconic](https://useiconic.com/open) SVG Icons

# Quick Install Guide

## Installation de l'environement, des librairies

[Installer NodeJS](https://nodejs.org)

Dans le repertoire du projet :

* Installation des packages npm (depuis package.json):

```
npm install
```

## Configuration de la base MySQL

* Configuration MySQL:

`host` localhost
`port` 8889

Il faut créer un utilisateur `contact`au password `contact`.
Vous pouvez utiliser votre configuration personalisée en modifiant le fichier `mySQLconector.js`

* SQL pour générer la base, les tables et quelques donées:

```sql
CREATE DATABASE  IF NOT EXISTS `nodejs` DEFAULT CHARACTER SET utf8;
USE `nodejs`;
DROP TABLE IF EXISTS `contact`;
CREATE TABLE `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contact_email` varchar(45) DEFAULT NULL,
  `contact_name` varchar(45) DEFAULT NULL,
  `contact_object` varchar(45) DEFAULT NULL,
  `contact_message` text,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
INSERT INTO `contact` VALUES (1,'yolo@yolo.com','yolo','Yolo','Contrairement à une opinion répandue, le Lorem Ipsum n\'est pas simplement du texte aléatoire. Il trouve ses racines dans une oeuvre de la littérature latine classique datant de 45 av. J.-C., le rendant vieux de 2000 ans. Un professeur du Hampden-Sydney College, en Virginie, s\'est intéressé à un des mots latins les plus obscurs, consectetur, extrait d\'un passage du Lorem Ipsum, et en étudiant tous les usages de ce mot dans la littérature classique, découvrit la source incontestable du Lorem Ipsum. Il provient en fait des sections 1.10.32 et 1.10.33 du \"De Finibus Bonorum et Malorum\" (Des Suprêmes Biens et des Suprêmes Maux) de Cicéron. Cet ouvrage, très populaire pendant la Renaissance, est un traité sur la théorie de l\'éthique. Les premières lignes du Lorem Ipsum, \"Lorem ipsum dolor sit amet...\", proviennent de la section 1.10.32.\r\n\r\nL\'extrait standard de Lorem Ipsum utilisé depuis le XVIè siècle est reproduit ci-dessous pour les curieux. Les sections 1.10.32 et 1.10.33 du \"De Finibus Bonorum et Malorum\" de Cicéron sont aussi reproduites dans leur version originale, accompagnée de la traduction anglaise de H. Rackham (1914).'),(2,'test@mail.com','testMan','test','zeoi,fdzeinzfijndie,eozxzlx^plcs^dpc;oi,nezijndze');
```

# Quick Launch Guide

Dans le repertoire du projet :

* Démarrer le projet :

```
node /bin/www
```

* Avec [pm2](http://pm2.keymetrics.io/) des scripts personalisés sont disponibles (cf package.json):

Installer pm2 :

```
npm install pm2 -g
```

Demarrer/redemarrer le projet :

```
npm start
```
```
npm restart
```

Kill le projet :

```
npm stop
```
