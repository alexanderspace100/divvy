import { User } from '../../db';
import { handleError, handleNotFound } from '../../utils';

const controller = {};

controller.all = (req, res) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(handleError(res));
};

controller.get = (req, res) => {
  User.findById(req.params.id)
    .then(handleNotFound(res))
    .then(user => {
      if (user) {
        res.json(user);
      }
    })
    .catch(handleError(res));
};

controller.me = (req, res) => {
  res.json(req.user);
};

controller.myPools = (req, res) => {
  // TODO: Fix this atomic inclusion of all nested associations (be more specific).
  req.user.getExpensePools({ include: [{ all: true, nested: true }] })
    .then(expensePools => res.json(expensePools))
    .catch(handleError(res));
};

export default controller;
