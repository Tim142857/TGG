require('rootpath')();
const Sequelize = require('sequelize');
const dbConf = require('conf/confServer').mySql;
const sequelize = new Sequelize(dbConf.db, dbConf.user, dbConf.password, {
  host: dbConf.host,
  dialect: dbConf.dialect,
  operatorsAliases: false,
  pool: dbConf.pool,
  // logging: false
});

sequelize.sync().then(() => {
  console.log('############     Synchronisation db ok !    ############');
});



module.exports = {
  sequelize
}
