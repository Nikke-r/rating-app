import React, { useState, useEffect } from 'react';
import { Header, Container, Item, Input, Text, Content } from 'native-base';
import ResultList from './ResultList';

const UploadForm = (props) => {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState();

    useEffect(() => {
        const find = async () => {
            try {
                const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=3936aae2`);
                const toJSON = await response.json();
                if (!toJSON.error) {
                    setResults(toJSON.Search);
                }
            } catch (error) {
                console.log('find error: ', error.message);
            }
        };
        if (query !== undefined) {
            find();
        }
    }, [query]);

    return (
        <Container>
            <Header searchBar rounded>
                <Item>
                    <Input placeholder='Search...' onChangeText={text => setQuery(text)} value={query} clearButtonMode='while-editing' />
                </Item>
            </Header>
            {results && results.length > 0 ? 
            <ResultList results={results} navigation={props.navigation} />
            :
            <Content 
            contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text note style={{textAlign: 'center'}}>Type title of a movie or a series you want to upload</Text>
            </Content>}
        </Container>
    );
};

export default UploadForm;