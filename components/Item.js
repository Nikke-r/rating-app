import React from 'react';
import {ListItem, Text, Thumbnail, Body} from 'native-base';
const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Item = (props) => {
    return (
        <ListItem thumbnail>
            <Thumbnail source={{uri: mediaUrl + props.item.filename}} />
            <Body>
                <Text> {props.item.title} </Text>
            </Body>
        </ListItem>
    );
};

export default Item;
