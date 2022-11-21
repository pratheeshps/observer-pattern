import React, { useEffect, useState } from "react";
import notificationObserver from "./NotificationObserver";

function NotificationCenter() {
  const [notifications, setNotifications] = useState(
    notificationObserver.notifications
  );

  const handleNCSubscription = (message) => {
    if (message) {
      setNotifications((prev) => {
        return [message, ...prev];
      });
    }
  };

  const handleMarkAsRead = (id) => {
    setNotifications((prev) => {
      return prev.map((notification) => {
        if (notification.id === id) {
          return {
            ...notification,
            read: true
          };
        }
        return notification;
      });
    });
    notificationObserver.markRead(id);
  };

  useEffect(() => {
    notificationObserver.subscribe(handleNCSubscription);
    return () => {
      notificationObserver.unsubscribe(handleNCSubscription);
    };
  }, []);

  function getClassFromStatus(status) {
    let statusMap = {
      error: "error",
      info: "info",
      warning: "warning"
    };
    return statusMap[status];
  }

  return (
    <div className="noti-center-container">
      <header>Notifications</header>

      {notifications.length ? (
        <ul>
          <div className="title">Most Recent</div>
          {notifications.map(
            ({ id, message, status, description, date, read }) => (
              <li key={id} onClick={() => handleMarkAsRead(id)}>
                {!read && <div className="read"></div>}
                <div className="icon">
                  <span className={getClassFromStatus(status)}>!</span>
                </div>
                <div className="details">
                  <div className="info">
                    <b className="message">{message}</b>
                    <div className="date">
                      {new Date(date).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="desc ellipse two-lines" title={description}>
                    {description}
                  </p>
                </div>
              </li>
            )
          )}
        </ul>
      ) : (
        <div className="empty-noti">No Notifications Right Now!</div>
      )}
    </div>
  );
}

export default NotificationCenter;
