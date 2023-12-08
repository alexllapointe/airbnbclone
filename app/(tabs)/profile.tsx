import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import Login from '../(modals)/login';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

export default function Profile() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUserName(currentUser?.email || '');
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Alert.alert("Logout Successful");
      })
      .catch((error) => {
        Alert.alert("Logout Error", error.message);
      });
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <View style={styles.card}>
            {!editingName ? (
              <>
                <Text style={styles.nameText}>{userName}</Text>
                <Text style={styles.emailText}>Email: {user.email}</Text>
                <TouchableOpacity onPress={() => setEditingName(true)}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TextInput
                  value={userName}
                  onChangeText={setUserName}
                  style={styles.input}
                />
                <TouchableOpacity onPress={() => setEditingName(false)}>
                  <Text>Save</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={() => setShowLoginModal(true)} style={styles.loginLink}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      )}

      <Login initialVisibility={showLoginModal} onClose={handleCloseModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    height: 200,
    padding: 20,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nameText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    width: 200,
    marginVertical: 10,
  },
  loginLink: {},
  loginText: {
    padding: 20,
    fontSize: 24,
    color: 'black',
  },
  logoutButton: {
    backgroundColor: '#FF5733',
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
  }, editText: {
    fontSize: 12,
    textDecorationLine: 'underline',
    paddingTop: 18,
  }
});
