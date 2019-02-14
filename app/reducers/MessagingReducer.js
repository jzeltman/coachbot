import * as Constants from '../constants/Conversation';

const initialState = {
    connected: false,
    isConnecting: false,
    isTyping: false,
    connectionUrl: 'http://5ca78708.ngrok.io',
    connectionType: 'socket',
    //connectionType: 'webhook',
}

const conversationReducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.SEND:
            //console.log('MessagingReducer Send Handler')
            return state;
            break; 

        case Constants.CONNECT:
            //console.log('Connect',state,action);
            return {
                ...state,
                isConnecting: true,
            };
            break; 

        case Constants.CONNECTED:
            console.log('Connected',state,action);
            return {
                ...state,
                isConnecting: false,
                connected: true,
            };
            break; 

        case Constants.TYPING:
            console.log('Typing',state,action);
            return {
                ...state,
                isTyping: true,
                connected: true,
                isConnecting: false,
            };
            break; 

        case Constants.RECEIVE:
            console.log('Receive',state,action);
            return {
                ...state,
                isTyping: false,
            };
            break; 

        default:
            return state;
            break; 
    }
};

export default conversationReducer;