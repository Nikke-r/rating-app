//A single image item in Home.js
import React from 'react';
import {Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const SingleItem = (props) => {

    return (
        <TouchableOpacity onPress={() => props.navigation.push('Details', {details: props.item})}>
            <Image source={{uri: mediaUrl + props.item.filename}} style={{height: 180, width: 120, margin: 5}} />
        </TouchableOpacity>
    );
};

export default SingleItem;
