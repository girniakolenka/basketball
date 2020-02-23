import { Injectable } from '@angular/core';
import {animate, AnimationBuilder, AnimationFactory, keyframes, style} from '@angular/animations';
import { CommandsService } from '../../shared/commands.service';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private commandsMap = {
    left: { x: -1, y: 0},
    right: { x: 1, y: 0},
    up: { x: 0, y: -1},
    down: { x: 0, y: 1},
  };

  constructor(
    private animationBuilder: AnimationBuilder,
    private commandsService: CommandsService
  ) {}

  getAnimationFactory(): AnimationFactory {
    return this.animationBuilder.build([
        animate(
          this._getDuration(), keyframes([
            this._styleTemplate(0, 0, 0, 0),
            ...this._generateKeyframes()
        ]))
      ]);
  }

  _getDuration(): string {
    const commands = this.commandsService.getCommands();
    const amount = commands.length;

    return `${amount}s`;
  }

  _generateKeyframes(): Array<any> {
    const commands = this.commandsService.getCommands();
    const len = commands.length;
    const offsetX = 3;
    const offsetY = 3;
    let x = 0;
    let y = 0;

    return commands.map((command, index) => {
      const degree = index % 2 === 0 ? 360 : 0;
      const offset = (index + 1) / len;
      x = x + this.commandsMap[command.id].x;
      y = y + this.commandsMap[command.id].y;

      console.log(x + offsetX, y + offsetY);

      return this._styleTemplate(x, y, degree, offset);
    });
  }

  _styleTemplate(x: number, y: number, degree: number, offset: number): any {
    const translateX = x === 0 ? 0 : `${x}00%`;
    const translateY = y === 0 ? 0 : `${y}00%`;

    return  style({ transform: `translateX(${translateX}) translateY(${translateY}) rotate(${degree}deg)`, offset });
  }
}
