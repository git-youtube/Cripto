import { Component,  } from "react";
import { View, StyleSheet, Text, Image } from "react-native";

export default class Moneda extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    eliminarParametro(symbol) {
        const filtrado = symbol.replace("USDT", "");
        return filtrado;
    }
    render() {
        const { coin } = this.props;
        const filtrado = this.eliminarParametro(coin.symbol);

        return (
            <View style={styles.containerItem}>
            <View style={styles.coinName}>
              <View style={styles.containerNames}>
                <Text style={styles.coinName}>{filtrado}</Text>
                <Text style={styles.textSymbol}>{coin.symbol}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.textPrice}>${coin.priceChange}</Text>
              <Text
                style={[
                  styles.pricePercentage,
                  coin.priceChangePercent > 0
                    ? styles.priceUp
                    : styles.priceDown,
                ]}
              >
                {coin.priceChangePercent}%
              </Text>
            </View>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    containerItem: {
      backgroundColor: "#121212",
      paddingTop: 10,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    containerNames: {
      marginLeft: 10,
    },
    coinName: {
      flexDirection: "row",
      color: 'white',
    },
    text: {
      color: "#fff",
    },
    textPrice: {
      color: "#fff",
      fontWeight: "bold",
    },
    pricePercentage: {
      textAlign: "right",
    },
    priceUp: {
      color: "#00B589",
    },
    priceDown: {
      color: "#fc4422",
    },
    image: {
      width: 30,
      height: 30,
    },
    textSymbol: {
      color: "#434343",
      textTransform: "uppercase",
    },
  });