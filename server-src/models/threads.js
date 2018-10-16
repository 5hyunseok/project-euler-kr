module.exports = (sequelize, DataTypes) => {
  const thread = sequelize.define('thread', {
    content: {
      type: DataTypes.TEXT,
    },
    code: {
      type: DataTypes.TEXT,
    },
    language: {
      type: DataTypes.STRING,
    },
    star: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    underscored: true,
  });

  thread.associate = (models) => {
    models.thread.belongsTo(models.problem);
    models.thread.belongsTo(models.user);
    models.thread.hasMany(models.threadStar);
    models.thread.hasMany(models.threadReport);
  };

  return thread;
};
