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
  }, {
    underscored: true,
    indexes: [{ unique: true, fields: ['uid'] }],
  });

  user.associate = (models) => {
    models.user.hasMany(models.submit);
    models.user.hasMany(models.translateSubmit);
  };

  return user;
};
