import React, { Component } from 'react';
import { 
    ScrollView, 
    Text,
    TouchableOpacity,
} from 'react-native';
import { Styles, Offset } from '../Styles';

export default class AgendaListHelper extends Component {

    renderLabel(activity){
        if (activity.start && activity.end){
            return <Text style={Styles.agendaItemLabel}>{activity.start}-{activity.end}</Text>
        } else { return null; }
    }
    renderItems(){
        return this.props.agenda.map((activity,key) => { 
            return (
                <TouchableOpacity style={[Styles.agendaItem,{marginLeft: key === 0 ? Offset : 0}]} key={key}>
                    {this.renderLabel(activity)}
                    <Text style={Styles.agendaItemTitle}>{activity.name}</Text>
                </TouchableOpacity>
            )
        });
    }

    render() {
        return <ScrollView horizontal={true}>{this.renderItems()}</ScrollView>
    }
}