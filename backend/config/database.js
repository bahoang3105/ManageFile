module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "39521104",
    DB: "file_upload",
    dialect: "mysql",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};