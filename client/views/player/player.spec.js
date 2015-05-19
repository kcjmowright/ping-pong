'use strict';

describe('Controller: PlayerCtrl', function () {

  beforeEach(module('pingpong'));

  var PlayerCtrl;

  beforeEach(inject(function ($controller) {
    PlayerCtrl = $controller('PlayerCtrl', {});
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
