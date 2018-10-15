module.exports = (sequelize, DataTypes) => {
  const threadReport = sequelize.define('threadReport', {
  }, {
    underscored: true,
    tableName: 'thread_report',
  });

  threadReport.associate = (models) => {
    models.threadReport.belongsTo(models.thread);
    models.threadReport.belongsTo(models.user);
  };

  return threadReport;
};
