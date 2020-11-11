function query(req, res) {
  var orders = pjs.query('select * from gueney/users');
  res.json(orders);
}

exports.run = query;
