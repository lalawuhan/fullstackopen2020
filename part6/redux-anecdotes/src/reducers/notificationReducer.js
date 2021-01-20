const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_NOTIFICATION":
            return {
                ...state,
                message: action.data,
            };
        case "Restart":
            return {
                ...state,
                message: null
            }
        default:
            return state;
    }
};
const initialState = {
    message: "",
};

let timeoutID;

export const createNotification = (message, time) => {
    return async dispatch => {
        dispatch({
            type: "CREATE_NOTIFICATION",
            data: message,
        })
        if (timeoutID) {
            clearTimeout(timeoutID)
        }
        timeoutID = setTimeout(() => {
            dispatch({
                type: 'Restart'
            })
        }, time * 1000)
    }
}

export const hideNotification = () => {
    return {
        type: "HIDE_NOTIFICATION",
    };
};



export default notificationReducer;
