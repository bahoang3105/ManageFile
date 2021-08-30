module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define("file", {
        fileID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userID: {
            type: Sequelize.INTEGER,
            references: {
                model: 'user',
                key: 'userID',
            },
        },
        fileName: {
            type: Sequelize.STRING,
        },
        fileType: {
            type: Sequelize.STRING,
        },
        size: {
            type: Sequelize.INTEGER,
        },
        date: {
            type: Sequelize.DATE,
        },
    }, { freezeTableName: true, timestamps: false, tableName: 'file' });

    return File;
};