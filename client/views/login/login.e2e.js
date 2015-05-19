'use strict';

describe('login route', function () {

  beforeEach(function () {
    browser.get('/login');
  });

  it('should have a basic content', function () {
    expect(element.all(by.css('div')).first().getText()).toBe('LoginCtrl');
  });

});
