import express from 'express';
import AppController from '../controllers/AppController';

function controllerRouting(app) {
  const router = express.Router();

  router.get('/status', (req, res) => {
    AppController.getStatus(req, res);
  });

  router.get('/stats', (req, res) => {
    AppController.getStats(req, res);
  });

  app.use('/', router);
}

export default controllerRouting;
