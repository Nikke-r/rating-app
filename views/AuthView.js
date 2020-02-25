import React, { useState } from 'react';
import { Container, Content, View, Button, Text, Header, Body, Left, Icon, Right } from 'native-base';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const AuthView = ({ navigation }) => {
    const [visible, setVisible] = useState(true);

    const toggleForm = () => {
        visible ? setVisible(false) : setVisible(true);
    }

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
                    <Text>
                        {visible ? 'Login' : 'Register'}
                    </Text>
                </Body>
                <Right />
            </Header>
            <Content>
            {visible ? <LoginForm /> :  <RegisterForm />}
            <Button transparent full onPress={toggleForm}>
                <Text>
                    {visible ? 'Create a free account!' : 'Sign in using existing account!'}
                </Text>
            </Button>
            </Content>
        </Container>
    );
};

export default AuthView;