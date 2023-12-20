const express = require('express');
const router = express.Router();

const { createUser } = require('../extentions/auth0Provider')

// /api

router.post('', async (req, res) => {
  await createUser(payload);
  res.send({data: payload});
})

module.exports = router;