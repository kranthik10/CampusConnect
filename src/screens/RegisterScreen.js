// Registration screen for CampusConnect

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Picker,
} from 'react-native';
import { registerUser, verifyCollegeEmail, getAllColleges } from '../utils/api';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(false);
  
  const colleges = getAllColleges();
  const years = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];

  const handleRegister = () => {
    setLoading(true);
    
    // Validation
    if (!name || !email || !password || !college || !major || !year) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      setLoading(false);
      return;
    }
    
    // Validate email
    const emailValidation = verifyCollegeEmail(email);
    if (!emailValidation.isValid) {
      Alert.alert('Invalid Email', emailValidation.message);
      setLoading(false);
      return;
    }
    
    // Mock registration
    const userData = {
      name,
      email,
      college,
      major,
      year,
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
      interests: [],
      bio: '',
      connections: [],
      createdAt: new Date().toISOString(),
    };
    
    const result = registerUser(userData);
    
    if (result.success) {
      Alert.alert(
        'Registration Successful',
        'Your account has been created. Please log in.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } else {
      Alert.alert('Registration Failed', 'Please try again');
    }
    
    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join CampusConnect to connect with students</Text>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
        
        <TextInput
          style={styles.input}
          placeholder="College Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>College</Text>
          <Picker
            selectedValue={college}
            style={styles.picker}
            onValueChange={(itemValue) => setCollege(itemValue)}
          >
            <Picker.Item label="Select your college" value="" />
            {colleges.map((college, index) => (
              <Picker.Item key={index} label={college} value={college} />
            ))}
          </Picker>
        </View>
        
        <TextInput
          style={styles.input}
          placeholder="Major"
          value={major}
          onChangeText={setMajor}
        />
        
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Year</Text>
          <Picker
            selectedValue={year}
            style={styles.picker}
            onValueChange={(itemValue) => setYear(itemValue)}
          >
            <Picker.Item label="Select your year" value="" />
            {years.map((year, index) => (
              <Picker.Item key={index} label={year} value={year} />
            ))}
          </Picker>
        </View>
        
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.registerButtonText}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2e6ff2',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  pickerContainer: {
    marginBottom: 15,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  picker: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    height: 50,
  },
  registerButton: {
    backgroundColor: '#2e6ff2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#666',
    marginRight: 5,
  },
  loginLink: {
    color: '#2e6ff2',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;