require('should');

import match from './match';
import functions from './functions';

describe('client', () => {
  let keyword = 'client';
  const clients = functions.filter(func => func.startsWith(keyword));
  const matches = match(keyword);
  it('should equal', () => {
    clients.should.eql(matches);
  });
});

describe('clienta', () => {
  const matches = match('clienta');
  it('should only "client-addr"', () => {
    matches.should.be.an.Array()
      .and.have.length(1)
      .and.containEql('client-addr');
  });
});

describe('add', () => {
  let keyword = 'add';
  const start = functions.filter(func => func.startsWith(keyword));
  const middle = functions.filter(func => func.indexOf(`-${keyword}`) !== -1);
  const matches = match(keyword);
  it('should equal', () => {
    matches.should.eql(start.concat(middle));
  });
});