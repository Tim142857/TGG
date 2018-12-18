require('rootPath')();
const Squad = require('models/Squad');
const User = require('models/User');
const TypeSoldier = require('models/TypeSoldier')

module.exports = {
  createPlayerSquads : idUser => {
    return Promise.all([
      TypeSoldier.findOne({ where: { name: 'Archer' } }),
      TypeSoldier.findOne({ where: { name: 'Combattant' } }),
      TypeSoldier.findOne({ where: { name: 'Chevalier' } }),
      TypeSoldier.findOne({ where: { name: 'Catapulte' } }),
      User.findByPk(idUser)
    ])
    .then(values => {
      var archer = values[0];
      var combattant = values[1];
      var chevalier = values[2];
      var catapulte = values[3];
      var user = values[4];
      var playerSquads = [
        {
          TypeSoldierId: archer.id,
          effective: 0,
          UserId: user.id
        },
        {
          TypeSoldierId: combattant.id,
          effective: 0,
          UserId: user.id
        },
        {
          TypeSoldierId: chevalier.id,
          effective: 0,
          UserId: user.id
        },
        {
          TypeSoldierId: catapulte.id,
          effective: 0,
          UserId: user.id
        },
      ]
      return Squad.bulkCreate(playerSquads);
    })
  },
  train: async function(req){
    let squad = await Squad.findOne({
      where: {
        TypeSoldierId: req.body.idSoldier,
        UserId: req.user.id
      }
    });
    //TODO check si assez d'or
    let user = req.user;
    var stock = user.getStockRessourceByName('Or');
    let cost = squad.getCostTraining(req.body.nbSoldier);
    if(stock.value >= cost){
      squad.effective = squad.effective + parseInt(req.body.nbSoldier);
      // console.log('reste', stock.value - building.getCostNextLevel()) //pb de calcul du reste
      stock.value = stock.value - cost;
      await stock.save()
      await squad.save()
      return Promise.resolve(true)
    }
    return Promise.resolve(false)
    //Mettre à jour stock d'or
    //Mettre à jour conso armée
    squad.effective = squad.effective + parseInt(req.body.nbSoldier);
    return squad.save();
  }
}
