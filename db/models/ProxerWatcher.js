module.exports = function (sequelize, Sequelize) {
    return sequelize.define('ProxerWatcher', {
        id: {type: Sequelize.INTEGER.UNSIGNED, primaryKey: true, unique: true, autoIncrement: true},
        server_channel: {type:Sequelize.STRING(100), allowNull: false},
        msg_id: {type:Sequelize.STRING(100), allowNull: false}
    }, {
        underscored: true,
        tableName: 'proxerwatcher'
    })
};