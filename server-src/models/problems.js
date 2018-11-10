module.exports = (sequelize, DataTypes) => {
  const problem = sequelize.define('problem', {
    title: {
      type: DataTypes.TEXT,
    },
    problem: {
      type: DataTypes.TEXT,
    },
    title_kr: {
      type: DataTypes.TEXT,
    },
    problem_kr: {
      type: DataTypes.TEXT,
    },
    difficulty: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
    solver: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    mathjax: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    translator_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    }
  }, {
    underscored: true,
    timestamps: false,
  });

  problem.associate = (models) => {
    models.problem.hasMany(models.submit, { as: 'submits' });
    models.problem.hasMany(models.submit, { as: 'pending_submits' });
    models.problem.belongsTo(models.user, { as: 'translator', foreignKey: 'translator_id' });
    models.problem.hasMany(models.post);
    models.problem.hasOne(models.answer, { onDelete: 'cascade', foreignKey: 'problem_id' });
    models.problem.hasMany(models.thread);
    models.problem.belongsToMany(models.user, { as: 'reformer', through: models.contentFix });
  };

  return problem;
};
