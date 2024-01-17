import {
  Box,
  ConnectEmbed,
  ConnectWallet,
  embeddedWallet,
  localWallet,
  metamaskWallet,
  rainbowWallet,
  Text,
  ThirdwebProvider,
  trustWallet,
  useAddress,
  walletConnect,
} from '@thirdweb-dev/react-native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TW_CLIENT_ID} from '@env';

const App = () => {
  return (
    <ThirdwebProvider
      activeChain="mumbai"
      clientId={TW_CLIENT_ID}
      supportedWallets={[
        metamaskWallet({
          recommended: true,
        }),
        rainbowWallet(),
        walletConnect({
          recommended: true,
        }),
        embeddedWallet({
          auth: {
            // you need to enable EmbeddedWallets under your API Key in your thirdweb dashboard:
            // https://thirdweb.com/dashboard/settings/api-keys
            options: ['email', 'google'],
            // you need to add this deeplink in your allowed `Redirect URIs` under your API Key in your thirdweb dashboard:
            // https://thirdweb.com/dashboard/settings/api-keys
            redirectUrl: 'rnstarter://',
          },
        }),
        trustWallet(),
        localWallet(),
      ]}>
      <AppInner />
    </ThirdwebProvider>
  );
};

const AppInner = () => {
  const address = useAddress();

  return (
    <View style={styles.view}>
      {address ? (
        <Box gap="md">
          <Text textAlign="center">Welcome!</Text>
          <ConnectWallet />
        </Box>
      ) : (
        <ConnectEmbed
          modalTitle="Sign in to get started"
          modalTitleIconUrl=""
          container={{
            borderRadius: 'md',
            paddingVertical: 'xl',
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'black',
    paddingHorizontal: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default App;
