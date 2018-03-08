// @flow
import React from 'react';
import { AppLoading } from 'expo';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { TabNavigator } from 'react-navigation';
import { Container, Content, H1 } from 'native-base';

import styled from 'styled-components';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://api.example.com/graphql' }),
  cache: new InMemoryCache(),
});

const StyledH1 = styled(H1)`
  color: red;
`;

const Home = () => (
  <Container>
    <Content>
      <H1>Home</H1>
    </Content>
  </Container>
);
const About = () => (
  <Container>
    <Content>
      <StyledH1>About</StyledH1>
    </Content>
  </Container>
);

const Navigator = TabNavigator({
  Home: { screen: Home },
  About: { screen: About },
});

type Props = {};

type State = { isLoadingComplete: boolean };

export default class App extends React.Component<Props, State> {
  state = {
    isLoadingComplete: false,
  };

  _loadResourcesAsync = async () => Promise.all([]);

  _handleLoadingError = (error: Error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({
      isLoadingComplete: true,
    });
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
    }
    return (
      <ApolloProvider client={client}>
        <Navigator />
      </ApolloProvider>
    );
  }
}
