const Volunteer = require('../dal-models/Volunteer');

exports.create = async (data) => {
  return await Volunteer.create(data);
};

exports.getAll = async () => {
  return await Volunteer.find().lean();
};

//  חדש - קבלת מתנדב לפי ID
exports.getById = async (id) => {
  return await Volunteer.findById(id).lean();
};

//  חדש - בדיקה אם מתנדב קיים לפי טלפון
exports.getByPhone = async (phone) => {
  return await Volunteer.findOne({ phone }).lean();
};