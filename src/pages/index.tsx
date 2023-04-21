import { useEffect, useState } from "react";
import buyMeCoffeeAbi from "./../assets/Abi/buyMeCoffee.json";
import { ethers } from "ethers";
import BuyCoffee from "@/components/BuyCoffee";
import Memo from "@/components/Memo";

declare var window: any;

export default function Home() {
  const [account, setAccount] = useState("");
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  useEffect(() => {
    connectWallet()
  }, [])

  const connectWallet = async () => {
    const buyCoffeeAddress = "0x8591C0DD4C16906f9e51effd8f8b046c06B57C1d";
    const contractAbi = buyMeCoffeeAbi.abi;

    try {
      const { ethereum } = window;

      if (ethereum) {
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(account);
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        buyCoffeeAddress,
        contractAbi,
        signer
      );

      setState({ provider, signer, contract });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-between p-24">
      <div>
        <button
          type="button"
          className="inline-flex items-center gap-x-2 rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Connect Wallet { account && <span>Address: {account}</span> }
        </button>
      </div>

      {account && (
        <>
          <div className="pb-12 mt-4">
            <h6 className="text-3xl">Buy Me a Coffee</h6>
          </div>
          <div>
            <BuyCoffee state={state} />
            <Memo state={state} />
          </div>
        </>
      )}
    </div>
  );
}
