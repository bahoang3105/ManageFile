import dbConfig from '../config/database';
import Sequelize from 'sequelize';
import File from './File';
import User from './User';
import bcryptjs from 'bcryptjs';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = User(sequelize, Sequelize);
db.files = File(sequelize, Sequelize);

export const init = async () => {
    const check = await db.users.findOne({
        where: {
            username: 'admin',
        }
    });
    if(check === null) {
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash('admin', salt);

        await db.users.create({
            username: 'admin',
            password: hashPassword,
            role: 1
        });
    }
}

export default db;