import React, { useState, useEffect } from 'react';
import { Header, Item, Input, Icon, Button, Text } from 'native-base';
import { AsyncStorage } from 'react-native';

const SearchHeader = (props) => {
    const [query, setQuery] = useState();

    const handlePress = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            props.navigation.navigate(token ? 'Profile' : 'Auth');
        } catch (error) {
            console.log('handlePress error: ', error.message);
        }
    };

    useEffect(() => {
        const search = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const options = {
                    method: 'POST',
                    headers: {
                        'x-access-token': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({title: query}),
                };
                const response = await fetch('http://media.mw.metropolia.fi/wbma/media/search', options);
                const toJSON = await response.json();
                console.log('Search: ', toJSON);
            } catch (error) {
                console.log('search error: ', error.message);
            }
        };

        if (query !== undefined) {
            search();
        }
    }, [query]);

    return (
        <Header searchBar rounded>
            <Item>
                <Input placeholder='Search...' onChangeText={text => setQuery(text)} />
                <Button transparent icon>
                    <Icon name='search'/>
                </Button>
            </Item>
            <Button transparent icon onPress={handlePress}>
                <Icon name='person' />
            </Button>
        </Header>
    );
};

export default SearchHeader;