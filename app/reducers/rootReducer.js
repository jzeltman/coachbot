import { combineReducers } from 'redux';

import ConversationReducer from './ConversationsReducer';
import UserProfileReducer from './UserProfileReducer';
import AgendaReducer from './AgendaReducer';
import ObjectivesReducer from './ObjectivesReducer';
import MessagingReducer from './MessagingReducer';

export default combineReducers({
    conversations: ConversationReducer,
    userProfile: UserProfileReducer,
    agenda: AgendaReducer,
    objectives: ObjectivesReducer,
    messaging: MessagingReducer,
});