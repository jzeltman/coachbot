import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import * as Constants from '../../../constants/Conversation';
import ListMessages from './ListMessages';
import TextInputComponent from '../../../components/TextInput';
import Websockets from '../../../core/Websockets';
import Webhooks from '../../../core/Webhooks';

class Chat extends React.Component {
    static navigationOptions =  { title: 'Chat' }
    constructor(props){
        super(props);
        this.sendTo = this.getConversationParticipants(); 

        connectConfig = {
            url: '://082a7862.ngrok.io',
            userProfile: this.props.userProfile,
            isBotConvo: true, // TKTK create method to check for bot convos
            sendTo: this.sendTo, 
            dispatchTyping: this.props.typing,
            dispatchConnected: this.props.connected,
            dispatchReceive: this.receive.bind(this),
        }

        if (this.props.messaging.connectionType === 'socket'){
            this.Connection = new Websockets(connectConfig);
        } else { this.Connection = new Webhooks(connectConfig); }
    }

    getConversationParticipants(){
        const sendTo = this.props.conversation.participants.filter(participant => {
            console.log('participants',participant,this.props.userProfile._id)
            return participant !== this.props.userProfile._id;
        });

        if (sendTo.length === 1) return sendTo[0];
        else return sendTo;
    }

    componentDidMount(){
        this.Connection.connect();
    }

    componentWillMount(){
        this.props.connect({ 
            conversation: this.props.conversation,
            userProfile: this.props.userProfile,
        });
    }

    renderConnecting(){
        if (this.props.messaging.isConnecting) return <Text>Connecting</Text>
        else return null;
    }

    render() {
        return ( 
            <SafeAreaView style={styles.container}>
                {this.renderConnecting()}
                <ListMessages 
                    sendTo={this.sendTo}
                    user={this.props.userProfile}
                    messages={this.props.conversation.messages} 
                    typing={this.props.messaging.isTyping} />
                <TextInputComponent submit={this.submit.bind(this)} />
            </SafeAreaView>
        );
    }

    submit(text){
        const message = this.Connection.addMessage({
            user: this.props.userProfile._id,
            text
        })

        this.props.add({
            message: message,
            conversationId: this.props.conversation._id,
        });

        this.Connection.WSsend(message);
    }

    receive(message){
        this.props.receive({
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
        messaging: state.messaging,
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        add: (payload) => dispatch({ type: Constants.ADD, payload }),
        connect: (payload) => dispatch({ type: Constants.CONNECT, payload }),
        connected: () => dispatch({ type: Constants.CONNECTED }),
        typing: () => dispatch({ type: Constants.TYPING }),
        receive: (payload) => dispatch({ type: Constants.RECEIVE, payload }),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Chat);