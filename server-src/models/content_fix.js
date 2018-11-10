module.exports = (sequelize, DataTypes) => {
  const contentFix = sequelize.define('contentFix', {
  }, {
    underscored: true,
    tableName: 'content_fix',
  });

  // threadReport.associate = (models) => {
  //   models.threadReport.belongsTo(models.thread);
  //   models.threadReport.belongsTo(models.user);
  // };

  return contentFix;
};
