import {Component, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import { AnimationPlayer } from '@angular/animations';
import { AnimationService } from './animation.service';
import {Subscription} from 'rxjs';
import {CommandsService} from '../../shared/commands.service';

@Component({
  selector: 'app-ball',
  templateUrl: './ball.component.html',
  styleUrls: ['./ball.component.scss']
})
export class BallComponent implements OnDestroy {
  @ViewChild('ballElement') ballElement: ElementRef;
  private player: AnimationPlayer;
  public subscription: Subscription;

  constructor(private animationService: AnimationService, private commandsService: CommandsService ) {
    this.subscription = commandsService.commandsAnnounced$.subscribe(() => {
      this._start();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
