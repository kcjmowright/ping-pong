'use strict';

describe('player route', function () {

  beforeEach(function () {
    browser.get('/player');
  });

  it('should have a basic content', function () {
    expect(element.all(by.css('div')).first().getText()).toBe('PlayerCtrl');
  });

});
