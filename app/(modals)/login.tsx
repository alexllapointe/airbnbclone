import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { auth, firestore } from '../../firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';


const screenHeight = Dimensions.get('window').height;

interface LoginModalProps {
    initialVisibility: boolean;
    onClose: () => void;
}

const Login: React.FC<LoginModalProps> = ({ initialVisibility, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [screen, setScreen] = useState('email');
    const [isVisible, setIsVisible] = useState(initialVisibility);

    useEffect(() => {
        setIsVisible(initialVisibility);
    }, [initialVisibility]);

    const close = () => {
        setIsVisible(false);
        setScreen('email');
        onClose();
    };

    const createUserInFirestore = async (user: { uid: any; email: any; }) => {
        try {
            await addDoc(collection(firestore, "users"), {
                uid: user.uid,
                email: user.email,
            });
            console.log("User added to Firestore");
        } catch (error) {
            console.error("Error adding user to Firestore: ", error);
        }
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                Alert.alert("Login Success");
                close();
            })
            .catch(error => {
                Alert.alert("Login Error", error.message);
            });
    };

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const newUser = userCredential.user;
                createUserInFirestore(newUser).then(() => {
                    Alert.alert("Registration Success");
                    close();
                }).catch(error => {
                    console.error("Error adding user to Firestore: ", error);
                    Alert.alert("Registration Error", "Failed to add user to Firestore: " + error.message);
                });
            })
            .catch(error => {

                Alert.alert("Registration Error", error.message);
            });
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => setIsVisible(false)}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={close} style={styles.closeButton}>
                        <FontAwesome name="close" size={24} color="black" />
                    </TouchableOpacity>
                    {screen === 'email' && (
                        <>
                            <TextInput
                                style={styles.input}
                                onChangeText={setEmail}
                                value={email}
                                placeholder="Email"
                                keyboardType="email-address"
                            />
                            <TouchableOpacity onPress={() => setScreen('password')} style={styles.button}>
                                <Text style={styles.buttonText}>Continue</Text>
                            </TouchableOpacity>

                            {/* Separator */}
                            <Text style={styles.orText}>or</Text>

                            {/* Social Login Buttons */}
                            <TouchableOpacity style={styles.socialButton}>
                                <FontAwesome5 name="phone" size={20} color="black" />
                                <Text style={styles.socialButtonText}>Continue with Phone</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <FontAwesome5 name="apple" size={20} color="black" />
                                <Text style={styles.socialButtonText}>Continue with Apple</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <FontAwesome5 name="google" size={20} color="black" />
                                <Text style={styles.socialButtonText}>Continue with Google</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <FontAwesome5 name="facebook" size={20} color="black" />
                                <Text style={styles.socialButtonText}>Continue with Facebook</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    {screen === 'password' && (
                        <>
                            <TextInput
                                style={styles.input}
                                onChangeText={setPassword}
                                value={password}
                                placeholder="Password"
                                secureTextEntry
                            />
                            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                                <Text style={styles.buttonText}>Enter</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setScreen('register')} style={styles.link}>
                                <Text style={styles.linkText}>Don't have an account? Register</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    {screen === 'register' && (
                        <>
                            <TextInput
                                style={styles.input}
                                onChangeText={setEmail}
                                value={email}
                                placeholder="Email"
                                keyboardType="email-address"
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={setPassword}
                                value={password}
                                placeholder="Password"
                                secureTextEntry
                            />
                            <TouchableOpacity onPress={handleRegister} style={styles.button}>
                                <Text style={styles.buttonText}>Register</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: '100%',
        height: screenHeight,
        backgroundColor: "white",
        padding: 35,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: '95%',
    },
    button: {
        backgroundColor: '#FF5733',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
    link: {
        marginTop: 20,
    },
    linkText: {
        color: 'blue',
        textAlign: 'center',
    },
    socialButton: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialButtonText: {
        flex: 1,
        textAlign: 'center',
    },
    orText: {
        textAlign: 'center',
        marginVertical: 20,
    },
    icon: {
        marginRight: 10,
    },
    modalHeader: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    closeButton: {
        position: 'absolute',
        left: 10,
        top: 10,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});


export default Login;
