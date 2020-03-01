import React from 'react';
import { Header, Item, Input, Icon, Button } from 'native-base';

const SearchHeader = (props) => {

    return (
        <Header searchBar rounded>
            <Item>
                <Input placeholder='Search...' />
                <Button transparent icon>
                    <Icon name='search'/>
                </Button>
            </Item>
            <Button transparent icon onPress={() => props.navigation.navigate('Auth')}>
                <Icon name='person' />
            </Button>
        </Header>
    );
};

export default SearchHeader;