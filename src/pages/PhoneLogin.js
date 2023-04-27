import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebaseconfig from '../firebaseconfig';
import "./Phone.css";
function PhoneLogin() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');

  const handleSendCode = () => {
    const appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setVerificationId(confirmationResult.verificationId);
      }).catch((error) => {
        console.log(error);
      });
  };

  const handleVerifyCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, verificationCode);
    firebase.auth().signInWithCredential(credential)
      .then((result) => {
        alert ('Succesfully Authenticated')
      }).catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <h1>Phone Verification With FireBase</h1>
      <div>
        <label>Enter phone number:</label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </div>
      <div id="recaptcha-container"></div>
      <button onClick={handleSendCode}>Send verification code</button>
      {verificationId &&
        <div>
          <label>Enter verification code:</label>
          <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
          <button onClick={handleVerifyCode}>Verify code</button>
        </div>
      }
    </div>
  );
}

firebase.initializeApp(firebaseconfig);

export default PhoneLogin;
