module.exports = (sequelize, DataTypes) => {
  const errorLog = sequelize.define('errorLog', {
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    code: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    message: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    stack: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    errno: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    syscall: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    path: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    request_url: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    client_ip: {
      type: DataTypes.STRING,
    },
  }, {
    underscored: true,
    tableName: 'error_log',
  });

  return errorLog;
};
