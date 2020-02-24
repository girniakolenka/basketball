import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = {
    win: {
      message: 'Congratulations! You have won!',
      cls: 'win'
    },
    fail: {
      message: 'Sorry you just lost :(',
      cls: 'fail'
    },
    borders: {
      message: 'Looks like you are trying to go out of the borders.',
      cls: 'info'
    },
    barriers: {
      message: 'Unfortunate, you can not climb on the tree',
      cls: 'info'
    },
    startAgain: {
      message: 'You should grab the ball first',
      cls: 'info'
    }
  };
  private notificationAnnouncedSource = new Subject<{message: string, cls: string}>();
  private delay: number;

  public notificationAnnounced$ = this.notificationAnnouncedSource.asObservable();

  setNotification(value, delay) {
    const notification = this.notifications[value];

    this.setDelay(delay);
    this.notificationAnnouncedSource.next(notification);
  }

  getDelay(): number {
    return this.delay;
  }

  setDelay(delay: number) {
   this.delay = delay * 1000;
  }
}
