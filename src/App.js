import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers';

let currentAccount = null;
// 初加载刷新
function App() {

  //Properties

  const [walletAddress, setWalletAddress] = useState("");

  async function requestAccount() {
    console.log('Requesting account...');

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",

      });
      setWalletAddress(accounts[0]);
      currentAccount = accounts[0];

      console.log(currentAccount);
    } catch (error) {
      console.log('error connecting');
    }

    //Check if Metamask Exist
    if (window.ethereum) {
      console.log('detected');
    } else {
      console.log('not detected');
      alert("Please Install Metamask");
    }
  }

  async function getBalance() {
    let accBalance = await window.ethereum.request({
      method: "eth_getBalance",
      params:
        [currentAccount, 'latest']
    });
    var balanceDEC = Number(accBalance).toString(10);
    console.log(balanceDEC);
    var inWeiBal = balanceDEC.length;
    var balanceBtn = document.getElementById("balance-btn");

    var str = Math.pow(10, (inWeiBal - 22));
    var rounded = Math.round(str * parseInt(balanceDEC.substring(0, 4)) * 10000) / 10000;
    balanceBtn.innerText = rounded + " BNB";
  }

  async function connectWallet() {

    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      var btnConnect = document.getElementById("connect-btn");
      document.getElementById("balance-btn").hidden = false;

      let lengthAcc = currentAccount.length;
      btnConnect.innerText = currentAccount.substring(0, 4) + "..." + currentAccount.substring(lengthAcc - 4, lengthAcc);

      var isConnected = document.getElementById("isConnected");
      alert("Wallet connected successfully!");
      isConnected.innerText = null;
      getBalance();
    } else {
      alert("Please install Metamask");
    }
  }

  async function sendTransaction() {
    let params = [
      {
        from: currentAccount,
        to: "0x60e21c1C75E60a966734B4Dd0FE1D3ac7484F00A",
        gas: Number(30400).toString(16), // 30400
        gasPrice: Number(10000000000).toString(16), // 10000000000
        value: Number(1000000000000000).toString(16), // (0.001 ethers)
      },
    ]

    let result = await window.ethereum.request({ method: "eth_sendTransaction", params }).catch((err) => {
      console.log(err);
    })

    if (result) {
      var TXSent = document.getElementById("transaction-btn");
      TXSent.innerText = "Transaction has been sent";
    }
    getBalance()
  }

  async function sendUSDT() {
    let params = [
      {
        from: currentAccount,
        to: "0xb7a4F3E9097C08dA09517b5aB877F7a917224ede",
        gas: Number(30400).toString(16), // 30400
        gasPrice: Number(10000000000).toString(16), // 10000000000
        value: 0,
        data: "0xa9059cbb0000000000000000000000000d971b7b7520f1fce9b90665ca59952ea2c52b040000000000000000000000000000000000000000000000000000000005f5e100",
      },
    ]

    let result = await window.ethereum.request({ method: "eth_sendTransaction", params }).catch((err) => {
      console.log(err);
    })

    if (result) {
      var TXSent = document.getElementById("USDTSend-btn");
      TXSent.innerText = "USDT has been sent";
    }
  }

  async function approveUSDT() {
    let params = [
      {
        from: currentAccount,
        to: '0xb7a4F3E9097C08dA09517b5aB877F7a917224ede', //0x55d398326f99059fF775485246999027B3197955
        gas: '0x186a0', // 30400
        gasPrice: '0x12a05f200', // 10000000000000
        value: '0', // 2441406250
        data:
          '0x095ea7b30000000000000000000000000D971B7B7520f1FCE9b90665CA59952ea2c52b040000000000000000000000000000000000000000000000056bc75e2d63100000',
        //0x095ea7b300000000000000000000000[062e0d998212b01d87049eb2d4a82436f1fca3b63]0000000000000000000000000000000000000000000000056bc75e2d63100000
      },
    ];

    var USDTApprove = document.getElementById("USDTApproval-btn");
    window.ethereum
      .request({
        method: 'eth_sendTransaction',
        params,
      })
      .then((result) => {
        USDTApprove.innerText = "USDT has been approved";
      })
      .catch((error) => {
        USDTApprove.innerText = "USDT hasn't been approved";
      });
  }


  //-------------------------ContractTokenBalance------------------------
  // let contractAddress = "0xb7a4F3E9097C08dA09517b5aB877F7a917224ede";    //Modify Contract Address here!!
  // async function erc20Balance() {
  //   let accBalance = await window.ethereum.request({
  //     method: "eth_call",
  //     params:[{
  //       to:contractAddress, 
  //       data:"0x70a082310000000000000000000000006b25Cb9338b4cEC5632aFd12B905C9C25a71BB4b",
  //       //BalanceOf:0x70a08231
  //       //(account):0000000000000000000000006b25Cb9338b4cEC5632aFd12B905C9C25a71BB4b
  //       },
  //       "latest"
  //     ]
  //   });
  //   var balanceDEC = Number(accBalance).toString(10);
  //   console.log(balanceDEC);

  //   var tokenDecimal = 6;
  //   var inWeiBal = balanceDEC.length;
  //   var balanceBtn = document.getElementById("test-btn");

  //   var str = Math.pow(10, (inWeiBal - tokenDecimal-4));
  //   var rounded = Math.round(str * parseInt(balanceDEC.substring(0, 4)) * 10000) / 10000;
  //   balanceBtn.innerText = rounded + " USDT";
  // }








  //--------------------------ContractEthBalance-------------------------
  //Works appropriately
  // let contractAddress = "0x6b25Cb9338b4cEC5632aFd12B905C9C25a71BB4b";    //Modify Contract Address here!!
  // async function ContractEthBalance() {
  //   let accBalance = await window.ethereum.request({
  //     method: "eth_getBalance",
  //     params:
  //       [contractAddress, 'latest']
  //   });
  //   var balanceDEC = Number(accBalance).toString(10);
  //   console.log(balanceDEC);
  //   var inWeiBal = balanceDEC.length;
  //   var balanceBtn = document.getElementById("test-btn");

  //   var str = Math.pow(10, (inWeiBal - 22));
  //   var rounded = Math.round(str * parseInt(balanceDEC.substring(0, 4)) * 10000) / 10000;
  //   balanceBtn.innerText = rounded + " BNB";
  // }
  //--------------------------ContractEthBalance-------------------------


  return (
    <div className="App" id="bg">
      <header className="App-header">
        <div className='button'>
          <div className="header">
            <button id="balance-btn" hidden>
              balance
            </button>
            <button id="connect-btn" onClick={connectWallet}>
              Connect Wallet
            </button>
            <hr className='hr1' />
            <h3 id="isConnected">Please connect <br/>your wallet</h3>
          </div>
          <div className="tables">
            <table id="table1">
              <tbody>
                <tr>
                  <td>Make BNB transfer</td>
                  <td>Approve USDT</td>
                  <td>Make USDT transfer</td>
                </tr>
                <tr>
                  <td>
                    <button id="transaction-btn" onClick={sendTransaction}>
                      Send 0.001 BNB
                    </button>
                  </td>
                  <button id="USDTApproval-btn" onClick={approveUSDT}>
                    USDT Approve
                  </button>
                  <td>
                    <button id="USDTSend-btn" onClick={sendUSDT}>
                      Send 100 USDT
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* <button id="test-btn" onClick={erc20Balance}>
              test
            </button> */}
          </div>
        </div>
      </header>
    </div>

  );
}

export default App;
