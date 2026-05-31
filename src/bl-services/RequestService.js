const VolunteerRequest = require('../dal-models/VolunteerRequest');

exports.create = async (data) => {
  return await VolunteerRequest.create(data);
};

exports.getAll = async (filters = {}) => {
  const query = {};

  if (filters.status) {
    query.status = filters.status;
  }
  
  if (filters.priority) {
    query.priority = filters.priority;
  }
  
  if (filters.location) {
    // חיפוש חלקי - תומך בחיפוש כמו "ירושלים" בתוך "ירושלים - רחוב הרצל"
    query.location = { $regex: filters.location, $options: 'i' };
  }

  return await VolunteerRequest.find(query).populate('volunteer').lean();
};

exports.getById = async (id) => {
  return await VolunteerRequest.findById(id).populate('volunteer').lean();
};

exports.assignVolunteer = async (requestId, volunteerId) => {
  return await VolunteerRequest.findByIdAndUpdate(
    requestId,
    { status: 'בטיפול', volunteer: volunteerId },
    { new: true }
  ).populate('volunteer').lean();
};

exports.updateStatus = async (requestId, status) => { 
  return await VolunteerRequest.findByIdAndUpdate(
    requestId,
    { status },
    { new: true }
  ).lean();
};

exports.deleteById = async (id) => {
  return await VolunteerRequest.findByIdAndDelete(id).lean();
};

exports.patchById = async (id, data) => {
  const allowed = ['location', 'description', 'phone', 'peopleCount', 'priority'];
  const update = {};

  for (const key of allowed) {
    if (data[key] !== undefined) {
      update[key] = data[key];
    }
  }

  return await VolunteerRequest.findByIdAndUpdate(id, update, { new: true }).lean();
};

exports.unassignVolunteer = async (requestId) => {
  return await VolunteerRequest.findByIdAndUpdate(
    requestId,
    { status: 'ממתין', volunteer: null },
    { new: true }
  ).lean();
};