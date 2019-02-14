const initialState = [
    {
        _id: '0198273519087324',
        createdDate: 'Date',
        name: 'Work on Coachbot',
        start: '9:30',
        end: '11:00',
        date: '2019:02:12',
    },
    {
        _id: '0123789409871234',
        createdDate: 'Date',
        name: 'Lunch with Uciel',
        start: '11:00',
        end: '13:00',
        date: '2019:02:12',
    },
    {
        _id: '123987410239847',
        createdDate: 'Date',
        name: 'Siesta',
        start: '13:30',
        end: '14:00',
        date: '2019:02:12',
    },
    {
        _id: '98127490238741293874',
        createdDate: 'Date',
        name: 'Work Block',
        start: '14:00',
        end: '16:00',
        date: '2019:02:12',
    },
    {
        _id: '12908374129873',
        createdDate: 'Date',
        name: 'Run Errands',
        start: '16:15',
        end: '17:00',
        date: '2019:02:12',
    },
]

const AgendaReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
};

export default AgendaReducer;