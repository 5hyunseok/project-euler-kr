module.exports = (sequelize, DataTypes) => {
  const threadStar = sequelize.define('threadStar', {
  }, {
    underscored: true,
    tableName: 'thread_star',
  });

  threadStar.associate = (models) => {
    models.threadStar.belongsTo(models.thread);
    models.threadStar.belongsTo(models.user);
    models.threadStar.belongsTo(models.user, { as: 'thread_writer', foreignKey: 'thread_writer_id' });
  };

  return threadStar;
};
