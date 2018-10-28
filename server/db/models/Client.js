module.exports = (sequelize, DataTypes) =>
  sequelize.define('client', {
    name: {
      type: DataTypes.STRING
    },
    lastname: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    img: {
      type: DataTypes.STRING
    },
    risk: {
      type: DataTypes.SMALLINT
    }
  })
