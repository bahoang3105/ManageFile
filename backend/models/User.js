module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
    }, { freezeTableName: true, timestamps: false, tableName: 'user' });

    return User;
}