const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const GoalSchema = new Schema({
    name : { type: String, required: true, max: 1000 },
    complete : { type: Boolean, required: false },
    due : { type: Date, required: false },
    priority : { type: Number, required: false },
    category : { type: String, required: false },
    user : { type: String, required: true }
});

module.exports = mongoose.model('Goal', GoalSchema);