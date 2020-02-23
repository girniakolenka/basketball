import {Component, OnDestroy } from '@angular/core';
import { NotificationService } from '../shared/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnDestroy {
  public message = 'Drag and drop list of available commands to start playing, wish you good luck!';
  public cls = 'default';
  public subscription: Subscription;
  private timeout;

  constructor(private notificationService: NotificationService) {
    this.subscription = notificationService.notificationAnnounced$.subscribe(this._subscribeToNotification.bind(this));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    clearTimeout(this.timeout);
  }

  _subscribeToNotification({ message, cls }) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.message = message;
      this.cls = cls;
    }, this.notificationService.getDelay());
  }
}
