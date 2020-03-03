import React from 'react';
import {ListItem, Text, Thumbnail, Body} from 'native-base';
const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Item = (props) => {
    return (
        <ListItem thumbnail onPress={() => props.navigation.push('Details', {details: props.item})}>
            <Thumbnail source={{uri: mediaUrl + props.item.filename}} />
            <Body>
                <Text> {props.item.title} </Text>
            </Body>
        </ListItem>
    );
};

export default Item;
