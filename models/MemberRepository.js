const dbPromise = require('./DbConnection');

module.exports = {
    getMember: async (memberId) => {
        const connection = await dbPromise;
        let [rows] = await connection.query('', []);
        return rows.length > 0 ? rows[0] : null;
    },
};
