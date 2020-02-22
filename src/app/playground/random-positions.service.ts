import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomPositionsService {
  private amount = 5;

  getPositions() {
    return this._shuffle(this._createMatrix());
  }

  _createMatrix() {
    const { amount } = this;
    const matrix = [];

    for (let i = 0; i < amount; i++) {
      for (let j = 0; j < amount; j++) {
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
