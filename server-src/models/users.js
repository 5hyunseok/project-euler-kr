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
    },
    closed_flag: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
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
    models.user.hasMany(models.problem, { as: 'translator', foreignKey: 'translator_id' });
    models.user.belongsToMany(models.problem, { as: 'reformer', through: models.contentFix });
  };

  return user;
};
