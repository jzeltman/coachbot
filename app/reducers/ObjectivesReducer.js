const initialState = [
    {
        _id: '0198273519087324',
        createdDate: '2019:02:05',
        name: 'Meditate Daily',
        startDate: '2019:02:12',
        endDate: '2019:12:12',
    },
    {
        _id: '1209837579081234',
        createdDate: '2019:02:01',
        name: 'Lift 3x per Week',
        startDate: '2019:02:12',
        endDate: '2019:12:12',
    },
    {
        _id: '908712345908714',
        createdDate: '2019:02:01',
        name: 'Do Challenging Things',
        startDate: '2019:02:12',
        endDate: '2019:12:12',
    },
    {
        _id: '97812304012348907231489',
        createdDate: '2019:02:01',
        name: 'Be a Better Friend',
        startDate: '2019:02:12',
        endDate: '2019:12:12',
    },
    {
        _id: '7790812398701239408324',
        createdDate: '2019:02:01',
        name: 'Physical Fitness + Posture',
        startDate: '2019:02:12',
        endDate: '2019:12:12',
    },
    {
        _id: '712340981234098098980',
        createdDate: '2019:02:01',
        name: '1 hour social media/gaming',
        startDate: '2019:02:12',
        endDate: '2019:12:12',
    },
    {
        _id: '7980798012341234123',
        createdDate: '2019:02:02',
        name: 'Financial Growth + Travel',
        startDate: '2019:02:12',
        endDate: '2019:12:12',
    },
]

const ObjectivesReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
};

export default ObjectivesReducer;