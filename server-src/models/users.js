module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    uid: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '=login id',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'USER',
    },
    short_message: {
      type: DataTypes.STRING(300),
      defaultValue: 'Project Euler!'
    }
  }, {
    underscored: true,
    indexes: [{ unique: true, fields: ['uid'] }],
  });

  user.associate = (models) => {
    models.user.hasMany(models.submit);
    models.user.hasMany(models.post);
    models.user.hasMany(models.postReply);
    models.user.hasMany(models.thread);
    models.user.hasMany(models.threadStar);
    models.user.hasMany(models.threadReport);
  };

  return user;
};
