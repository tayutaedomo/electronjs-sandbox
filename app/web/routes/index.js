const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Web' });
});

router.get('/api', function(req, res, next) {
  res.json({ title: 'hello' });
});


module.exports = router;

