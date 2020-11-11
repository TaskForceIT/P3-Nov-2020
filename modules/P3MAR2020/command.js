function command(req, res) {
  let jobs = pjs.runCommand('CHKOBJ OBJ(RAMUS/FIBO) OBJTYPE(*PGM)');
  res.json({ jobs });
}

exports.run = command;
