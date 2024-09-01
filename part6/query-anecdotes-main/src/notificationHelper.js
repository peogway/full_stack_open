export const setNoti = (notificationDispatch, notification, time) => {
  notificationDispatch({ type: "NEW_NOTI", payload: `${notification}` });
  setTimeout(() => {
    notificationDispatch({
      type: "NEW_NOTI",
      payload: ``,
    });
  }, time * 1000);
};
