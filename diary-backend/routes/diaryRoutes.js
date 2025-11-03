const express = require('express');
const { addDiary, getAllDiaries, updateDiary, deleteDiary } =
  require('../controllers/diaryController');
const router = express.Router();

router.post('/', addDiary);
router.get('/', getAllDiaries);
router.put('/:id', updateDiary);
router.delete('/:id', deleteDiary);

module.exports = router;
