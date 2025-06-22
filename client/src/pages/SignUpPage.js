import { useEffect, useState, useContext } from 'react';
import { Tabs, Tab, Card, Container, Button } from 'react-bootstrap';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

function SignUpPage() {
  useEffect(() => {
    document.title = "Welcome to The Loop";
  }, []);

  const [activeKey, setActiveKey] = useState('signIn');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleContinueAsGuest = () => {
    const guestUser = {
      id: 'guest',
      firstName: 'Guest',
      lastName: 'User',
      isGuest: true
    };
    localStorage.setItem('user', JSON.stringify(guestUser));
    login(guestUser);
    navigate('/');
  };

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

      <div className="text-center mt-3">
          <Button variant="primary" onClick={handleContinueAsGuest}>
            Continue as Guest
          </Button>
      </div>
    </Container>
  );
}

export default SignUpPage;
