import React from 'react';
import { Container, Header, Body, Title, Content, Text, Left, Right, Button, Icon } from 'native-base';
import { AsyncStorage } from 'react-native';

const Profile = ({ navigation }) => {

    const logout = async () => {
        try {
            await AsyncStorage.clear();
            navigation.navigate('Home');
        } catch (error) {
            console.log('logout error: ', error.message);
        }
    };

    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent icon onPress={() => navigation.goBack()}>
                        <Icon name='arrow-back' />
                        <Text>Home</Text>
                    </Button>
                </Left>
                <Body>
                    <Title>Profile</Title>
                </Body>
                <Right />
            </Header>
            <Content>
                <Button danger full onPress={logout}>
                    <Text>Logout</Text>
                </Button>
            </Content>
        </Container>
    );
};

export default Profile;
