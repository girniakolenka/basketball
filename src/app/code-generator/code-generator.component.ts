import { Component } from '@angular/core';
import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import {CommandsService} from '../shared/commands.service';

@Component({
  selector: 'app-code-generator',
  templateUrl: './code-generator.component.html',
  styleUrls: ['./code-generator.component.scss'],
})
export class CodeGeneratorComponent {
  private commands = [
    {id: 'up', name: 'Up'},
    {id: 'down', name: 'Down'},
    {id: 'left', name: 'Left'},
    {id: 'right', name: 'Right'},
    {id: 'get', name: 'Get'},
    {id: 'put', name: 'Put'}
  ];

  constructor(private commandsService: CommandsService) { }
  consoleCommands = [];

  onDrop(event: CdkDragDrop<string[]>) {
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

  delete(index) {
    this.consoleCommands.splice(index, 1);
  }

  start() {
    this.commandsService.setCommands(this.consoleCommands);
  }
}
