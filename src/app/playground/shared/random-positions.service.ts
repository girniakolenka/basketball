import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomPositionsService {
  private barriersAmount = 2;
  public start = 1;
  public amount = 5;
  public ballPosition: Array<number>;
  public basketPosition: Array<number>;
  public barriersPositions: Array<Array<number>>;

  constructor() {
    const randomMatrix = this._getRandomMatrix();

    this.barriersPositions = randomMatrix.splice(0, this.barriersAmount);
    [this.ballPosition, this.basketPosition] = randomMatrix;
  }

  _getRandomMatrix() {
    return this._shuffle(this._createMatrix());
  }

  _createMatrix() {
    const { start, amount } = this;
    const matrix = [];

    for (let i = start; i <= amount; i++) {
      for (let j = start; j <= amount; j++) {
        matrix.push([i, j]);
      }
    }

    return matrix;
  }

  /**
   * Shuffles array in place.
   */
  _shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    return arr;
  }
}
