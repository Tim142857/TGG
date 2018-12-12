require('rootPath')();
const TypeRessourceManager = require('managers/TypeRessourceManager');
const TypeRessource = require('models/TypeRessource')
const TypeFunctionBuilding = require('models/TypeFunctionBuilding')
const TypeSoldier = require('models/TypeSoldier')
const TypeBuilding = require('models/TypeBuilding')
const User = require('models/User')


module.exports = async function(){
	await insertTypeRessources();
	await insertTypeFunctionBuildings();
	await insertTypeSoldier();
	await insertTypeBuildings();
	await insertPlayers();
}
async function insertTypeBuildings(){
	var orId = (await TypeRessource.findOne({ where: { name: "Or" } })).id;
	var boisId = (await TypeRessource.findOne({ where: { name: "Bois" } })).id;
	var nourritureId = (await TypeRessource.findOne({ where: { name: "Nourriture" } })).id;
	var prodId = (await TypeFunctionBuilding.findOne({ where: { name: "Production" } })).id;
	var stockId = (await TypeFunctionBuilding.findOne({ where: { name: "Stockage" } })).id;
	var formId = (await TypeFunctionBuilding.findOne({ where: { name: "Formation" } })).id;
	var archerId = (await TypeSoldier.findOne({ where: { name: "Archer" } })).id;
	var combattantId = (await TypeSoldier.findOne({ where: { name: "Combattant" } })).id;
	var chevalierId = (await TypeSoldier.findOne({ where: { name: "Chevalier" } })).id;
	var catapulteId = (await TypeSoldier.findOne({ where: { name: "Catapulte" } })).id;

	var buildings = [
		{
			name: "Grenier",
			description: "Sert à entreposer la nourriture",
			value: 1000,
			image: "grenier.png",
			ressourceId: nourritureId,
			functionBuildingId: stockId,
			soldierId: null
		},
		{
			name: "Trésorerie",
			description: "Sert à entreposer l'or",
			value: 1000,
			image: "tresorerie.png",
			ressourceId: orId,
			functionBuildingId: stockId,
			soldierId: null
		},
		{
			name: "Entrepot",
			description: "Sert à entreposer le bois",
			value: 1000,
			image: "entrepot.jpg",
			ressourceId: boisId,
			functionBuildingId: stockId,
			soldierId: null
		},
		{
			name: "Ferme",
			description: "Produit de la nourriture",
			value: 100,
			image: "ferme.png",
			ressourceId: nourritureId,
			functionBuildingId: prodId,
			soldierId: null
		},
		{
			name: "Mine",
			description: "Produit de l'or",
			value: 100,
			image: "mine.jpg",
			ressourceId: orId,
			functionBuildingId: prodId,
			soldierId: null
		},
		{
			name: "Scierie",
			description: "Produit du bois",
			value: 100,
			image: "scierie.jpg",
			ressourceId: boisId,
			functionBuildingId: prodId,
			soldierId: null
		},
		{
			name: "Archerie",
			description: "Sert à former des archers",
			value: null,
			image: "caserne.png",
			ressourceId: null,
			functionBuildingId: formId,
			soldierId: archerId
		},
		{
			name: "Caserne",
			description: "Sert à former des combattants",
			value: null,
			image: "caserne.png",
			ressourceId: null,
			functionBuildingId: formId,
			soldierId: combattantId
		},
		{
			name: "Ecurie",
			description: "Sert à former des chevaliers",
			value: null,
			image: "caserne.png",
			ressourceId: null,
			functionBuildingId: formId,
			soldierId: chevalierId
		},
		{
			name: "Atelier",
			description: "Sert à former des catapultes",
			value: null,
			image: "caserne.png",
			ressourceId: null,
			functionBuildingId: formId,
			soldierId: catapulteId
		}
	]

	buildings.forEach(async(elm) => {
		await TypeBuilding.findOrCreate({ where: elm });
	})
}

function insertTypeFunctionBuildings(){
	var functions = [
		{
			name: "Production"
		},
		{
			name: "Stockage"
		},
		{
			name: "Formation"
		}
	]

	functions.forEach(async(elm) => {
		await TypeFunctionBuilding.findOrCreate({ where: elm });
	})
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
	ressources.forEach(async (elm) => {
		await TypeRessource.findOrCreate({ where: elm });
	})
}

function insertTypeSoldier(){
	var soldiers = [
		{
			name: "Archer",
			description: "Unité fragile avec des dégats corrects",
			image: "archer.jpg",
			atk: 20,
			def: 10,
			cost: 40
		},
		{
			name: "Combattant",
			description: "Parle peu, tapes peu mais encaisse beaucoup !",
			image: "combattant.jpg",
			atk: 10,
			def: 20,
			cost: 45
		},
		{
			name: "Chevalier",
			description: "l'élite des combattants, mais à quel prix ?",
			image: "chevalier.jpg",
			atk: 35,
			def: 25,
			cost: 90
		},
		{
			name: "Catapulte",
			description: "Des dégats monstrueux, mais accompagnez la!",
			image: "catapulte.jpg",
			atk: 50,
			def: 10,
			cost: 90
		}
	]

	soldiers.forEach(async (elm) => {
		await TypeSoldier.findOrCreate({ where: elm });
	})
}

function insertPlayers(){
	var users = [
		{
			name: 'admin',
			login: 'admin',
			password: 'password',
			isAdmin: true
		},
		{
			name: 'player',
			login: 'player',
			password: 'password'
		}
	]
	users.forEach(async (elm) => {
		await User.findOrCreate({ where: elm });
	})

}
