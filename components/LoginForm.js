import React from 'react';
import { Form, Item, Input, Label, Button, Text } from 'native-base';

const LoginForm = () => {
    return (
        <Form>
            <Item floatingLabel>
                <Label>Username</Label>
                <Input />
            </Item>
            <Item floatingLabel>
                <Label>Password</Label>
                <Input secureTextEntry />
            </Item>
            <Button full success>
                <Text>
                    Sign in!
                </Text>
            </Button>
        </Form>
    );
};

export default LoginForm;