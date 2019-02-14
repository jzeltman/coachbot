const initialState= {
    _id: 'josh',
    avatar: 'URLString',
    age: 'Number',
    createdDate: 'Date',
    displayName: 'String',
    firstName: 'String',
    email: 'String',
    gender: 'String',
    lastName: 'String',
    conversations: ['12039715','10934867',],
    friends: ['Botkit','Onboarding Bot'],
};


const UserProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
};

export default UserProfileReducer;