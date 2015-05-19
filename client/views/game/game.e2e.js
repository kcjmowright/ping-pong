'use strict';

describe('game route', function () {

  beforeEach(function () {
    browser.get('/game');
  });

  it('should have a basic content', function () {
    expect(element.all(by.css('div')).first().getText()).toBe('GameCtrl');
  });

});
