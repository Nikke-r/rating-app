//After you choose an item in Upload.js you will be taken to here
import React, { useEffect, useState, useContext } from 'react';
import { Container, Content, Text, Header, Body, Title, Left, Icon, Button, Right, Card, CardItem } from 'native-base';
import { Image, AsyncStorage } from 'react-native';
import uploadHook from '../hooks/UploadHook';
import { MediaContext } from '../contexts/MediaContext';

const Add = ({ route, navigation }) => {
    const { details } = route.params;
    const [token, setToken] = useState();
    const { handleUpload } = uploadHook();
    const [media, setMedia] = useContext(MediaContext);

    //Check if the users has signed in
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
                <Button full success onPress={() => handleUpload(details, navigation, setMedia)}>
                    <Text>Add to database</Text>
                </Button>
                :
                <Button full bordered onPress={() => navigation.push('Auth')}>
                    <Text>Login to continue</Text>    
                </Button>}
            </Content>
        </Container>
    );
};

export default Add;
