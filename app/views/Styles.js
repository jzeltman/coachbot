import React from 'react';
import { StyleSheet } from 'react-native';

export const Offset = 24;
export const Styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: Offset,
        borderBottomWidth: 1,
        color: 'black',
        marginLeft: Offset,
    },
    inactiveTitle: { color: '#ccc' },
    chatList: {
        marginTop: Offset / 2,
        paddingBottom: Offset / 2,
        paddingLeft: Offset,
    },
    chatItem: {
        paddingBottom: Offset / 2,
        flexDirection: 'row',
        position: 'relative',
    },
    chatItemImage: {
        width: 65,
        height: 65,
        borderRadius: Offset / 2,
        marginRight: Offset / 2
    },
    chatItemLabel: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: Offset / 6,
    },
    chatItemMessage: { color: '#666' },
    chatAdvanceIcon: {
        position: 'absolute',
        top: Offset,
        right: Offset,
        color: '#aaa',
        fontSize: 14
    },
    firstHorizontalItem: { marginLeft: Offset },
    lastHorizontalItem: { marginRight: Offset },
    gradient: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: 100
    },
    agendaItem: {
        padding: Offset / 2,
        backgroundColor: '#ccc',
        borderRadius: Offset / 3,
        marginTop: Offset / 2,
        marginRight: Offset / 2,
        width: Offset * 6,
        minHeight: Offset * 2,
        position: 'relative'
    },
    agendaItemTitle: {
        fontWeight: 'bold',
        fontSize: 16
    },
});