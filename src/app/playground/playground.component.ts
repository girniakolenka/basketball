import { Component, OnInit } from '@angular/core';
import { RandomPositionsService } from './shared/random-positions.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {
  public randomStyles;

  constructor(private randomPositionService: RandomPositionsService) { }

  ngOnInit(): void {
    this._createRandomStyles();
  }

  _getStyles(position) {
    const [randomColumn, randomRow] = position;

    return {
      'grid-column': `${randomColumn} / span 1`,
      'grid-row': `${randomRow} / span 1`
    };
  }

  _createRandomStyles() {
    const {
      ballPosition,
      basketPosition,
      barriersPositions
    } = this.randomPositionService;

    this.randomStyles = {
      ball: this._getStyles(ballPosition),
      basket: this._getStyles(basketPosition),
      barriers: barriersPositions.map((barrier) => this._getStyles(barrier))
    };
  }
}
