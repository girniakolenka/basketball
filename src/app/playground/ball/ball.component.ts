import { Component, ViewChild, ElementRef } from '@angular/core';
import { AnimationPlayer } from '@angular/animations';
import { AnimationService } from './animation.service';

@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss']
})
export class BallComponent {
  @ViewChild('ballElement') ballElement: ElementRef;
  private player: AnimationPlayer;

  constructor(private animationService: AnimationService ) { }

  start() {
    this.stop();
    this._createPlayer();
    this.player.play();
  }

  stop() {
    if (this.player) {
      this.player.destroy();
    }
  }

  _createPlayer() {
    const animationFactory = this.animationService.getAnimationFactory();
    this.player = animationFactory.create(this.ballElement.nativeElement);
  }
}
