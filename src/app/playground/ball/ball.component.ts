import { Component, ViewChild, ElementRef } from '@angular/core';
import { keyframes, style, animate, AnimationBuilder, AnimationPlayer } from '@angular/animations';
import {CommandsService} from '../../shared/commands.service';

@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss']
})
export class BallComponent {
  @ViewChild('ballElement') ballElement: ElementRef;
  private player: AnimationPlayer;
  private commandsMap = {
    left: { x: -1, y: 0},
    right: { x: 1, y: 0},
    up: { x: 0, y: -1},
    down: { x: 0, y: 1},
  }

  constructor(private animationBuilder: AnimationBuilder, private commandsService: CommandsService ) { }

  private _createPlayer() {
    this.stop();
    const animationFactory = this.animationBuilder
        .build([
          animate(this._getDuration(), keyframes([
            this._styleTemplate(0, 0, 0, 0),
            ...this._generateKeyframes()
          ]))
        ]);
    this.player = animationFactory.create(this.ballElement.nativeElement);
  }

  _styleTemplate(x: number, y: number, degree: number, offset: number): any {
    const translateX = x === 0 ? 0 : `${x}00%`;
    const translateY = y === 0 ? 0 : `${y}00%`;

    return  style({ transform: `translateX(${translateX}) translateY(${translateY}) rotate(${degree}deg)`, offset });
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

  _getDuration(): string {
    const commands = this.commandsService.getCommands();
    const amount = commands.length;

    return `${amount}s`;
  }

  start() {
    this._createPlayer();
    this.player.play();
  }

  stop() {
    if (this.player) {
      this.player.destroy();
    }
  }
}
