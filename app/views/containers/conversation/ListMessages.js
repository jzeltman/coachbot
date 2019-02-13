import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Styles, Offset } from '../../Styles';

export default class ListMessages extends Component {
    renderQuickReplies(replies){
        return replies.map((reply,key) => {
            return (
                <TouchableOpacity onPress={() => this.addMessageFromUser(reply.payload)} key={key} style={styles.quickReply}>
                    <Text>{reply.title}</Text>
                </TouchableOpacity>
            )
        });
    }

    renderMessages(){
        return this.props.messages.map((message,key) => {
            let localStyles = [styles.message];
            if (message.user === this.props.to) localStyles.push(styles.fromSender);
            else localStyles.push(styles.fromUser)

            if (key !== this.props.messages.length - 1 || !message.quick_replies){
                return <Text key={key} style={localStyles}>{message.text}</Text>

            } else if (message.quick_replies){
                return (
                    <View key={key}>
                        <Text style={localStyles}>{message.text}</Text>
                        <View style={styles.quickReplyContainer}>{this.renderQuickReplies(message.quick_replies)}</View>
                    </View>
                )
            }
        });
    }

    render(){
        return <ScrollView style={styles.chatList} ref={(ref) => { this.scrollView = ref }}>{this.renderMessages()}</ScrollView>
    }
}

const styles = StyleSheet.create({
    chatList:{
        paddingTop: Offset / 2,
        paddingBottom: Offset,
        flex: 1, 
    },
    message: {
        backgroundColor: '#ccc',
        color: '#333',
        padding: 10,
        borderRadius: 10,
        margin: 3,
        marginRight: Offset / 2,
        marginLeft: Offset / 2,
        maxWidth: '75%',
        overflow: 'hidden',
    },
    fromUser: {
        alignSelf: 'flex-end',
        backgroundColor: 'powderblue',
    },
    typing: {
        margin: Offset / 2,
        color: '#999',
    },
    extraBottomPadding: { marginBottom: Offset },
    quickReplyContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: Offset,
        maxWidth: '100%',
    },
    quickReply: {
        backgroundColor: 'powderblue',
        borderRadius: Offset,
        overflow: 'hidden',
        fontWeight: 'bold',
        color: '#fff',
        padding: 10,
        paddingHorizontal: 15,
        margin: 4,
    }
});