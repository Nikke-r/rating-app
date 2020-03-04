import React from 'react';
import { Container, Header, Left, Body, Title, Right, Button, Icon } from 'native-base';
import MediaList from '../components/MediaList';
import { AsyncStorage } from 'react-native';

const Home = ({navigation}) => {

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