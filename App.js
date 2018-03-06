import React from "react";
import { Platform, StatusBar, StyleSheet, View, Text } from "react-native";
import { AppLoading, Asset, Font } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { NativeRouter, Route, Link } from "react-router-native";

import styled from "styled-components";

const client = new ApolloClient({
  link: new HttpLink({ uri: "https://api.example.com/graphql" }),
  cache: new InMemoryCache()
});

const Wrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StyledText = styled.Text`
  font-size: 20;
`;

const Home = () => <Text>Home</Text>;

const About = () => <Text>About</Text>;

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <ApolloProvider client={client}>
          <NativeRouter>
            <Wrapper>
              <View>
                <Link to="/">
                  <Text>Home</Text>
                </Link>
                <Link to="/about">
                  <Text>About</Text>
                </Link>
              </View>

              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
            </Wrapper>
          </NativeRouter>
        </ApolloProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
