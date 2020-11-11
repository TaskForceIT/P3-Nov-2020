function user(req, res) {
  // process.env['PJS_SQL_DEBUG'] = '1';
  pjs.setConnectAttr(SQL_ATTR_COMMIT, SQL_TXN_NO_COMMIT);

  if (req.params.id) {
    try {
      switch (req.method) {
        case 'GET':
          var user = pjs.query('SELECT * FROM Users WHERE id = ?', [
            req.params.id,
          ]);
          res.json(user);
          break;
        case 'PUT':
          const fieldsToUpdate = {};
          fieldsToUpdate.vorname = req.body.vorname;
          fieldsToUpdate.nachname = req.body.nachname;
          fieldsToUpdate.email = req.body.email;
          pjs.query('UPDATE Users SET ? WHERE id = ?', [
            fieldsToUpdate,
            req.params.id,
          ]);
          res.sendStatus(204);
          break;
        case 'POST':
          if (!req.body.vorname || !req.body.nachname || !req.body.email)
            res.sendStatus(400);
          else {
            var maxId = pjs.query('SELECT MAX(id) FROM Users')[0];
            for (let element in maxId) {
              id = maxId[element];
            }
            id++;
            // if (req.params.id > id)
            id = req.params.id;
            pjs.query(
              'INSERT INTO Users (id, vorname, nachname, email) values ( ?, ?, ?, ?)',
              [id, req.body.vorname, req.body.nachname, req.body.email]
            );
            res.sendStatus(201);
          }
          break;
        case 'DELETE':
          pjs.query('DELETE FROM Users WHERE id = ?', [req.params.id]);
          res.sendStatus(204);
          break;
        default:
          res.sendStatus(400);
          break;
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  }
}

exports.run = user;
