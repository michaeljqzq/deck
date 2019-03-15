'use strict';

const angular = require('angular');

module.exports = angular
  .module('spinnaker.azure.serverGroup.configure.wizard.tags.directive', [])
  .directive('azureTagsSelector', function() {
    return {
      restrict: 'E',
      templateUrl: require('./tagsSelector.directive.html'),
      scope: {},
      bindToController: {
        command: '=',
      },
      controllerAs: 'vm',
      controller: angular.noop,
    };
  });
