const path    = require('path');
const express = require('express');
const router  = express.Router();

const Goals = require('../controllers/goal.controller');

router.get('/', (req,res) => res.sendFile(path.join(__dirname, '../public/index.html')));
router.get('/goals/:user', Goals.goalsByUser);
router.post('/create', Goals.create)
router.get('/:id', Goals.read);
router.put('/:id/update', Goals.update);
router.delete('/:id/delete', Goals.delete);

module.exports = router;