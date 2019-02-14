import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Styles, Offset } from '../views/Styles';

export default class TextInputComponent extends React.Component {
    state = {
        inputText: '',
        blurredInput: true,
    }

    submit(){
        this.props.submit(this.state.inputText);
        this.setState({ inputText: '' });
    }

    render(){
        let topSpacing = 0;
        if (Platform.OS === 'ios' && this.state.blurredInput) topSpacing = -getBottomSpace();

        return (
            <View style={styles.textInputWrapper}>
                <TextInput style={styles.textInput}
                    onFocus={() => this.setState({blurredInput: false})}
                    onBlur={() => this.setState({blurredInput: true})}
                    multiline={this.props.multiline || true}
                    numberOfLines={this.props.numberOfLines || 4}
                    placeholder={this.props.placeholder || 'Type Something...'}
                    onChangeText={inputText => this.setState({ inputText })}
                    value={this.state.inputText}>
                </TextInput>
                <TouchableOpacity onPress={() => this.submit()}>
                    <Ionicons name="ios-arrow-dropup-circle" size={35} style={styles.sendButton} />
                </TouchableOpacity>
                <KeyboardSpacer topSpacing={topSpacing} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textInputWrapper: {
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
});