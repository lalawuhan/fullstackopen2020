const initialState = {
    message: "",
};

export const createNotification = (message) => {
    return {
        type: "CREATE_NOTIFICATION",
        data: message,
    };
};

export const hideNotification = () => {
    return {
        type: "HIDE_NOTIFICATION",
    };
};

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_NOTIFICATION":
            return {
                ...state,
                message: action.data,
            };
        case "HIDE_NOTIFICATION":
            return {
                ...state,
                message: "",
            };
        default:
            return state;
    }
};

export default notificationReducer;
