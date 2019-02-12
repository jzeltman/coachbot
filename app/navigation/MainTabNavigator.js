import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SettingsScreen from '../screens/SettingsScreen';

import Main from '../views/presentation/Main';

import Chats from '../views/presentation/Chats';
import Chat from '../views/containers/conversation/Chat';

const HomeStack = createStackNavigator({
    Home: Main,
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
};

const ChatStack = createStackNavigator({
    Chats: Chats,
    Chat: Chat, 
})

ChatStack.navigationOptions = {
    tabBarLabel: 'Conversations',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? 'ios-chatboxes'
                    : 'md-information-circle'
            }
        />
    ),
};

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        />
    ),
};

export default createBottomTabNavigator({
    HomeStack,
    ChatStack,
    SettingsStack,
});
