import { Component } from "react";
import { Platform, View } from "react-native";
import {
    LineChart,

  } from "react-native-chart-kit";
  import { Dimensions } from "react-native";

export default class Grafica extends Component{
    constructor(props){
        super(props);
        this.state={
            datos:[],
            fechas: [],
        }
    }
     
    componentDidMount(){
        const{symbol}=this.props;
        this.historico(symbol);
    }

    historico=async(symbol)=>{
        try {
            const response = await fetch(
              `https://api.binance.com/api/v1/klines?symbol=${symbol}USDT&interval=1d&limit=8`
            );
            if (!response.ok) {
              throw new Error(`La solicitud a la API falló con código de estado: ${response.status}`);
            }
            const data = await response.json();

            const prices = data.map((item) => parseFloat(item[4]));
            const dates = data.map((item) => new Date(item[0]));
      
            const formattedDates = dates.map((date) => {
              const options = { dia: 'numeric', mes: 'short' };
              return date.toLocaleString('default', options);
            });
      
      
            this.setState({ datos: prices, fechas: formattedDates });
          } catch (error) {
            console.error('Error:', error);
          }
    }
    render(){
       
if(Platform.OS==="web"){


        return(
            <View>
 <LineChart
    data={{
      labels: this.state.fechas,
      datasets: [
        {
          data: this.state.datos
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#001958",
      backgroundGradientFrom: "#001958",
      backgroundGradientTo: "#001958",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
            </View>
        )
}
    }
}