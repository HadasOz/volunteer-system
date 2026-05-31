const express = require('express');
const router = express.Router();
const controller = require('../controllers/RequestController');

/**
 * @swagger
 * tags:
 *   name: Requests
 *   description: Volunteer requests management
 */

/**
 * @swagger
 * /api/requests:
 *   get:
 *     summary: Get all requests
 *     tags: [Requests]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of requests
 */
router.get('/', controller.getAllRequests);

/**
 * @swagger
 * /api/requests/{id}:
 *   get:
 *     summary: Get request by ID
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Request found
 *       400:
 *         description: Invalid request id
 *       404:
 *         description: Request not found
 */
router.get('/:id', controller.getRequestById);

/**
 * @swagger
 * /api/requests:
 *   post:
 *     summary: Create new request
 *     tags: [Requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - location
 *               - description
 *               - phone
 *               - peopleCount
 *               - priority
 *             properties:
 *               location: { type: string }
 *               description: { type: string }
 *               phone: { type: string }
 *               peopleCount: { type: number }
 *               priority: { type: string }
 *     responses:
 *       201:
 *         description: Request created
 */
router.post('/', controller.createRequest);

/**
 * @swagger
 * /api/requests/{id}/volunteer:
 *   post:
 *     summary: Assign volunteer to request
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [volunteerId]
 *             properties:
 *               volunteerId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Volunteer assigned
 *       400:
 *         description: Invalid id/volunteerId
 *       404:
 *         description: Request not found
 */
router.post('/:id/volunteer', controller.assignVolunteer);

/**
 * @swagger
 * /api/requests/{id}/status:
 *   patch:
 *     summary: Update request status
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 example: בטיפול
 *     responses:
 *       200:
 *         description: Status updated
 *       400:
 *         description: Invalid request id
 *       404:
 *         description: Request not found
 */
router.patch('/:id/status', controller.updateStatus);

/**
 * @swagger
 * /api/requests/{id}:
 *   patch:
 *     summary: Update request fields (partial)
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location: { type: string }
 *               description: { type: string }
 *               phone: { type: string }
 *               peopleCount: { type: number }
 *               priority: { type: string }
 *     responses:
 *       200:
 *         description: Request updated
 *       400:
 *         description: Invalid request id
 *       404:
 *         description: Request not found
 */
router.patch('/:id', controller.patchRequest);

/**
 * @swagger
 * /api/requests/{id}/unassign:
 *   patch:
 *     summary: Unassign volunteer from request (back to pending)
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Volunteer removed
 *       400:
 *         description: Invalid request id
 *       404:
 *         description: Request not found
 */
router.patch('/:id/unassign', controller.unassignVolunteer);

/**
 * @swagger
 * /api/requests/{id}:
 *   delete:
 *     summary: Delete request by ID
 *     tags: [Requests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Request deleted
 *       400:
 *         description: Invalid request id
 *       404:
 *         description: Request not found
 */
router.delete('/:id', controller.deleteRequest);

module.exports = router;
