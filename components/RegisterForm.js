import React from 'react';
import { Form, Item, Input, Label, Button, Text, Icon, Toast, Root } from 'native-base';
import useForms from '../hooks/LoginHook';
import { fetchPost } from '../hooks/APIHooks';

const RegisterForm = () => {
    const {
        handleUsernameChange,
        handleEmailChange,
        handleFullNameChange,
        handlePasswordChange,
        handleConfirmPasswordChange,
        inputs,
        errors
    } = useForms();

    const login = async () => {
        try {
            const user = await fetchPost('login', inputs);
            if (user.token) {
                await AsyncStorage.setItem('token', user.token);
                props.navigation.navigate('Home');
            }
        } catch (error) {
            console.log('login error: ', error.message);
        }
    };

    const register = async () => {
        try {
            const userInfo = inputs;
            delete userInfo.confirmPassword;
            const response = await fetchPost('users', inputs);
            if (response.user_id) {
                login();
            } else {
                Toast.show({
                    text: response.error.split(': ')[1],
                    position: "top",
                    duration: 2000,
                    type: 'warning'
                })
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Root>
            <Form>
                <Item floatingLabel>
                    <Label>Username</Label>
                    <Input autoCapitalize='none' onChangeText={handleUsernameChange} value={inputs.username} />
                    {errors.username || !inputs.username ?  <Icon name='close' /> : <Icon name='checkmark' />}
                </Item>
                <Item floatingLabel>
                    <Label>Email</Label>
                    <Input autoCapitalize='none' onChangeText={handleEmailChange} value={inputs.email} />
                    {errors.emai || !inputs.email ?  <Icon name='close' /> : <Icon name='checkmark' />}
                </Item>
                <Item floatingLabel>
                    <Label>Full name (optional)</Label>
                    <Input autoCapitalize='words' onChangeText={handleFullNameChange} value={inputs.full_name} />
                    {errors.full_name ?  <Icon name='close' /> : <Icon name='checkmark' />}
                </Item>
                <Item floatingLabel>
                    <Label>Password</Label>
                    <Input secureTextEntry onChangeText={handlePasswordChange} value={inputs.password} />
                    {errors.password || !inputs.password ?  <Icon name='close' /> : <Icon name='checkmark' />}
                </Item>
                <Item floatingLabel>
                    <Label>Retype password</Label>
                    <Input secureTextEntry onChangeText={handleConfirmPasswordChange} value={inputs.confrimPassword} />
                    {errors.confirmPassword || !inputs.confirmPassword ?  <Icon name='close' /> : <Icon name='checkmark' />}
                </Item>
                {errors.username || errors.password || errors.email || errors.confirmPassword || !inputs.username || !inputs.email || !inputs.password || !inputs.confirmPassword ? 
                <Button disabled full bordered style={{top: 10}}>
                    <Text>
                        Register!
                    </Text>
                </Button>
                :
                <Button full success onPress={register} style={{top: 10}}>
                    <Text>
                        Register!
                    </Text>
                </Button>}
            </Form>
        </Root>
    );
};

export default RegisterForm;