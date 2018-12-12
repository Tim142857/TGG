require('rootpath')();
const User = require('models/User');
const TypeRessource = require('models/TypeRessource')
const StockRessource = require('models/StockRessource');


module.exports = {
	createPlayerStockRessources : idUser => {
		console.log(idUser)
    	return Promise.all([
      		TypeRessource.find({ where: { name: 'Or' } }),
      		TypeRessource.find({ where: { name: 'Bois' } }),
      		TypeRessource.find({ where: { name: 'Nourriture' } }),
      		User.findByPk(idUser)
      	])
      	.then(values => {
     		var or = values[0];
     		var bois = values[1];
      		var nourriture = values[2];
      		var user = values[3];

      	var playerStockRessources = [
        {
          ressourceId: or.id,
          value: 500,
          userId: user.id
        },
        {
          ressourceId: bois.id,
          value: 500,
          userId: user.id
        },
        {
          ressourceId: nourriture.id,
          value: 500,
          userId: user.id
        },
        ]
        return StockRessource.bulkCreate(playerStockRessources);
      	})
    }
}