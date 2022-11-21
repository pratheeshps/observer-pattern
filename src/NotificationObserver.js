class NotificationObserver {
  constructor() {
    this.observers = [];
    this.notifications = [];
  }

  subscribe(func) {
    this.observers.push(func);
  }

  unsubscribe(func) {
    this.observers = this.observers.filter((subsciber) => subsciber !== func);
  }

  getUnreadCount() {
    return this.notifications.filter((notification) => !notification.read)
      .length;
  }

  notify(message) {
    const unreadCount = this.getUnreadCount() + 1;
    this.observers.forEach((observer) => observer(message, unreadCount));
    this.notifications.unshift(message);
  }

  markRead(id) {
    this.notifications = this.notifications.map((notification) => {
      if (notification.id === id) {
        return {
          ...notification,
          read: true
        };
      }
      return notification;
    });
    const unreadCount = this.getUnreadCount();
    this.observers.forEach((observer) => observer(null, unreadCount));
  }
}

export default new NotificationObserver();
