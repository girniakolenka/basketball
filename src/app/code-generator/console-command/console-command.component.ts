import {Component, Input, Output, EventEmitter, Type} from '@angular/core';

@Component({
  selector: 'app-console-command',
  templateUrl: './console-command.component.html',
  styleUrls: ['./console-command.component.scss']
})
export class ConsoleCommandComponent {
  @Input() command: Type<{ name: string }>;
  @Input() index: number;
  @Output() deleted = new EventEmitter<number>();

  delete(): void {
    this.deleted.emit(this.index);
  }
}
