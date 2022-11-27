import Sequelize, { ModelAttributeColumnOptions } from 'sequelize';

/* define commonly used variables and types used in models */
export default {
  generic_string: (required = false, length = 255, unique = false): ModelAttributeColumnOptions => ({
    type: Sequelize.STRING,
    allowNull: !required,
    unique: unique,
    validate: { len: [0, length], ...(required && { notEmpty: required }) },
  }),
  number: (required = false, defaultValue?: number): ModelAttributeColumnOptions => ({
    type: Sequelize.INTEGER,
    allowNull: !required,
    defaultValue,
  }),
  timestamp: (required = false): ModelAttributeColumnOptions => ({
    type: Sequelize.DATE,
    allowNull: !required,
  }),
};
