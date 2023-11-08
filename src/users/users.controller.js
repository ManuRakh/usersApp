const express = require('express');
const router = express.Router();
const userService = require('./users.service'); // Подключаем сервис

/**
 * @swagger
 * /api/users/balance:
 *   post:
 *     description: Update user balance
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User ID and amount to update balance
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: integer
 *             amount:
 *               type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               amount:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Balance updated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

router.post('/balance', async (req, res) => {
  try {
    console.log(req.body)
    const { userId, amount } = req.body;

    const result = await userService.updateBalance(userId, amount);

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Get user balance by username
 *     parameters:
 *       - in: query
 *         name: userId
 *         description: The username to retrieve for
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User balance retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */


router.get('/', async (req, res) => {
    try {
      console.log(req.body)
      const { userId } = req.query;
  
      const result = await userService.getUserInfo(userId);
  
      return res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

/**
 * @swagger
 * /api/users/healthCheck:
 *   get:
 *     description: Checks if users routes are connected to a swagger
 *     responses:
 *       200:
 *         description: Successful response
 */

router.get('/healthCheck', async (req, res) => res.json({ message: 'That works!' }))

module.exports = router;
