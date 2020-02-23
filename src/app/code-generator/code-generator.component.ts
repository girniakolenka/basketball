import {Component, EventEmitter, Output} from '@angular/core';
import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommandsService } from '../shared/commands.service';

@Component({
  selector: 'app-code-generator',
  templateUrl: './code-generator.component.html',
  styleUrls: ['./code-generator.component.scss'],
})
export class CodeGeneratorComponent {
  @Output() started = new EventEmitter<number>();
  public defaultCommands = [];
  public consoleCommands = [];

  constructor(private commandsService: CommandsService) {
    this.defaultCommands = commandsService.getDefaultCommands();
    this.consoleCommands = commandsService.getCommands();
  }

  onDrop(event: CdkDragDrop<string[]>): void {
    const {
      previousContainer,
      container,
      currentIndex,
      previousIndex
    } = event;
    const previousData = previousContainer.data;
    const currentData = container.data;
    const isCurrentContainer = previousContainer === container;

    if (isCurrentContainer) {
      moveItemInArray(previousData, previousIndex, currentIndex);
    } else {
      copyArrayItem(previousData, currentData, previousIndex, currentIndex);
    }
  }

  onDelete(index: number): void {
    this.consoleCommands.splice(index, 1);
  }

  onStart(): void {
    this.commandsService.setCommands(this.consoleCommands);
    this.started.emit();
  }
}
