module.exports = process.env.TESTOBJECT_COV ?
  require('./lib-cov/SauceLabs') :
  require('./lib/TestObject');