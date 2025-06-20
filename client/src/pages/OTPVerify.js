import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Container } from "react-bootstrap";
import axios from "axios";
import API_BASE_URL from '../utils/API_Base_URL';

function VerifyOTP() {
  useEffect(() => {
    document.title = "Verify OTP";
  }, []);

  const [otp, setOtp] = useState("");
  const { state: form } = useLocation();
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const handleVerify = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/verifyOTP`, { email: form.email, code: otp });

      await axios.post(`${API_BASE_URL}/auth/register`, {
        email: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName
      });

      await axios.post(`${API_BASE_URL}/auth/signin`, { email: form.email, password: form.password }).then((res) => {
        localStorage.setItem("accessToken", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      })

      navigate('/');
    } catch (err) {
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error(err);
    }
  };

  return (
    <Container style={{ maxWidth: 480, marginTop: '2rem' }}>
      <Card className="p-3 text-center"
            style={{ backgroundColor: '#2f2f2f', color: '#f3efe9' }}>
        <h5>Enter the OTP sent to {form.email}:</h5>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderInput={(props, index) => (
            <input
              {...props}
              key={index}
              style={{
                width: 40,
                height: 40,
                margin: '0 5px',
                fontSize: '1.5rem',
                textAlign: 'center',
                border: '1px solid #ccc',
                borderRadius: 4
              }}
            />
          )}
          containerStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          shouldAutoFocus
        />

        {error && (
          <div className="alert alert-danger text-center mt-3" role="alert">
            {error}
          </div>
        )}

        <Button className="mt-3" onClick={handleVerify}>Verify OTP</Button>
      </Card>
    </Container>
  );
}

export default VerifyOTP;
