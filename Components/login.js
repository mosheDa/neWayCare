import React from 'react';
import {AsyncStorage, StatusBar, Platform, Text, View, Button, StyleSheet } from 'react-native';
import Auth0 from 'react-native-auth0';

const auth0 = new Auth0({ domain: 'uploadapp.eu.auth0.com', clientId: 'EdO35gxmDl3r3YcvE7x4WkrKEhN6s4Xd' });

export default class Login extends React.Component {
  state = {
    accessToken: null,
    avatar: null,
    name: null
  }

  componentWillMount() {
      AsyncStorage.getItem('userData', (err, userData) => {
        if(userData){
          console.log('initial Data',userData);
          this.setState(JSON.parse(userData))
          this.props.navigation.navigate("Intro");        
        }

      });
  }

  handleLogin = () => {
    auth0
      .webAuth
      .authorize({scope: 'openid profile email', audience: 'https://uploadapp.eu.auth0.com/userinfo'})
      .then((credentials) => {
        auth0
          .auth
          .userInfo({token: credentials.accessToken})
          .then((user) => {
            const userData = {
              accessToken: credentials.accessToken,
              avatar: user.picture,
              name: user.nickname
            }
            console.log("user data after log:", userData)

            AsyncStorage.setItem('userData',JSON.stringify(userData),
              () => {this.setState(userData)
              this.props.navigation.navigate("Intro")},
              (error) => console.log(error)
            );
          })
          .catch(error => console.error(error))
      })
      .catch(error => console.error(error));
  }

  handleLogout = () => {
    this.setState({
      accessToken: null,
      avatar: null,
      name: null
    });
    AsyncStorage.clear()
  }

  renderStatusBar = () => <StatusBar backgroundColor={COLORS.secondary} barStyle="dark-content" />;

  render = () => {
    const styles = StyleSheet.create({
        loginTextSection: {
           width: '100%',
           height: '30%',
        },
     
        loginButtonSection: {
           width: '100%',
           height: '30%',
           justifyContent: 'center',
           alignItems: 'center'
        },
     
        loginButton: {
          backgroundColor: 'blue',
          color: 'white'
        }
     })
    const { accessToken } = this.state;    
    return (
      <View style={styles.loginButtonSection}>
           <Button
                title={accessToken ? 'Logout' : 'Login'}
                onPress={accessToken ? this.handleLogout : this.handleLogin}
                style={styles.loginButton}
            />

            <Button
                title={'Next'}
                onPress={() => {this.props.navigation.navigate("Intro")}}
                style={styles.loginButton}
            />
    </View>
    );
  };
}