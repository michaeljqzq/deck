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
      controllerAs: 'tagsSelectorCtrl',
      controller: 'TagsSelectorCtrl',
    };
  })
  .controller('TagsSelectorCtrl', [
    '$scope',
    function($scope) {
      this.isValid = function() {
        if (!this.command.instanceTags) return false;
        let length = Object.keys(this.command.instanceTags).length;
        return length >= 0 && length <= 3;
      };
    },
  ]);
