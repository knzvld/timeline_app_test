import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-drop-down-list',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.scss'],
})
export class DropDownListComponent {
  @Input() data!: IDropDown;
  @Input() disabled!: boolean;
  @Output() emitValue = new EventEmitter<any>();

  isShown = false;
  toggleList() {
    if(this.disabled) return;
    this.isShown = !this.isShown;
  }
  setValue(value: any) {
    this.data.default = value;
    this.emitValue.emit(value);
  }
}

export interface IDropDown {
  default: string | number;
  values: any[];
}
