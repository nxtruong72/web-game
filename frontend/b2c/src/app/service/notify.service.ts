import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  private _success: string = 'success';
  private _error: string = 'error';

  constructor(private _messageService: MessageService) {}

  success(message: string) {
    this.notify(this._success, message);
  }

  error(message: string) {
    this.notify(this._error, message);
  }

  private notify(status: string, message: string) {
    this._messageService.add({
      key: 'br',
      severity: status,
      summary: status[0].toUpperCase() + status.slice(1),
      detail: message,
    });
  }
}
