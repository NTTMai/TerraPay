import React from "react";

const Terra = require("@terra-money/terra.js");

class ContactPage extends React.Component {
  constructor() {
    super();

    this.state = {
      balance: 0,
    };
  }

  async componentWillMount() {
    const terra = new Terra.LCDClient({
      URL: "https://soju-lcd.terra.dev/",
      chainID: "soju-0014",
    });

    const balance = await terra.bank.balance(
      "terra1xmscr6yzp78w6zc2gdxjgyafjw4h6ec90h5mxw"
    );

    console.log(balance._coins.uluna.amount.d[0]);
    this.setState({
      balance: balance._coins.uluna.amount.d[0],
    });
  }

  render() {
    return (
      <div>
        <h2>Terra Wallet:</h2>
        <span>Address: terra1xmscr6yzp78w6zc2gdxjgyafjw4h6ec90h5mxw</span>
        <br />
        <span>Balance: {this.state.balance} LUNA</span>
      </div>
    );
  }
}

export default ContactPage;
