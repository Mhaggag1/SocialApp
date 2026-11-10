import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-notifications',
  imports: [DatePipe],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css',
})
export class NotificationsComponent implements OnInit {
  private readonly httpClient = inject(HttpClient);

  notifications: WritableSignal<any[]> = signal([]);
  unreadCount: WritableSignal<number> = signal(0);
  onlyUnread: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.loadNotifications();
    this.loadUnreadCount();
  }

  loadNotifications(): void {
    this.httpClient
      .get(
        `${environment['Base-Url']}/notifications?unread=${this.onlyUnread()}&page=1&limit=10`,
      )
      .subscribe({
        next: (res: any) => {
          const list = res?.data?.notifications || [];
          this.notifications.set(list);
        },
        error: (err) => console.log(err),
      });
  }

  loadUnreadCount(): void {
    this.httpClient.get(`${environment['Base-Url']}/notifications/unread-count`).subscribe({
      next: (res: any) => {
        this.unreadCount.set(res?.data?.unreadCount ?? res?.data?.count ?? 0);
      },
      error: (err) => console.log(err),
    });
  }

  setFilter(unread: boolean): void {
    this.onlyUnread.set(unread);
    this.loadNotifications();
  }

  markAsRead(notificationId: string): void {
    this.httpClient
      .patch(`${environment['Base-Url']}/notifications/${notificationId}/read`, {})
      .subscribe({
        next: () => {
          this.loadNotifications();
          this.loadUnreadCount();
        },
        error: (err) => console.log(err),
      });
  }

  markAllAsRead(): void {
    this.httpClient.patch(`${environment['Base-Url']}/notifications/read-all`, {}).subscribe({
      next: () => {
        this.loadNotifications();
        this.loadUnreadCount();
      },
      error: (err) => console.log(err),
    });
  }
}
