import { Component } from '@angular/core';
import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-code-generator',
  templateUrl: './code-generator.component.html',
  styleUrls: ['./code-generator.component.scss'],
})
export class CodeGeneratorComponent {
  commands = [
    {id: '1', name: 'Up'},
    {id: '2', name: 'Down'},
    {id: '3', name: 'Left'},
    {id: '4', name: 'Right'},
    {id: '5', name: 'Get'},
    {id: '5', name: 'Put'}
  ];

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
    console.log(this.consoleCommands);
  }
}
