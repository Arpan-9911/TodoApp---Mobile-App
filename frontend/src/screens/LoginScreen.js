import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { sendOTP, verifyOTP } from '../actions/authActions';

export default function LoginScreen() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();

  const handleSendOTP = () => {
    if (!email.trim()) return Alert.alert('Empty', 'Please enter your email');
    if (!/\S+@\S+\.\S+/.test(email))
      return Alert.alert('Invalid Email', 'Please enter a valid email');

    try {
      dispatch(sendOTP({ email }));
      setStep(2);
      Alert.alert('OTP Sent', `OTP sent to ${email}`);
    } catch (err) {
      Alert.alert('Error', err.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6 || isNaN(otp))
      return Alert.alert('Invalid OTP', 'Please enter a 6-digit OTP');

    try {
      await dispatch(verifyOTP({ email, otp }));
      Alert.alert('Success', 'OTP verified successfully');
    } catch (err) {
      Alert.alert('Error', err.message || 'OTP verification failed');
      setOtp(''); // Clear OTP input on failure
      setStep(1);
    }
  };

  return (
    <View style={styles.container}>
      {step === 1 ? (
        <>
          <Text style={styles.title}>Login</Text>
          <TextInput
            placeholder="Enter Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Verify OTP</Text>
          <TextInput
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 26, marginBottom: 24, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
