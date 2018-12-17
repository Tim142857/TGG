require('rootPath')();
const Building = require('models/Building');
const User = require('models/User');

module.exports = {
  levelUp: async function(req){
    let building = await Building.findByPk(req.body.id);
    let user = req.user;
    var stock = user.getStockRessourceByName('Bois');
    if(stock.value >= building.getCostNextLevel()){
      building.level++;
      // console.log('reste', stock.value - building.getCostNextLevel()) //pb de calcul du reste
      stock.value = stock.value - building.getCostNextLevel();
      await stock.save()
      await building.save()
      return Promise.resolve(true)
    }
    return Promise.resolve(false)
  }
}
