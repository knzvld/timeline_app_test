import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-drop-down-list',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.scss'],
})
export class DropDownListComponent {
  @Input() data!: IDropDown;

  isShown = false;
  toggleList() {
    this.isShown = !this.isShown;
  }
  setValue(value:string| number) {
   this.data.default = value;
  }
}

export interface IDropDown {
  default: string | number;
  values: any[];
}
