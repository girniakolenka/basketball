import { Injectable } from '@angular/core';
import {animate, AnimationBuilder, AnimationFactory, keyframes, style} from '@angular/animations';
import { CommandsService } from '../../shared/commands.service';
import { RandomPositionsService } from '../shared/random-positions.service';
import {NotificationService} from '../../shared/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private commandsMap = {
    left: { x: -1, y: 0},
    right: { x: 1, y: 0},
    up: { x: 0, y: -1},
    down: { x: 0, y: 1},
    get: { x: 0, y: 0},
    put: { x: 0, y: 0}
  };
  private x = 0;
  private y = 0;

  constructor(
    private animationBuilder: AnimationBuilder,
    private commandsService: CommandsService,
    private randomPositionService: RandomPositionsService,
    private notificationService: NotificationService
  ) {}

  getAnimationFactory(): AnimationFactory {
    const steps = [
      this._styleTemplate({degree: 0, offset: 0}),
      ...this._generateKeyframes()
    ];
    const len = steps.length;

    return this.animationBuilder.build([
      animate(this._getDuration(len), keyframes(steps))
    ]);
  }

  _getDuration(amount): string {
    return `${amount}s`;
  }

  _generateKeyframes(): Array<any> {
    const commands = this.commandsService.getCommands();
    const len = commands.length;
    const keyframesArr = [];

    this.notificationService.setDelay(len);

    if (this._isFirstGetStage(commands)) {
      for (let i = 1; i < len; i++) {
        const command = commands[i];
        const { id } = command;

        this._setNewCoordinates(id);
        if (this._isBarriers() || this._isOutBoundaries()) {
          break;
        }
        if (this._isPutStage(id)) {
          this._setWinLoseNotification();
          break;
        }
        keyframesArr.push(this._createNewKeyframes(i, len));
      }
    } else {
      this.notificationService.setNotification('startAgain');
    }
    this._setWinLoseNotification();

    return keyframesArr;
  }

  _isPutStage(id) {
    return id === 'put';
  }

  _isFirstGetStage(commands) {
    const [firstCommand] = commands;
    const { id } = firstCommand;

    return id === 'get';
  }

  _setWinLoseNotification() {
    if (this._isWinner()) {
      this.notificationService.setNotification('win');
    } else {
      this.notificationService.setNotification('fail');
    }
  }

  _createNewKeyframes(index, len) {
    const degree = this._generateDegree(index);
    const offset = this._generateOffset(index, len);

    return this._styleTemplate({degree, offset});
  }

  _setNewCoordinates(id) {
    const commandXY = this.commandsMap[id];
    this.x = this.x + commandXY.x;
    this.y = this.y + commandXY.y;
  }

  _isBarriers(): boolean {
    const [x, y] = this._getOriginBallCoordinates();
    const { barriersPositions } = this.randomPositionService;
    const coordinates = [x, y];
    const isBarriers = barriersPositions.some((barrier) => this._isSameCoordinates(barrier, coordinates));

    if (isBarriers) {
      this.notificationService.setNotification('barriers');
    }

    return isBarriers;
  }

  _isOutBoundaries(): boolean {
    const [x, y] = this._getOriginBallCoordinates();
    const isOutBoundaries = !this._isInRange(x, y);

    if (isOutBoundaries) {
      this.notificationService.setNotification('borders');
    }

    return isOutBoundaries;
  }

  _getOriginBallCoordinates() {
    const [offsetX, offsetY] = this.randomPositionService.ballPosition;
    const originX = this.x + offsetX;
    const originY = this.y + offsetY;

    return [originX, originY];
  }

  _isWinner() {
    const { basketPosition } = this.randomPositionService;

    return this._isSameCoordinates(basketPosition, this._getOriginBallCoordinates());
  }

  _isSameCoordinates(coordinatesA: Array<number>, coordinatesB: Array<number>): boolean {
    const [coordAX, coordAY] = coordinatesA;
    const [coordBX, coordBY] = coordinatesB;

    return coordAX === coordBX && coordAY === coordBY;
  }

  _isInRange(x: number, y: number) {
    const {
      start,
      amount
    } = this.randomPositionService;
    const isInRangeX = x <= amount && x >= start;
    const isInRangeY = y <= amount && y >= start;

    return isInRangeX && isInRangeY;
  }

  _generateDegree(index: number): number {
    return index % 2 === 0 ? 0 : 360;
  }

  _generateOffset(index: number, len: number): number {
    return index / (len - 1);
  }

  _styleTemplate({degree, offset}) {
    const translateX = this.x === 0 ? 0 : `${this.x}00%`;
    const translateY = this.y === 0 ? 0 : `${this.y}00%`;

    return  style({ transform: `translateX(${translateX}) translateY(${translateY}) rotate(${degree}deg)`, offset });
  }
}
