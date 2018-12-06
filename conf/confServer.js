module.exports = {
  mySql : {
    host: '10.10.0.100',
    port: '3000',
    user: 'tgg_admin',
    password: 'tgg_passwd',
    db: 'TGG',
    dialect: 'mysql',
    sync: { force: true },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
}
