const Diary = require('../models/diaryModel');
const jwt = require('jsonwebtoken');

//Helper function to extract userId from JWT
function getUserId(req) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) throw new Error('No token provided');
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.userId;
}

// CREATE - Add a new diary entry
exports.addDiary = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { title, description, mood } = req.body;

    // Validation check
    if (!title || !description || !mood) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create and save new diary
    const newDiary = new Diary({
      userId,
      title,
      description,
      mood,
    });

    await newDiary.save();

    // Return full object for testing
    res.status(201).json({
      message: 'Diary added successfully',
      diary: newDiary,
    });
  } catch (error) {
    console.error('Add Diary Error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// READ - Get all diaries for logged-in user
exports.getAllDiaries = async (req, res) => {
  try {
    const userId = getUserId(req);
    const diaries = await Diary.find({ userId });

    if (!diaries || diaries.length === 0) {
      return res.status(404).json({ message: 'No diaries found' });
    }

    res.status(200).json(diaries);
  } catch (error) {
    console.error('Get Diaries Error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✏️ UPDATE - Update an existing diary entry
exports.updateDiary = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Diary.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'Diary not found' });
    }

    res.status(200).json({
      message: 'Diary updated successfully',
      diary: updated,
    });
  } catch (error) {
    console.error('Update Diary Error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// 🗑️ DELETE - Delete a diary entry
exports.deleteDiary = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Diary.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Diary not found' });
    }

    res.status(200).json({ message: 'Diary deleted successfully' });
  } catch (error) {
    console.error('Delete Diary Error:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
