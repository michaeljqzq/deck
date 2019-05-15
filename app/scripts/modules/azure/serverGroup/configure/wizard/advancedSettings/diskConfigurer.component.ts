import { module, IComponentOptions, IComponentController } from 'angular';

interface IAzureDisk {
  type: string;
  sizeGb: number;
  lun: number;
}

class AzureDiskConfigurerController implements IComponentController {
  public dataDisks: IAzureDisk[];

  // From component bindings.
  public command: any;
  public disks: IAzureDisk[];
  private updateDisks: (arg: { disks: IAzureDisk[] }) => void;

  public $onInit(): void {}

  public $onChanges(): void {
    this.$onInit();
  }

  public handleDataDiskChange(): void {
    let disks = this.dataDisks.concat(this.getLocalSSDDisks());
    this.updateDisks({ disks });
  }

  public addDataDisk(): void {
    this.dataDisks = this.dataDisks.concat([{ type: 'Standard SSD', sizeGb: 10, lun: 1 }]);
    this.handleDataDiskChange();
  }

  public removeDataDisk(index: number): void {
    this.dataDisks.splice(index, 1);
    this.handleDataDiskChange();
  }

  private getLocalSSDDisks(): IAzureDisk[] {
    return (this.command.disks || []).filter((disk: IAzureDisk) => disk.type === 'local-ssd');
  }
}

const azureDiskConfigurer: IComponentOptions = {
  controller: AzureDiskConfigurerController,
  bindings: { command: '<', disks: '<', updateDisks: '&' },
  template: `
    <ng-form name="diskConfigurer">
      <div class="form-group">
        <div class="sm-label-left" style="margin-bottom: 5px;">Data Disks

        </div>
        <table class="table table-condensed packed tags">
          <thead>
            <tr>
              <th>LUN</th>
              <th>Size (GB)</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr ng-repeat="disk in $ctrl.dataDisks">
              <td>
                <input type="number"
                  class="form-control input-sm"
                  ng-model="disk.lun"
                  ng-change="$ctrl.handleDataDiskChange()"
                  required/>
              </td>
              <td>
                <input type="number"
                       class="form-control input-sm"
                       ng-model="disk.sizeGb"
                       ng-change="$ctrl.handleDataDiskChange()"
                       required
                       min="10"/>
              </td>

              <td>
                <ui-select ng-model="disk.type" class="form-control input-sm" on-select="$ctrl.handleDataDiskChange()" required>
                <ui-select-match placeholder="Select...">{{$select.selected}}</ui-select-match>
                <ui-select-choices repeat="dataDiskType in $ctrl.command.backingData.dataDiskTypes">
                  <span ng-bind-html="dataDiskType"></span>
                </ui-select-choices>
                </ui-select>
              </td>
              <td>
                <a class="btn btn-link sm-label" style="margin-top: 0;" ng-click="$ctrl.removeDataDisk($index)">
                  <span class="glyphicon glyphicon-trash"></span>
                </a>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4">
                <button class="btn btn-block btn-sm add-new" ng-click="$ctrl.addDataDisk()">
                  <span class="glyphicon glyphicon-plus-sign"></span> Add New Data Disk
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </ng-form>`,
};

export const AZURE_DISK_CONFIGURER = 'spinnaker.azure.diskConfigurer.component';
module(AZURE_DISK_CONFIGURER, []).component('azureDiskConfigurer', azureDiskConfigurer);
