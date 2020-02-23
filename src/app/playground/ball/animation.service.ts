import { Injectable } from '@angular/core';
import {animate, AnimationBuilder, AnimationFactory, keyframes, style} from '@angular/animations';
import { CommandsService } from '../../shared/commands.service';
import { RandomPositionsService } from '../shared/random-positions.service';

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
  private boundaries: Array<number>;

  constructor(
    private animationBuilder: AnimationBuilder,
    private commandsService: CommandsService,
    private randomPositionService: RandomPositionsService
  ) {}

  getAnimationFactory(): AnimationFactory {
    return this.animationBuilder.build([
        animate(
          this._getDuration(), keyframes([
            this._styleTemplate({x: 0, y: 0, degree: 0, offset: 0}),
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
    const [offsetX, offsetY] = this.randomPositionService.ballPosition;
    let x = 0;
    let y = 0;

    return commands.map((command, index) => {
      const degree = this._generateDegree(index);
      const offset = this._generateOffset(index, len);
      const commandXY = this.commandsMap[command.id];

      x = x + commandXY.x;
      y = y + commandXY.y;

      console.log(x + offsetX, y + offsetY);

      return this._styleTemplate({x, y, degree, offset});
    });
  }

  _generateDegree(index: number): number {
    return index % 2 === 0 ? 360 : 0;
  }

  _generateOffset(index: number, len: number): number {
    return (index + 1) / len;
  }

  _styleTemplate({x, y, degree, offset}) {
    const translateX = x === 0 ? 0 : `${x}00%`;
    const translateY = y === 0 ? 0 : `${y}00%`;

    return  style({ transform: `translateX(${translateX}) translateY(${translateY}) rotate(${degree}deg)`, offset });
  }
}
