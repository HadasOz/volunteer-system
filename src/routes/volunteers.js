const express = require('express');
const router = express.Router();
const controller = require('../controllers/VolunteerController');

/**
 * @swagger
 * tags:
 *   name: Volunteers
 *   description: Volunteers management
 */

/**
 * @swagger
 * /api/volunteers:
 *   post:
 *     summary: Create new volunteer
 *     tags: [Volunteers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - phone
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "דוד"
 *               lastName:
 *                 type: string
 *                 example: "כהן"
 *               phone:
 *                 type: string
 *                 example: "0501234567"
 *               skills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["גרירה", "נעילה", "חשמל"]
 *     responses:
 *       201:
 *         description: Volunteer created
 *       409:
 *         description: Volunteer already exists
 */
router.post('/', controller.createVolunteer);

/**
 * @swagger
 * /api/volunteers:
 *   get:
 *     summary: Get all volunteers
 *     tags: [Volunteers]
 *     responses:
 *       200:
 *         description: List of volunteers
 */
router.get('/', controller.getAllVolunteers);

/**
 * @swagger
 * /api/volunteers/{id}:
 *   get:
 *     summary: Get volunteer by ID
 *     tags: [Volunteers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Volunteer found
 *       404:
 *         description: Volunteer not found
 */
router.get('/:id', controller.getVolunteerById);

module.exports = router;

