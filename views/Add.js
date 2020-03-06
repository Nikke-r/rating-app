//After you choose an item in Upload.js you will be taken to here
import React, { useEffect, useState, useContext } from 'react';
import { Container, Content, Text, Header, Body, Title, Left, Icon, Button, Right, Card, CardItem, Root, Toast } from 'native-base';
import { Image, AsyncStorage } from 'react-native';
import uploadHook from '../hooks/UploadHook';
import {MediaContext} from '../contexts/MediaContext';

const Add = ({ route, navigation }) => {
    const { details } = route.params;
    const [token, setToken] = useState();
    const { handleUpload } = uploadHook();
    const [media, setMedia] = useContext(MediaContext);

    const add = async () => {
        try {
            const response = await handleUpload(details, navigation);
            if (response.file_id) {
                Toast.show({
                    text: response.message,
                    type: 'success',
                });
                const newData = await fetch('http://media.mw.metropolia.fi/wbma/tags/rating-app');
                const toJSON = await newData.json();
    
                const result = await Promise.all(toJSON.map(async (item) => {
                    const response = await fetch('http://media.mw.metropolia.fi/wbma/media/' + item.file_id);
                    return await response.json();
                }));
                for (let i = 0; i < result.length; i++) {
                    console.log(result[i].title);
                }
                setMedia(result);

                navigation.navigate('Home', {screen: 'Home'})
            } else {
                Toast.show({
                    text: 'Error: ' + response.message,
                });
            }
        } catch (error) {
            console.log('add error: ', error.message);
        }
    };

    const checkAuth = async () => {
        try {
            const tokenFromStorage = await AsyncStorage.getItem('token');
            if (tokenFromStorage) {
                setToken(tokenFromStorage);
            }
        } catch (error) {
            console.log('checkAuth error: ', error.message);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <Root>
            <Container>
                <Header>
                    <Left>
                        <Button iconLeft transparent onPress={() => navigation.goBack()}>
                            <Icon name='arrow-back' />
                            <Text style={{fontSize: 20}}>Back</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Add</Title>
                    </Body>
                    <Right />
                </Header>
                <Content scrollEnabled={false}>
                    <Card>
                        <CardItem bordered style={{justifyContent: 'center', alignItems: 'center'}}>
                            {details.Poster ? <Image source={{uri: details.Poster}} style={{height: 200, width: 150}} /> : null}
                        </CardItem>
                        <CardItem bordered>
                            <Body>
                                <Title> {details.Title} <Text note > {details.Type} </Text> </Title>
                                <Text> Genres: {details.Genre} </Text>
                                <Text> Duration: {details.Runtime} </Text>
                            </Body>
                        </CardItem>
                    </Card>
                    {token ?
                    <Button full success onPress={add}>
                        <Text>Add to database</Text>
                    </Button>
                    :
                    <Button full bordered onPress={() => navigation.push('Auth')}>
                        <Text>Login to continue</Text>    
                    </Button>}
                </Content>
            </Container>
        </Root>
    );
};

export default Add;
