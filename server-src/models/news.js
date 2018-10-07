module.exports = (sequelize, DataTypes) => {
  const news = sequelize.define('news', {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    recent_flag: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
  }, {
    underscored: true,
  });

  // submit.associate = (models) => {
  // };

  return news;
};
