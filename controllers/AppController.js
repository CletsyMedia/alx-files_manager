const { getRedisInfo, getDBStats } = require('../utils');

const AppController = {
  async getStatus(req, res) {
    try {
      const redisAlive = await getRedisInfo();
      const dbAlive = await getDBStats();

      res.status(200).json({ redis: redisAlive, db: dbAlive });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getStats(req, res) {
    try {
      const numUsers = await getDBStats('users');
      const numFiles = await getDBStats('files');

      res.status(200).json({ users: numUsers, files: numFiles });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = AppController;