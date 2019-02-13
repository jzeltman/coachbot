import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import { SEND } from '../../../constants/Conversation';
import ListMessages from './ListMessages';
import TextInputComponent from '../../../components/TextInput';

class Chat extends React.Component {
    static navigationOptions =  { title: 'Chat' }

    render() {
        return ( 
            <SafeAreaView style={styles.container}>
                <ListMessages messages={this.props.conversation.messages} />
                <TextInputComponent submit={this.submit.bind(this)} />
            </SafeAreaView>
        );
    }

    submit(message){
        this.props.send({
            message: message,
            conversationId: this.props.conversation._id,
            userProfile: this.props.userProfile,
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#eee',
    },
});

const mapStateToProps = (state, ownProps) => {
    return { 
        conversation: state.conversations.filter( convo => {
            return convo._id === ownProps.navigation.getParam('conversationId');
        })[0],
        userProfile: state.userProfile, 
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        send: (payload) => dispatch({ type: SEND, payload })
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Chat);