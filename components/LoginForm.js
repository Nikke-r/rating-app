//Login component
import React from 'react';
import { Form, Item, Input, Label, Button, Text, Toast, Root } from 'native-base';
import useForms from '../hooks/LoginHook';
import { fetchPost } from '../hooks/APIHooks';
import { AsyncStorage } from 'react-native';

const LoginForm = (props) => {
    const {
        handleUsernameChange,
        handlePasswordChange,
        inputs
    } = useForms();

    const login = async () => {
        try {
            const user = await fetchPost('login', inputs);
            if (user.token) {
                await AsyncStorage.setItem('token', user.token);
                props.navigation.navigate('Home');
            } else {
                Toast.show({
                    text: user.message,
                    position: 'top',
                    duration: 2000,
                    type: 'warning'
                })
            }
        } catch (error) {
            console.log('login error: ', error.message);
        }
    };

    return (
        <Root>
            <Form>
                <Item floatingLabel>
                    <Label>Username</Label>
                    <Input autoCapitalize='none' onChangeText={handleUsernameChange} value={inputs.username} />
                </Item>
                <Item floatingLabel>
                    <Label>Password</Label>
                    <Input secureTextEntry onChangeText={handlePasswordChange} value={inputs.password} />
                </Item>
                <Button full success onPress={login}>
                    <Text>
                        Sign in!
                    </Text>
                </Button>
            </Form>
        </Root>
    );
};

export default LoginForm;