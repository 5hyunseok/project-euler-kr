module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
    },
    problem_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {
    underscored: true,
  });

  post.associate = (models) => {
    models.post.belongsTo(models.user);
    models.post.belongsTo(models.problem, { foreignKey: 'problem_id'});
    models.post.hasMany(models.postReply, { onDelete: 'cascade' });
  };

  return post;
};
