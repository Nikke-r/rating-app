import React from 'react';
import { Container, Header, Body, Title, Left, Button, Icon, Right, Content, Form, Text, Item, Input } from 'native-base';
import useForms from '../hooks/LoginHook';
import { fetchPut } from '../hooks/APIHooks';
import { AsyncStorage } from 'react-native';

const EditProfile = ({ navigation }) => {
    const {
        handleUsernameChange,
        handleEmailChange,
        handlePasswordChange,
        inputs,
    } = useForms();

    const edit = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            await fetchPut('users', inputs, token);
            navigation.navigate('Profile');
        } catch (error) {
            console.log('edit error: ', error.message);
        }
    }
    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent icon onPress={() => navigation.navigate('Profile')}>
                        <Icon name='arrow-back' />
                        <Text style={{fontSize: 20}}>Back</Text>
                    </Button>
                </Left>
                <Body>
                    <Title>Edit</Title>
                </Body>
                <Right />
            </Header>
            <Content>
                <Title style={{top: 20}}>All fields are optional</Title>
                <Form style={{top: 20}}>
                    <Item>
                        <Input autoCapitalize='none' placeholder='New username...' onChangeText={handleUsernameChange} value={inputs.username} />
                    </Item>
                    <Item>
                        <Input autoCapitalize='none' placeholder='New email...' onChangeText={handleEmailChange} value={inputs.email} />
                    </Item>
                    <Item>
                        <Input secureTextEntry placeholder='New password...' onChangeText={handlePasswordChange} value={inputs.password} />
                    </Item>
                    <Button full success onPress={edit}>
                        <Text>Update</Text>
                    </Button>
                </Form>
            </Content>
        </Container>
    );
};

export default EditProfile;
