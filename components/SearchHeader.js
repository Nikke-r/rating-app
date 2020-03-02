import React from 'react';
import { Header, Item, Input, Icon, Button } from 'native-base';
import { AsyncStorage } from 'react-native';

const SearchHeader = (props) => {

    const handlePress = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            props.navigation.navigate(token ? 'Profile' : 'Auth');
        } catch (error) {
            console.log('handlePress error: ', error.message);
        }
    }

    return (
        <Header searchBar rounded>
            <Item>
                <Input placeholder='Search...' />
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