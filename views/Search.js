import React, {useState, useEffect} from 'react';
import {Container, Header, Content, Item, Input, List, Text, ListItem, Button} from 'native-base';

const Search = ({ navigation }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [query, setQuery] = useState();

    //Everytime user types something to search bar function will clear the earlier suggestions, get movies based on our tags from the server and compare the search input to movie names
    useEffect(() => {
        const search = async () => {     
            setSuggestions([]);
            try {
                const getFromServer = await fetch('http://media.mw.metropolia.fi/wbma/tags/rating-app');
                const toJSON = await getFromServer.json();
                for (let i = 0; i < toJSON.length; i++) {
                    if (query) {
                        if (toJSON[i].title.substr(0, query.length).toLowerCase() === query.toLowerCase()) {
                            setSuggestions(suggestions => [...suggestions, toJSON[i]]);
                        }   
                    } 
                }
            } catch (error) {
                console.log('search error: ', error.message);
            }
        };
        search();
    }, [query]);

    return (
        <Container>
            <Header searchBar rounded>
                <Item>
                    <Input placeholder='Search...' clearButtonMode='while-editing' onChangeText={text => setQuery(text)} value={query} />
                </Item>
            </Header>
            {suggestions.length > 0 ? 
            <List 
                dataArray={suggestions}
                keyExtractor={(item, id) => id.toString()}
                renderRow={item => {
                    return (
                        <ListItem onPress={() => navigation.navigate('Details', {details: item})}>
                            <Text> {item.title} </Text>
                        </ListItem>
                    )
                }}
            />:
            <Content contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text note>If you didn't find what you were looking for</Text>
                <Button transparent onPress={() => navigation.navigate('Upload')}>
                    <Text>Please upload it!</Text>
                </Button>
            </Content>
            }
        </Container>
    );
};

export default Search;
