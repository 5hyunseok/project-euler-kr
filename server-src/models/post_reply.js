module.exports = (sequelize, DataTypes) => {
  const postReply = sequelize.define('postReply', {
    content: {
      type: DataTypes.TEXT,
    },
  }, {
    underscored: true,
    tableName: 'post_reply',
  });

  postReply.associate = (models) => {
    models.postReply.belongsTo(models.user);
    models.postReply.belongsTo(models.post, { onDelete: 'cascade' });
  };

  return postReply;
};
