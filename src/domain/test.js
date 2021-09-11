import { test } from "../assets/test.js";
import Web3 from "./web3";
import moment from "moment";

class PaymentsService {
  getPaymentsOfAccount = async function(address, account, unit) {
    const web3 = await Web3();
    if (!web3) {
      return undefined;
    }

    const contract = await new web3.eth.Contract(test.abi1, address);
    const count = await contract.methods.paymentsOf(account).call();
    const payments = await Promise.all(
      Array(parseInt(count))
        .fill()
        .map(async (el, index) => {
          const payment = await contract.methods
            .paymentOfAt(account, index)
            .call();
          const amount = !payment[1]
            ? ""
            : web3.utils.fromWei(payment[1], unit);
          const date = !payment[2]
            ? ""
            : moment(payment[2], "X").format("YYYY-MM-DDTHH:mm:ss");
          return {
            reference: payment[0],
            amount: amount,
            date: date,
          };
        })
    );
    return payments;
  };

  getNetwork = async function() {
    const web3 = await Web3();
    if (!web3) {
      return undefined;
    }
    const network = web3.currentProvider.networkVersion;
    switch (network) {
      case "1":
        return "Mainnet";
      case "2":
        return "Morden";
      case "3":
        return "Ropsten";
      case "4":
        return "Rinkeby";
      case "42":
        return "Kovan";
      default:
        return "Unknown";
    }
  };

  getLoggedAccount = async function() {
    const web3 = await Web3();
    if (!web3) {
      return undefined;
    }
    const accounts = await web3.eth.getAccounts();

    return accounts && accounts.length > 0 ? accounts[0] : undefined;
  };
}

export default PaymentsService;
