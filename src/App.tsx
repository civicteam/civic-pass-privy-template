import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import {
  ButtonMode,
  EthereumGatewayWallet,
  IdentityButton,
} from "@civic/ethereum-gateway-react";
import { useEffect, useState } from "react";
import CivicProvider from "./CivicProvider";
import { BrowserProvider } from "ethers";

function App() {
  const { ready, login, authenticated, logout, user } = usePrivy();

  const { wallets } = useWallets();
  const [wallet, setWallet] = useState<EthereumGatewayWallet | undefined>(
    undefined
  );

  useEffect(() => {
    const setData = async () => {
      if (!wallets[0]) return;

      const provider = await wallets[0].getEthereumProvider();
      const etherv6Provider = new BrowserProvider(provider);
      const signer = await etherv6Provider.getSigner();

      setWallet({ address: wallets[0].address, signer: signer });
    };

    setData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.wallet]);
  if (!ready) return null;
  return (
    <CivicProvider wallet={wallet}>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {!authenticated ? (
          <button onClick={() => login({ loginMethods: ["wallet"] })}>
            Connect
          </button>
        ) : (
          <button onClick={() => logout()}>Disconnect</button>
        )}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <IdentityButton mode={ButtonMode.LIGHT} />

      <p className="read-the-docs">
        Connected wallet: {user?.wallet?.address || "None"}
      </p>
    </CivicProvider>
  );
}

export default App;
