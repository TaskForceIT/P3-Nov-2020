function program(req, res) {
  let ausgaben = [];
  for (i = 1; i < 10; i++) {
    pjs.define('eingabe', {
      type: 'packed decimal',
      length: 5,
      decimals: 0,
      initValue: i,
    });
    pjs.define('ausgabe', {
      type: 'packed decimal',
      length: 20,
      decimals: 0,
    });
    pjs.call('FIBO', eingabe, ausgabe);
    ausgaben.push(ausgabe);
  }
  res.json(ausgaben);
}

exports.run = program;
