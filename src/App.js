import NotificationCenter from "./NotificationCenter";
import "./styles.css";
import notificationObserver from "./NotificationObserver";
import { useState, useEffect } from "react";

export default function App() {
  const [showNotification, setShowNotification] = useState(false);
  const [unReadCount, setUnReadCount] = useState(
    notificationObserver.getUnreadCount()
  );

  const handleAddNotification = (type) => {
    const id = `${+new Date()}` + Math.floor(Math.random() * 10000);

    const obj = {
      error: {
        id,
        message: "License expired",
        description: `Please Contact AppviewX support for license renewal.`,
        status: "error",
        read: false,
        date: +new Date(),
      },
      info: {
        id,
        message: "Limit exceeded",
        description: `CERT+ certificates limit has been exceeded. Please contact AppViewX support for license renewal.`,
        status: "info",
        read: false,
        date: +new Date(),
      },
      warning: {
        id,
        message: "Limit reaching soon",
        description: `CERT+ certificates limit will exceed soon. Please contact AppViewX support for license renewal.`,
        status: "warning",
        read: false,
        date: +new Date(),
      },
    };

    const message = obj[type];
    notificationObserver.notify(message);
  };

  const toggleNotification = () => {
    setShowNotification((prev) => !prev);
  };

  const handleSubscription = (message, count) => {
    setUnReadCount(count);
  };

  useEffect(() => {
    setUnReadCount(notificationObserver.getUnreadCount());
  }, [showNotification]);

  useEffect(() => {
    notificationObserver.subscribe(handleSubscription);
    return () => {
      notificationObserver.unsubscribe(handleSubscription);
    };
  }, []);

  return (
    <>
      <button onClick={toggleNotification}>
        {showNotification ? "Hide notification" : "Show notification"}
        {unReadCount ? ` : ${unReadCount}` : ""}
      </button>
      <div className="App">{showNotification && <NotificationCenter />}</div>
      <button onClick={() => handleAddNotification("error")}>
        Add Error Notification
      </button>

      <button onClick={() => handleAddNotification("warning")}>
        Add Warning Notification
      </button>
      <button onClick={() => handleAddNotification("info")}>
        Add Info Notification
      </button>
    </>
  );
}
