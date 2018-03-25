require('should');
import {shuffle} from 'lodash';
import uniqueURLs from './url';

describe('uniqueURLs', () => {
  describe('1 item', () => {
    let before = ['a.com'];
    let after = uniqueURLs(before);
    it('should equal', () => {
      before.should.eql(after);
    });
  });

  describe('2 items', () => {
    let before = ['a.com', 'b.com'];
    let after = uniqueURLs(before);
    it('should equal', () => {
      before.should.eql(after);
    });
  });

  describe('2 items with wildcard', () => {
    let before = ['a.com', '*.a.com'];
    let after = uniqueURLs(before);
    let expected = ['*.a.com'];
    it('should equal', () => {
      after.should.eql(expected);
    });
  });

  describe('2 items with wildcard but not include', () => {
    let before = ['a.com', '*.b.com'];
    let after = uniqueURLs(before);
    it('should equal', () => {
      after.should.eql(before);
    });
  });

  describe('more items', () => {
    let before = ['a.com', 'b.a.com', '*.a.com', 'b.com', 'c.b.com'];
    let after = uniqueURLs(before);
    let expect = ['*.a.com', 'b.com', 'c.b.com'];
    it('should equal', () => {
      after.should.eql(expect);
    });
  });

  describe('sequence', () => {
    let before = [
      'meathill.me',
      'a.com',
      'a.b.com',
      'a.io',
      '*.a.b.com',
      'b.com',
      '0.cn',
    ];
    let after = uniqueURLs(shuffle(before));
    let expect = [
      'a.com',
      'b.com',
      '*.a.b.com',
      '0.cn',
      'a.io',
      'meathill.me',
    ];
    it('should equal', () => {
      after.should.eql(expect);
    });
  });
});