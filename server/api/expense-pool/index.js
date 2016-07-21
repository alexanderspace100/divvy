import express from 'express';
import controller from './expense-pool.controller';
import expenseRouter from './expense';
import { isAuthenticated } from '../../auth/auth.service';

const router = express.Router();

// POST => add a new pool
router.post('/', isAuthenticated(), controller.addPool);

// ------------ Routes above have updated controllers ----------------

// GET => show all pools
// Added for testing only
router.get('/test', controller.getPools);

// POST => Add user to pool
router.post('/:id/users/:userId', controller.addUserToPool);

// Express router captures implied filepath
// '/:id' below is '/api/expense-pools/:id'

// GET => get a specific pool
router.get('/:id', controller.getPool);
// POST => update a specific pool
router.post('/:id', controller.updatePool);

router.use('/:id/expenses', expenseRouter);

export default router;