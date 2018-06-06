const db = require('../db.js');
const Sequelize = require('sequelize');
const User = require('./user.js');

const Watch = db.define(
  'watch',
  {
    brand: {
      type: Sequelize.STRING,
      allowNull: false
    },
    model: {
      type: Sequelize.STRING,
      allowNull: false
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    description: Sequelize.TEXT,
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      validate: {
        min: 0,
        max: 50000000
      }
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    style: {
      type: Sequelize.STRING,
      allowNull: false
    },
    tier: {
      type: Sequelize.STRING,
      allowNull: false
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }
  /*   {
    defaultScope: {
      include: [{ model: User, as: "seller" }]
    }
  } */
);

module.exports = Watch;
