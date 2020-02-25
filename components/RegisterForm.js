import React from 'react';
import { Form, Item, Input, Label, Button, Text } from 'native-base';

const RegisterForm = () => {
    return (
        <Form>
            <Item floatingLabel>
                <Label>Username</Label>
                <Input />
            </Item>
            <Item floatingLabel>
                <Label>Email</Label>
                <Input />
            </Item>
            <Item floatingLabel>
                <Label>Full name</Label>
                <Input />
            </Item>
            <Item floatingLabel>
                <Label>Password</Label>
                <Input secureTextEntry />
            </Item>
            <Item floatingLabel>
                <Label>Retype password</Label>
                <Input />
            </Item>
            <Button full success>
                <Text>
                    Register!
                </Text>
            </Button>
        </Form>
    );
};

export default RegisterForm;