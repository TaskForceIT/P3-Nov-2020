function users(req, res) {
  if (req.method === 'GET') var users = pjs.query('Select * from Users');
  res.json(users);
}

exports.run = users;
