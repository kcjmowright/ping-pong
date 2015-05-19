'use strict';

describe('Controller: GameCtrl', function () {

  beforeEach(module('pingpong'));

  var GameCtrl;

  beforeEach(inject(function ($controller) {
    GameCtrl = $controller('GameCtrl', {});
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
