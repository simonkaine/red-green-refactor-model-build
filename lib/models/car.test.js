const fs = require('fs');
const pool = require('../utils/pool');
const Car = require('./car');

describe('Car model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync(__dirname + '/../../sql/setup.sql', 'utf-8'));
  });

  it('Should insert a car', async() => {
    const res = await Car.carCreate({ 
      make: 'Ford',
      model: 'Galaxy',
      year: 1959  });

    expect(res).toEqual({
      id: expect.any(String),
      make: 'Ford',
      model: 'Galaxy',
      year: 1959
    });
  });

  afterAll(() => {
    return pool.end();
  });
});
