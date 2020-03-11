import React from 'react';
import { Container, Header, Left, Body, Title, Right, Button, Icon } from 'native-base';
import MediaList from '../components/MediaList';
import { AsyncStorage } from 'react-native';

const Home = ({navigation}) => {

    //Handle the top right corner button function. If user is logged in take it to Profile, else to login/register screen
    const handleAuthBtn = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            navigation.navigate(token ? 'Profile' : 'Auth');
        } catch (error) {
            console.log('handlePress error: ', error.message);
        }
    };

    return (
        <Container>
            <Header>
                <Left />
                <Body>
                    <Title>Home</Title>
                </Body>
                <Right>
                    <Button transparent icon onPress={handleAuthBtn}>
                        <Icon name='person' />
                    </Button>
                </Right>
            </Header>  
            <MediaList navigation={navigation}/>
        </Container>
    );
};

export default Home;