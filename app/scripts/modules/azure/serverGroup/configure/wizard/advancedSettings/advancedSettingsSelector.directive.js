'use strict';

const angular = require('angular');

module.exports = angular
  .module('spinnaker.azure.serverGroup.configure.wizard.advancedSettings.selector.directive', [])
  .directive('azureServerGroupAdvancedSettingsSelector', function() {
    return {
      restrict: 'E',
      templateUrl: require('./advancedSettingsSelector.directive.html'),
      scope: {},
      bindToController: {
        command: '=',
      },
      controllerAs: 'adv',
      controller: 'azureServerGroupAdvancedSettingsSelectorCtrl',
    };
  })
  .controller('azureServerGroupAdvancedSettingsSelectorCtrl', function() {
    // zhiqing remove it later
    this.command.disks = [];
    setTimeout(() => {
      this.command.backingData.dataDiskTypes = ['Premium SSD', 'Standard SSD', 'Standard HDD'];
    }, 1000);

    this.setDisks = disks => {
      this.command.disks = disks;
    };

    this.addDataDisk = () => {
      this.command.disks.push({ type: 'Standard SSD', sizeGb: 10, lun: 2 });
    };

    this.removeDataDisk = index => {
      this.command.disks.splice(index, 1);
    };

    this.handleDataDiskChange = () => {};
  });
