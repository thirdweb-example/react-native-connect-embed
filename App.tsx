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
    <Box
      height="100%"
      justifyContent="center"
      paddingHorizontal="xmd"
      backgroundColor="background">
      {address ? (
        <Box gap="md">
          <Text textAlign="center">Welcome!</Text>
          <ConnectWallet />
        </Box>
      ) : (
        <Box gap="md">
          <Text textAlign="center">Welcome!</Text>
          <ConnectEmbed modalTitle="" modalTitleIconUrl="" />
        </Box>
      )}
    </Box>
  );
};

export default App;
