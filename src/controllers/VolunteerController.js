const service = require('../bl-services/VolunteerService');

exports.createVolunteer = async (req, res, next) => {
  try {
    const { firstName, lastName, phone } = req.body;

    if (!firstName || !lastName || !phone) {
      return res.status(400).json({
        message: 'Missing required fields: firstName, lastName, phone'
      });
    }

    //  בדיקה אם מתנדב כבר קיים לפי טלפון
    const existing = await service.getByPhone(phone);
    if (existing) {
      return res.status(409).json({
        message: 'מתנדב עם מספר טלפון זה כבר קיים במערכת',
        volunteer: existing
      });
    }

    const volunteer = await service.create(req.body);
    res.status(201).json(volunteer);
  } catch (err) {
    next(err);
  }
};

exports.getAllVolunteers = async (req, res, next) => {
  try {
    const volunteers = await service.getAll();
    res.json(volunteers);
  } catch (err) {
    next(err);
  }
};

exports.getVolunteerById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const volunteer = await service.getById(id);
    
    if (!volunteer) {
      return res.status(404).json({ message: 'מתנדב לא נמצא' });
    }
    
    res.json(volunteer);
  } catch (err) {
    next(err);
  }
};