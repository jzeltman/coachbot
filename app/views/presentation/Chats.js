import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import ChatListHelper from '../helpers/ChatListHelper';
import { Styles } from '../Styles';

class Chats extends Component {
    static navigationOptions = { title: 'Conversations' };
    render() {
        return (
            <SafeAreaView style={Styles.container}>
                <ChatListHelper 
                    conversations={this.props.conversations} 
                    onChatItemPress={(conversationId) => this.props.navigation.navigate('Chat', { conversationId })} />
            </SafeAreaView>
        )
    }
}

const mapStateToProps = (state) => {
    return { 
        conversations: state.conversations, 
        userProfile: state.userProfile, 
    }
};

export default connect(mapStateToProps)(Chats);