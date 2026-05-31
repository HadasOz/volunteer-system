const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    skills: [{ type: String, trim: true }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Volunteer', VolunteerSchema);