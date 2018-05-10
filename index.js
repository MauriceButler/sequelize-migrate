const Umzug = require('umzug');

function logMigrationName(name) {
    console.log('Running -->', name);
}

function migrate(persistence, config, action, migrationPath, migration, callback) {
    const sequelize = persistence.createConnection();
    const umzug = new Umzug({
        storage: 'sequelize',
        storageOptions: {
            sequelize,
        },
        migrations: {
            path: migrationPath,
            params: [sequelize.queryInterface || sequelize.getQueryInterface(), sequelize.Sequelize],
        },
    }).on('migrating', logMigrationName);

    const runMigration = require('./migrate')(umzug, config);

    runMigration(migration, action, callback);
}

module.exports = migrate;
