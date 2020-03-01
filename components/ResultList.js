import React, { useState } from 'react';
import { List, ListItem, Text, Thumbnail, Body, Left } from 'native-base';

const ResponseList = (props) => {

    const findDetails = async (title) => {
        try {
            const response = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=3936aae2`);
            const toJSON = await response.json();
            props.navigation.push('Add', {details: toJSON});
        } catch (error) {
            console.log('details error: ', error.message);
        }
    };

    return (
        <List
            dataArray={props.results}
            contentContainerStyle={{paddingBottom: 20, top: 20}}
            keyExtractor={(item, id) => id.toString()}
            renderRow={item => {
                return (
                    <ListItem thumbnail onPress={() => findDetails(item.Title)}>
                        {item.Poster ? <Thumbnail source={{uri: item.Poster}} /> : null}
                        <Body>
                            <Text> { item.Title } </Text>
                        </Body>
                    </ListItem>
                );
            }}
        />
    );
};

export default ResponseList;
