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
                <View style={styles.chats}>
                    <TouchableOpacity onPress={this.onChats}>
                        <Text style={Styles.title}>Chats</Text>
                    </TouchableOpacity>
                    <ChatListHelper 
                        conversations={this.props.conversations} 
                        onChatItemPress={this.onChatItemPress} />
                </View>
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
    onChatItemPress = (conversation) => { this.props.navigation.navigate('Chat', { conversation }) }
}

const offset = 24;
const styles = StyleSheet.create({
    objectives: {
        flex: 1,
        paddingTop: offset / 2,
        paddingBottom: offset / 2,
    },
    objectiveItemProgress: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    agenda: {
        flex: 1,
        paddingTop: offset / 2,
        paddingBottom: offset / 2,
    },
    agendaItem: {
        padding: offset / 2,
        backgroundColor: '#ccc',
        borderRadius: offset / 3,
        marginTop: offset / 2,
        marginRight: offset / 2,
        width: offset * 6,
        minHeight: offset * 2,
        position: 'relative'
    },
    agendaItemTitle: {
        fontWeight: 'bold',
        fontSize: 16
    },
    chats: {
        flex: 2,
        paddingTop: offset / 2,
    },
    chatList: {
        marginTop: offset / 2,
        paddingBottom: offset / 2,
        paddingLeft: offset,
    },
    chatItem: {
        paddingBottom: offset / 2,
        flexDirection: 'row',
        position: 'relative',
    },
    chatItemImage: {
        width: 65,
        height: 65,
        borderRadius: offset / 2,
        marginRight: offset / 2
    },
    chatItemLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: offset / 6,
    },
    chatItemMessage: { color: '#666' },
    chatAdvanceIcon: {
        position: 'absolute',
        top: offset,
        right: offset,
        color: '#aaa',
        fontSize: 14
    },
    firstHorizontalItem: { marginLeft: offset },
    lastHorizontalItem: { marginRight: offset },
    gradient: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: 100
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