import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {
  private defaultCommands = [
    {id: 'up', name: 'Up'},
    {id: 'down', name: 'Down'},
    {id: 'left', name: 'Left'},
    {id: 'right', name: 'Right'},
    {id: 'get', name: 'Get'},
    {id: 'put', name: 'Put'}
  ];

  private commands = [
    {id: 'put', name: 'Put'}
  ];

  getDefaultCommands() {
    return this.defaultCommands;
  }

  getCommands() {
    return this.commands;
  }

  setCommands(newCommands) {
    const len = this.commands.length;

    this.commands.splice(0, len, ...newCommands);
  }
}
