module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        userID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
    }, { freezeTableName: true, timestamps: false, tableName: 'user' });

    return User;
}