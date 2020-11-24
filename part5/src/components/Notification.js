import React from "react";

const Notification = ({ message }) => {
    if (message === null) {
        return null;
    }
    if (message.includes("Success")) {
        return <div className="success">{message}</div>;
    }
    if (message.includes("Info")) {
        return <div className="info">{message}</div>;
    } else {
        return <div>{message}</div>;
    }
};
export default Notification;
