import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-console-command',
  templateUrl: './console-command.component.html',
  styleUrls: ['./console-command.component.scss']
})
export class ConsoleCommandComponent {
  @Input() command;
  @Input() index;
  @Output() deleted = new EventEmitter<number>();

  delete(): void {
    this.deleted.emit(this.index);
  }
}
