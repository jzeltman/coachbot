import { combineReducers } from 'redux';

import ConversationReducer from './ConversationsReducer';
import UserProfileReducer from './UserProfileReducer';
import AgendaReducer from './AgendaReducer';
import ObjectivesReducer from './ObjectivesReducer';

export default combineReducers({
    conversations: ConversationReducer,
    userProfile: UserProfileReducer,
    agenda: AgendaReducer,
    objectives: ObjectivesReducer,
});