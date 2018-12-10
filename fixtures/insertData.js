require('rootPath')();
const TypeRessourceManager = require('managers/TypeRessourceManager');
const TypeRessource = require('models/TypeRessource')


module.exports = async function(){
	await insertTypeRessources();

//checkere si ya deja les données 

//appels aux managers pour crée les donénes

//Ressources
//fonctions de batiments
//soldats
//types de batiments
// building.soldierId = 1;
//quetes
}

function insertTypeRessources(){
	var ressources = [
	{
		name: "Or",
		description: "Permet d'acheter des soldats",
		image: "or.jpg"
	},
	{
		name: "Bois",
		description: "Permet de construire des batiments",
		image: "bois.jpg"
	},
	{
		name: "Nourriture",
		description: "Permet de nourrir son armée",
		image: "nourriture.jpg"
	}
	]

	TypeRessource.bulkCreate(ressources);
}