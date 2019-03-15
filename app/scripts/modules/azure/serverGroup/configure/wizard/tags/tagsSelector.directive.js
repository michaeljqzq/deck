'use strict';

const angular = require('angular');

const TAG_LIMITATION = 3;
const TAG_KEY_LENGTH_LIMITATION = 5;
const TAG_VALUE_LENGTH_LIMITATION = 6;
const TAG_INVALID_CHAR_REG_EXR = /[<>%&\\?\/]/g;

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
    function() {
      this.getErrorMessage = function() {
        if (!this.command.instanceTags) return 'instanceTags is not defined';
        let length = Object.keys(this.command.instanceTags).length;
        if (!(length >= 0 && length <= TAG_LIMITATION)) return `Number of tags exceeds the limit: ${TAG_LIMITATION}`;
        for (let [k, v] of this.command.instanceTags) {
          if (k.length > TAG_KEY_LENGTH_LIMITATION)
            return `Length of Tag key: ${k} exceeds the limit: ${TAG_KEY_LENGTH_LIMITATION}`;
          if (v.length > TAG_VALUE_LENGTH_LIMITATION)
            return `Length of Tag value: ${v} exceeds the limit: ${TAG_VALUE_LENGTH_LIMITATION}`;
          if (TAG_INVALID_CHAR_REG_EXR.test(k)) return `Invalid characters in Tag key: ${k}`;
          if (TAG_INVALID_CHAR_REG_EXR.test(v)) return `Invalid characters in Tag value: ${v}`;
        }
        return null;
      };
    },
  ]);
