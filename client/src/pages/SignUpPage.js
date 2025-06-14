import React, { useState } from 'react';
import { Tabs, Tab, Card, Container } from 'react-bootstrap';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

function SignUpPage() {
  const [activeKey, setActiveKey] = useState('signIn');

  return (
    <Container style={{ maxWidth: '480px', marginTop: '2rem' }}>
      <Card className="p-3" style={{ backgroundColor: '#2f2f2f', color: '#f3efe9', border: '3px solid #f3efe9' }}>
        <Tabs id="auth-tabs" activeKey={activeKey} onSelect={setActiveKey} className="mb-3" variant="pills" fill justify>
          <Tab eventKey="signIn" title="Sign In">
            <SignInForm />
          </Tab>
          <Tab eventKey="signUp" title="Sign Up">
            <SignUpForm />
          </Tab>
        </Tabs>
      </Card>
    </Container>
  );
}

export default SignUpPage;