require('rootPath')();
const Building = require('models/Building')
const User = require('models/User')

module.exports = {
  levelUp: async(body) => {
    console.log('levelUp')
    console.log(body.id)
    var building = await Building.findByPk(body.id);
    var user = await User.findByPk(building.userId);

    user.stocks[0].selfUpdate();

    return Promise.resolve();

    // return Promise.all([
    //   Building.findByPk(body.id),
    //
    // ])
    // .then(values => {
    //   let building = values[0];
    //
    //   if(building.getCostNextLevel() <= user.getStockRessourceValue('Or'))
    // })
  }
}
