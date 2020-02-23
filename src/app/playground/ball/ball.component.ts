import {Component, ViewChild, ElementRef, OnChanges, SimpleChanges, Input} from '@angular/core';
import { AnimationPlayer } from '@angular/animations';
import { AnimationService } from './animation.service';

@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss']
})
export class BallComponent implements OnChanges {
  @Input() updatePlaying: boolean;
  @ViewChild('ballElement') ballElement: ElementRef;
  private player: AnimationPlayer;

  constructor(private animationService: AnimationService ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.updatePlaying.firstChange) {
      this._start();
    }
  }

  _start() {
    this._stop();
    this._createPlayer();
    this.player.play();
  }

  _stop() {
    if (this.player) {
      this.player.destroy();
    }
  }

  _createPlayer() {
    const animationFactory = this.animationService.getAnimationFactory();
    this.player = animationFactory.create(this.ballElement.nativeElement);
  }
}
