import React, { Component } from 'react';
import { 
    Image,
    ScrollView, 
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Styles, Offset } from '../Styles';

export default class ChatListHelper extends Component {

    renderChats(){
        return this.props.conversations.map((convo,key) => { 
            return (
                <TouchableOpacity key={key} style={Styles.chatItem} onPress={() => this.props.onChatItemPress(convo._id)}>
                    <View>
                        <Text style={Styles.chatItemLabel}>{convo.name}</Text>
                        <Text style={Styles.chatItemMessage}>{convo.lastMessage.text}</Text>
                        <Text style={Styles.chatItemTime}>{convo.lastMessage.timestamp}</Text>
                    </View>
                    <LinearGradient colors={['rgba(255,255,255,0)', '#fff']}
                        locations={[0, .5]}
                        start={[0, 0]} end={[1, 0]}
                        style={Styles.gradient}></LinearGradient>
                    <Ionicons name="ios-arrow-forward" size={Offset} style={Styles.chatAdvanceIcon} />
                </TouchableOpacity>
            )
        });
    }

    renderAvatar(){
        if (this.props.convo.avatar){ console.log('avatar',this.props.user.avatar);
            return <Image style={Styles.chatItemImage} source={this.props.user.avatar} />
        } else { return null; }
    }

    render() {
        return <ScrollView style={Styles.chatList}>{this.renderChats()}</ScrollView>
    }
}