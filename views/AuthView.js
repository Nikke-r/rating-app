import React, { useState } from 'react';
import { Container, Content, View, Button, Text, Header, Body, Left, Icon, Right } from 'native-base';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const AuthView = ({ navigation }) => {
    const [visible, setVisible] = useState(true);

    return (
        <Container>
                {visible ? 
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
                                Login
                            </Text>
                        </Body>
                        <Right />
                    </Header>
                    <Content>
                    <LoginForm />
                        <Button transparent full onPress={() => setVisible(false)}>
                            <Text>
                                Don't have an accout? Register!
                            </Text>
                        </Button>
                    </Content>
                </Container>
                :
                <Container>
                    <Header>
                        <Left>
                            <Button transparent icon onPress={() => navigation.goBack()}>
                                <Icon name='arrow-back' />
                                <Text>Home</Text>
                            </Button>
                        </Left>
                        <Body>
                            <Text>Register</Text>
                        </Body>
                        <Right />
                    </Header>
                    <Content>
                        <RegisterForm />
                        <Button transparent full onPress={() => setVisible(true)}>
                            <Text>
                                Already have an account? Sign in!
                            </Text>
                        </Button>
                    </Content>
                </Container>
                }
        </Container>
    );
};

export default AuthView;