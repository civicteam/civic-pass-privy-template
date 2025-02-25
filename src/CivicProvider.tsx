import {
  EthereumGatewayWallet,
  GatewayProvider,
} from "@civic/ethereum-gateway-react";

export default function CivicProvider({
  wallet,
  children,
}: {
  wallet: EthereumGatewayWallet | undefined;
  children: React.ReactNode;
}) {
  return (
    <GatewayProvider
      wallet={wallet}
      gatekeeperNetwork={"vaa1QRNEBb1G2XjPohqGWnPsvxWnwwXF67pdjrhDSwM"}
    >
      {children}
    </GatewayProvider>
  );
}
