module.exports = (sequelize, DataTypes) => {
  const answer = sequelize.define('answer', {
    problem_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    answer: {
      type: DataTypes.STRING,
    },
  }, {
    underscored: true,
    timestamps: false,
  });

  answer.associate = (models) => {
    models.answer.belongsTo(models.problem, { onDelete: 'cascade', foreignKey: 'problem_id' });
  };

  return answer;
};
