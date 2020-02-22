import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandsService {
  private commands = [];

  getCommands() {
    return this.commands;
  }

  setCommands(newCommands) {
    const len = this.commands.length;

    this.commands.splice(0, len, ...newCommands);
  }
}
