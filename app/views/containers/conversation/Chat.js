import React, { Component } from 'react';
import {
    AsyncStorage,
    Keyboard,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-navigation';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { connect } from 'react-redux';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Styles, Offset } from '../../Styles';
import ListMessages from './ListMessages';

class Chat extends Component {
    
    static navigationOptions = ({navigation}) => { 
        console.log('navigation',navigation);
        return {
            title: 'Chat',
        }
    }
    state = {
        inputText: '',
        conversation: this.props.conversation,
        messages: this.props.conversation.messages,
        user: this.props.userProfile,
    }

    componentWillMount(){
        this.props.navigation.setParams({title: this.props.conversation.name}); 
    }

    render() {
        console.log('conversation',this.state);
        /*
                            {this.renderMessages()}
                    {this.renderTyping()}
                    */
        let topSpacing = 0;
        if (Platform.OS === 'ios' && this.state.blurredInput) topSpacing = -getBottomSpace();
        return ( 
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.chatList} ref={(ref) => { this.scrollView = ref }}>
                    <ListMessages messages={this.state.messages} />
                </ScrollView>
                <View style={styles.footer}>
                    <TextInput style={styles.textInput}
                        onFocus={() => this.setState({blurredInput: false})}
                        onBlur={() => this.setState({blurredInput: true})}
                        multiline={true}
                        numberOfLines={4}
                        placeholder='Type Something...'
                        onChangeText={inputText => this.setState({ inputText })}
                        value={this.state.inputText}>
                    </TextInput>
                    <TouchableOpacity onPress={() => this.addMessageFromUser()}>
                        <Ionicons name="ios-arrow-dropup-circle" size={35} style={styles.sendButton} />
                    </TouchableOpacity>
                </View>
                <KeyboardSpacer topSpacing={topSpacing} />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#eee',
    },
    chatList:{
        paddingTop: Offset / 2,
        paddingBottom: Offset,
        flex: 1, 
    },
    footer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#eee',
        paddingLeft: 7,
        paddingRight: 7,
        paddingTop: 3,
        paddingBottom: 3,
    },
    textInput: {
        backgroundColor: '#fff', 
        flex: 1,
        paddingTop: 4,
        paddingRight: 10,
        paddingBottom: 4,
        paddingLeft: 10,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        marginTop: 2,
        borderRadius: Offset,
        fontSize: 16,
        height: 30,
    },
    sendButton: { 
        color: '#999',
        justifyContent: 'center',
        margin: 0,
        marginLeft: 7,
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

const mapStateToProps = (state, ownProps) => {
    return { 
        conversation: state.conversations.filter( convo => {
            return convo._id === ownProps.navigation.getParam('conversation');
        })[0],
        userProfile: state.userProfile, 
    }
};

export default connect(mapStateToProps)(Chat);