import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';

import ChatListHelper from '../helpers/ChatListHelper';
import AgendaListHelper from '../helpers/AgendaListHelper';

import { Styles } from '../Styles';

class Main extends Component {
    static navigationOptions = { title: 'Home' };
    state = { chatOrFriendsTab: 'chat', }

    renderHeading(config){
        let localStyles = [Styles.title];
        if (config.inactive) localStyles.push(Styles.inactiveTitle);

        return (
            <TouchableOpacity onPress={config.onPress}>
                <Text style={localStyles}>{config.title}</Text>
            </TouchableOpacity>
        )
    }

    renderChatOrFriendsTabs(){
        const chatHeadingConfig = {
            title: 'Conversations',
            onPress: () => this.setState({ chatOrFriendsTab: 'chat' }),
            inactive: this.state.chatOrFriendsTab !== 'chat',
        }
        const friendsHeadingConfig = {
            title: 'Friends',
            onPress: () => this.setState({ chatOrFriendsTab: 'friends' }),
            inactive: this.state.chatOrFriendsTab !== 'friends',
        }

        let listToDisplay = false;

        if (this.state.chatOrFriendsTab === 'chat'){ 
            listToDisplay = <ChatListHelper 
                                conversations={this.props.conversations} 
                                onChatItemPress={this.onChatItemPress} />
        } else {
            listToDisplay = <Text>Friends List</Text>
        }

        return (
            <View style={styles.chats}>
                <View style={{flexDirection:'row'}}>
                    {this.renderHeading(chatHeadingConfig)}
                    {this.renderHeading(friendsHeadingConfig)}
                </View>
                {listToDisplay}
            </View>
        )
    }

    render() {
        return (
            <SafeAreaView style={Styles.container}>
                <View style={styles.agenda}>
                    <TouchableOpacity onPress={this.onAgenda}>
                        <Text style={Styles.title}>Agenda</Text>
                    </TouchableOpacity>
                    <AgendaListHelper agenda={this.props.agenda} />
                </View>
                <View style={styles.objectives}>
                    <TouchableOpacity onPress={this.onObjectives}>
                        <Text style={Styles.title}>Objectives</Text>
                    </TouchableOpacity>
                    <AgendaListHelper agenda={this.props.objectives} />
                </View>
                {this.renderChatOrFriendsTabs()}
            </SafeAreaView>
        );
    }

    onAgenda = () => { this.props.navigation.navigate('Agenda'); }
    onAgendaItem = () => { this.props.navigation.navigate('Agenda'); }
    onObjectives = () => { this.props.navigation.navigate('Habits'); }
    onObjectiveItem = () => { this.props.navigation.navigate('Habits'); }
    //onObjectives = () => { this.props.navigation.navigate('Objectives'); }
    //onObjectiveItem = () => { this.props.navigation.navigate('Objectives'); }
    onChats = () => { this.props.navigation.navigate('Chats'); }
    onChatItemPress = (conversationId) => { this.props.navigation.navigate('Chat', { conversationId }) }
}

const offset = 24;
const styles = StyleSheet.create({
    objectives: {
        flex: 1,
        paddingTop: offset / 2,
        paddingBottom: offset / 2,
    },
    agenda: {
        flex: 1,
        paddingTop: offset / 2,
        paddingBottom: offset / 2,
    },
    chats: {
        flex: 2,
        paddingTop: offset / 2,
    },
})

const mapStateToProps = (state) => {
    return {
        conversations: state.conversations,
        userProfile: state.userProfile,
        agenda: state.agenda,
        objectives: state.objectives,
    }
};

export default connect(mapStateToProps)(Main);