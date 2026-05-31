const service = require('../bl-services/RequestService');
const mongoose = require('mongoose');

exports.createRequest = async (req, res, next) => {
  try {
    const request = await service.create(req.body);
    res.status(201).json(request);
  } catch (err) {
    next(err);
  }
};

exports.getAllRequests = async (req, res, next) => {
  try {
    const requests = await service.getAll(req.query);
    res.json(requests);
  } catch (err) {
    next(err);
  }
};

exports.getRequestById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid request id' });
    }

    const request = await service.getById(id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json(request);
  } catch (err) {
    next(err);
  }
};

exports.assignVolunteer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { volunteerId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid request id' });
    }
    if (!volunteerId || !mongoose.Types.ObjectId.isValid(volunteerId)) {
      return res.status(400).json({ message: 'Invalid volunteerId' });
    }

    const updated = await service.assignVolunteer(id, volunteerId);

    if (!updated) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid request id' });
    }
    if (!status) {
      return res.status(400).json({ message: 'Missing status' });
    }

    const updated = await service.updateStatus(id, status);

    if (!updated) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.patchRequest = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid request id' });
    }

    const updated = await service.patchById(id, req.body);

    if (!updated) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.unassignVolunteer = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid request id' });
    }

    const updated = await service.unassignVolunteer(id);

    if (!updated) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteRequest = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid request id' });
    }

    const deleted = await service.deleteById(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json({ message: 'Request deleted', deleted });
  } catch (err) {
    next(err);
  }
};
