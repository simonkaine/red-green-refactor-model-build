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

  it('Should findById a car', async() => {
    await Car.carCreate({ 
      make: 'Ford',
      model: 'Galaxy',
      year: 1959  });
    const res = await Car.getId({ id: '1' });

    expect(res).toEqual({
      id: '1',
      make: 'Ford',
      model: 'Galaxy',
      year: 1959
    });
  });

  it('Should find all cars', async() => {
    await Car.carCreate({ 
      make: 'Ford',
      model: 'Galaxy',
      year: 1959  });
    await Car.carCreate({ 
      make: 'Mercury',
      model: 'Monterey',
      year: 1965  });
    const res = await Car.getAllCars();

    expect(res).toEqual([
      { id: '1',
        make: 'Ford',
        model: 'Galaxy',
        year: 1959 }, 
      {
        id: '2',
        make: 'Mercury',
        model: 'Monterey',
        year: 1965
      }
    ]);
  });

  it('Should update car by id', async() => {
    await Car.carCreate({ 
      make: 'Ford',
      model: 'Galaxy',
      year: 1959  });
   
    const res = await Car.patch({ 
      id: '1', 
      make: 'KIA',
      model: 'Galaxy',
      year: 1959 
    });

    expect(res).toEqual(
      { id: '1',
        make: 'KIA',
        model: 'Galaxy',
        year: 1959 }, 
    );
  });

  afterAll(() => {
    return pool.end();
  });
});
