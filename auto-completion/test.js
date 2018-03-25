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
      .and.eql(['client-addr']);
  });
});

describe('add', () => {
  let keyword = 'add';
  const start = functions.filter(func => func.startsWith(keyword));
  let middle = functions.filter(func => func.indexOf(`-${keyword}`) !== -1);
  middle.push(middle.shift());
  middle.reverse();
  const matches = match(keyword);
  it('should equal', () => {
    matches.should.eql(start.concat(middle));
  });
});