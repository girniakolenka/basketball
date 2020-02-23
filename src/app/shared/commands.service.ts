import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

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
    {id: 'get', name: 'Get'}
  ];
  private commandsAnnouncedSource = new Subject();
  public commandsAnnounced$ = this.commandsAnnouncedSource.asObservable();

  getDefaultCommands() {
    return this.defaultCommands;
  }

  getCommands() {
    return this.commands;
  }

  setCommands(newCommands) {
    const len = this.commands.length;

    this.commands.splice(0, len, ...newCommands);
    this.commandsAnnouncedSource.next();
  }
}
