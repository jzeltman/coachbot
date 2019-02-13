import * as ConversationConstants from '../constants/Conversation';

const initialState = [
    {
        _id: '12039715',
        avatar: 'URLString',
        messages: [
            {
                _id: '129038410234',
                timestamp: 'Date.now()', 
                text: 'botkit messages',
                user: 'Botkit' 
            },
            {
                _id: '129837501928374',
                timestamp: 'Date.now()', 
                text: 'i want to figure that out',
                user: 'josh' 
            },
            {
                _id: '1234567890',
                timestamp: 'Date.now()',
                text: 'last message text goes here',
                user: 'josh'
            },
        ],
        name: 'Bokit',
        participants: ['josh','Botkit'],
        lastMessage: {
            _id: '1234567890',
            timestamp: 'Date.now()', 
            text: 'last message text goes here',
            user: 'josh' 
        }
    },
    {
        _id: '10934867',
        avatar: 'URLString',
        messages: [
            {
                _id: '1234567890',
                timestamp: 'Date.now()', 
                text: 'last message text',
                user: 'josh' 
            },
            {
                _id: '0987654321',
                timestamp: 'Date.now()', 
                text: 'botkit messages',
                user: 'Onboarding Bot' 
            },
        ],
        name: 'Onboarding Bot',
        participants: ['josh','Botkit'],
        lastMessage: {
            _id: '0987654321',
            timestamp: 'Date.now()', 
            text: 'botkit messages',
            user: 'Onboarding Bot' 
        },
    },
];

const sendReducer = (state,action) => {
    let message = {
        _id: Date.now(),
        text: action.payload.message,
        timestamp: Date.now(),
        user: action.payload.userProfile._id,
        type: 'message',
    }

    return state.map(convo => {
        if (parseInt(convo._id) !== parseInt(action.payload.conversationId)) { return convo }
        else {
            return {
                ...convo,
                lastMessage: message,
                messages: [...convo.messages, message]
            }
        }
    });
}

const conversationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ConversationConstants.SEND:
            return sendReducer(state,action);

        default:
            return state
    }
};

export default conversationReducer;