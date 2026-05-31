const mongoose = require('mongoose');

const VolunteerRequestSchema = new mongoose.Schema(
  {
    status: { 
      type: String, 
      default: 'ממתין',
      enum: ['ממתין', 'בטיפול', 'טופל']
    },
    location: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    peopleCount: { type: Number, required: true, min: 1 },
    priority: { 
      type: String, 
      required: true, 
      enum: ['נמוכה', 'בינונית', 'גבוהה', 'קריטית']
    },
    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Volunteer',
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('VolunteerRequest', VolunteerRequestSchema);