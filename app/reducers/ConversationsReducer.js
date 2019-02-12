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

const conversationReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
};

export default conversationReducer;