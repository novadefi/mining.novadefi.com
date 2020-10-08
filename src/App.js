import React, { useState, useEffect } from "react";
import AnimatedNumber from "animated-number-react";
import "./App.css";
import { useFetch } from "./hooks";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
// import DarkThemeHighchart from "highcharts/themes/dark-unica";
import IconButton from "@material-ui/core/IconButton";

import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Moment from "react-moment";
import { UnpaidState, WorkersState } from "./Stats/Stats";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Card from "@material-ui/core/Card";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
// import Box from "@material-ui/core/Box";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Switch from "@material-ui/core/Switch";
// import Paper from "@material-ui/core/Paper";
// import DashboardIcon from "@material-ui/icons/Dashboard";
import { NMTLogo, NMTFullLog } from "./Shared/Logo";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

function Copyright(darkTheme) {
  return (
    <Typography
      theme={darkTheme}
      variant="body2"
      color="textSecondary"
      align="center"
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        NMT
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  changeTime: {
    flexGrow: 1,
    float: "right",
  },
  // currency:{
  //   float: 'right'
  // },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  // margin: {
  //   margin: theme.spacing(1),
  // },
  // extendedIcon: {
  //   marginRight: theme.spacing(1),
  // },
}));

function MainLogo() {
  const classes = useStyles();

  return (
    <center>
      <img src="./Shared/nmt-full.svg" alt="" />
    </center>
  );
}

const timezone = new Date().getTimezoneOffset();

const theme = createMuiTheme({
  background: "linear-gradient(45deg, #aaa 30%, #FF8E53 90%)",
  palette: {
    primary: {
      light: "#673ab7",
      main: "#673ab7",
      dark: "#673ab7",
      contrastText: "#fff",
    },
    secondary: {
      light: "#673ab7",
      main: "#673ab7",
      dark: "#673ab7",
      contrastText: "#000",
    },
  }
});

function workersChart(json, darkTheme) {
  let validShares = [];
  let workers = [];
  let staleShares = [];

  json.forEach((item) => {
    validShares.push([item.time, item.validShares]);
    workers.push([item.time, item.activeWorkers]);
    staleShares.push([item.time, item.staleShares]);
  });

  let finalJson = [
    {
      // yAxis: 1,
      type: "area",
      name: "Valid Shares",
      data: validShares,
    },
    {
      yAxis: 1,
      type: "area",
      name: "Workers",
      data: workers,
    },
    {
      // yAxis: 1,
      type: "area",
      name: "Stale Shares",
      data: staleShares,
    },
  ];
  // console.log(finalJson);

  // darkUnica(Highcharts);

  return (
    <HighchartsReact
      options={{
        global: {
          timezoneOffset: timezone,
        },
        chart: {},
        title: {
          text: "Shares & Workers",
        },
        yAxis: [
          {
            opposite: true,
            title: {
              text: "Shares",
            },
            labels: {
              formatter: function () {
                return this.value / 1000 + "K";
              },
            },
          },
          {
            tickInterval: 10,
            max: 35,
            min: 0,
            title: {
              text: "Workers",
            },
            // labels: {
            //   formatter: function () {
            //     return this.value
            //   },
            // },
          },
        ],
        xAxis: {
          type: "datetime",
          formatter: function () {
            return Highcharts.dateFormat("%Y %M %d", this.value);
          },
          labels: {
            overflow: "justify",
          },
        },

        series: finalJson,
      }}
      highcharts={Highcharts}
    />
  );
}

function hashrateChart(json, darkTheme) {
  let currentHashrates = [];
  let reportedHashrates = [];
  let avgHashrates = [];

  json.forEach((item) => {
    currentHashrates.push([item.time, item.currentHashrate]);
    reportedHashrates.push([item.time, item.reportedHashrate]);
    avgHashrates.push([
      item.time,
      (item.currentHashrate + item.reportedHashrate) / 2,
    ]);
  });

  let finalJson = [
    {
      name: "Reported Hashrat",
      data: reportedHashrates,
    },
    {
      name: "Currrent Hashrat",
      data: currentHashrates,
    },
    {
      name: "Average Hashrat",
      data: avgHashrates,
    },
  ];
  // console.log(finalJson);
  return (
    <HighchartsReact
      options={{
        // theme: {(darkTheme ? DarkThemeHighchart:'')},
        global: {
          timezoneOffset: timezone,
        },
        chart: {
          type: "area",
        },
        title: {
          text: "Hashrates",
        },
        yAxis: {
          opposite: true,
          // tickInterval: 5,
          // type: 'logarithmic',
          title: {
            text: "Hashrates",
          },
          labels: {
            formatter: function () {
              return (this.value / 1000000000).toFixed(1) + " GHz";
            },
          },
        },
        xAxis: {
          type: "datetime",
          formatter: function () {
            return Highcharts.dateFormat("%Y %M %d", this.value);
          },
          labels: {
            overflow: "justify",
          },
        },

        plotOptions: {
          // line: {
          //   dataLabels: {
          //     enabled: false,
          //   },
          //   enableMouseTracking: true,
          // },
          // spline:{
          //   pointInterval: 3600000, // one hour
          // }
        },
        series: finalJson,
      }}
      highcharts={Highcharts}
    />
  );
}

function App() {
  const classes = useStyles();
  const { response, loading, error } = useFetch(
    "https://api.ethermine.org/miner/26efbfe4f747322AEb106a47Aa206e7c83EF10d6/dashboard"
  );
  // const { response2, loading2, error2 } = useFetch(
  //   "https://api.ethermine.org/miner/26efbfe4f747322AEb106a47Aa206e7c83EF10d6/currentStats"
  // );
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";

  const [currencyState, setCurrency] = useState("ETH");
  const [earningRate, setEarningRate] = useState(0);
  const [unpaid, setUnpaid] = useState(0);
  const [earningTimeState, setEarningTime] = useState("Daily");
  const [fractionDigit, setFractionDigit] = useState(5);

  const [currentState, setCurrentState] = useState(null);
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });

  // useEffect(() => {
  //   if (currencyState === "ETH") {
  //     setUnpaid(currencyState.data.unpaid * (currencyState.data.unpaid*10e18))
  //     setFractionDigit(6);
  //     setCurrency("BTC");
  //   } else if (currencyState === "BTC") {
  //     setUnpaid(currencyState.data.unpaid * (currencyState.data.unpaid*10e18*(currencyState.data.btcPerMin/currencyState.data.coinsPerMin)))
  //     setFractionDigit(2);
  //     setCurrency("USD");
  //   } else if (currencyState === "USD") {
  //     setUnpaid(currencyState.data.unpaid * (currencyState.data.unpaid*10e18*(currencyState.data.usdPerMin/currencyState.data.coinsPerMin)))
  //     setFractionDigit(5);
  //     setCurrency("ETH");
  //   }
  // }, [currencyState]);

  const formatValue = (value) => value.toFixed(fractionDigit);

  const handleChangeTime = () => {
    if (earningTimeState === "Daily") {
      setEarningTime("Weekly");
    } else if (earningTimeState === "Weekly") {
      setEarningTime("Monthly");
    } else if (earningTimeState === "Monthly") {
      setEarningTime("Daily");
    }
  };

  const handleChangeCurrency = () => {
    if (currencyState === "ETH") {
      setFractionDigit(6);
      setCurrency("BTC");
    } else if (currencyState === "BTC") {
      setFractionDigit(2);
      setCurrency("USD");
    } else if (currencyState === "USD") {
      setFractionDigit(5);
      setCurrency("ETH");
    }
  };

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  useEffect(() => {
    fetch(
      "https://api.ethermine.org/miner/26efbfe4f747322AEb106a47Aa206e7c83EF10d6/currentStats"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setCurrentState(result);

          if (currencyState === "ETH") {
            setEarningRate(result.data.coinsPerMin);
            setUnpaid(result.data.unpaid / 10e17);
          } else if (currencyState === "USD") {
            setEarningRate(result.data.usdPerMin);
            setUnpaid(
              (result.data.unpaid / 10e17) *
                (result.data.usdPerMin / result.data.coinsPerMin)
            );
          } else if (currencyState === "BTC") {
            setEarningRate(result.data.btcPerMin);
            setUnpaid(
              (result.data.unpaid / 10e17) *
                (result.data.btcPerMin / result.data.coinsPerMin)
            );
          }
        },

        (error) => {}
      );
    // alert(`weekly ${response2.data.usdPerMin * 60 * 24 * 7}!`)
  }, [currencyState]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <React.Fragment>{error && <p>Something went wrong...</p>}</React.Fragment>
      <React.Fragment>
        <AppBar position="sticky"
        color ="primary"
        >
          <Toolbar>
            <NMTLogo className={classes.icon} />
            {loading && (
              <CircularProgress
                color="secondary"
                text="Loading..."
                value={50}
              />
            )}
            <Switch checked={darkState} onChange={handleThemeChange} />
          </Toolbar>
        </AppBar>
        <main >
          <Container className={classes.cardGrid} maxWidth="md">
            <NMTFullLog className={classes.icon} darkTheme={!darkState} />
            <Grid container spacing={12}>
              <Grid item xs={12}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h5">
                      Address:
                    </Typography>
                    <Typography>
                      0x26efbfe4f747322AEb106a47Aa206e7c83EF10d6
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <br />
            <br />
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={4}>
                <Card>
                  <CardContent style={{ padding: 0 }}>
                    {response ? (
                      <WorkersState
                        active={response.data.currentStatistics.activeWorkers}
                        inacive={0}
                      />
                    ) : (
                      ""
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item key={3} xs={12} sm={6} md={4}>
                <Card>
                  <CardContent style={{ padding: 0 }}>
                    {unpaid ? (
                      <UnpaidState
                        clickEvent={handleChangeCurrency}
                        currency={currencyState}
                        unpaid={unpaid.toFixed(fractionDigit)}
                      />
                    ) : (
                      ""
                    )}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item key={2} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h5">
                      Estimated Earnings
                    </Typography>
                    <Typography>
                      <span>
                        {earningRate ? (
                          <AnimatedNumber
                            value={
                              earningRate *
                              60 *
                              24 *
                              (earningTimeState === "Weekly"
                                ? 7
                                : earningTimeState === "Monthly"
                                ? 30
                                : 1)
                            }
                            formatValue={formatValue}
                          />
                        ) : (
                          ""
                        )}{" "}
                        <span
                          onClick={handleChangeCurrency}
                          className={classes.currency}
                        >
                          {currencyState}
                          <IconButton
                            aria-label="delete"
                            className={classes.margin}
                            size="small"
                            color ="secondary"
                          >
                            <SwapHorizIcon fontSize="inherit" />
                          </IconButton>
                        </span>
                      </span>
                      <span
                        onClick={handleChangeTime}
                        className={classes.changeTime}
                      >
                        {earningTimeState}
                        <IconButton
                          aria-label="delete"
                          className={classes.margin}
                          size="small"
                          color ="secondary"
                          color ="secondary"
                          >
                          <SwapHorizIcon fontSize="inherit" />
                        </IconButton>
                      </span>
                    </Typography>
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item key={4} xs={12} sm={6}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h6" component="h5">
                      Hashrates
                    </Typography>
                    <Typography>
                      {response
                        ? (
                            response.data.currentStatistics.currentHashrate /
                            10e8
                          ).toFixed(1) + " GH/z"
                        : ""}
                    </Typography>
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              </Grid>
              <Grid item key={5} xs={12} sm={6}>
                <Card className={classes.card}>
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h4">
                      Shares
                    </Typography>
                    <Typography>
                      {response
                        ? response.data.currentStatistics.validShares
                        : ""}
                    </Typography>
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              </Grid>
            </Grid>
            <br />
            <br />
            <React.Fragment>
              {response
                ? hashrateChart(response.data.statistics, darkTheme)
                : ""}
            </React.Fragment>
            <br />
            <React.Fragment>
              {response
                ? workersChart(response.data.statistics, darkTheme)
                : ""}
            </React.Fragment>
            <br />
            <React.Fragment>
              {response ? (
                <MaterialTable
                  theme={theme}
                  title={`Active Workers (${response.data.currentStatistics.activeWorkers})`}
                  options={{
                    search: true,
                    sorting: true,
                    paging: false,
                    showTitle: true,
                    rowStyle: (rowData) => {
                      if (rowData.tableData.id % 2 === 0) {
                        return { backgroundColor: (!darkState ? "#faead1" : "#333333"), margin: 10 };
                      } else {
                        return { backgroundColor: (!darkState ? "#fff5e5" : "#404040"), margin: 10 };
                      }
                    },
                    headerStyle: {
                      backgroundColor: "#673ab7",
                      color: "#FFF",
                    },
                    // rowStyle: (rowData) => {
                    //   if (rowData.tableData.id % 2 === 0) {
                    //     return { backgroundColor: "#e6e6ff", margin: 10 };
                    //   } else {
                    //     return { backgroundColor: "#eee", margin: 10 };
                    //   }
                    // },
                    // headerStyle: {
                    //   backgroundColor: "#01579b",
                    //   color: "#FFF",
                    // },
                  }}
                  columns={[
                    { field: "worker", title: "Name" },
                    { field: "time", hidden: true },
                    {
                      field: "reportedHashrate",
                      title: "Reported Hashrate",
                      render: (rowData) =>
                        `${(rowData.reportedHashrate / 1000000).toFixed(
                          1
                        )} MH / s`,
                    },
                    {
                      field: "currentHashrate",
                      title: "Currrent Hashrate",
                      render: (rowData) =>
                        `${(rowData.reportedHashrate / 1000000).toFixed(
                          1
                        )} MH / s`,
                    },
                    { field: "validShares", title: "Valid Shares" },
                    { field: "staleShares", title: "Stale Shares" },
                    { field: "invalidShares", title: "Invalid Shares" },
                    {
                      field: "lastSeen",
                      title: "Last Seen",
                      type: "datetime",
                      render: (rowData) => (
                        <Moment fromNow>
                          {new Date(parseInt(rowData.lastSeen) * 1000)}
                        </Moment>
                      ),
                    },
                  ]}
                  data={response.data.workers}
                />
              ) : (
                ""
              )}
            </React.Fragment>
          </Container>
        </main>
        {/* Footer */}
        <footer>
          <Typography variant="subtitle1" align="center" component="p">
            {" "}
          </Typography>
          <Copyright />
          <br />
        </footer>
        {/* End footer */}
      </React.Fragment>
    </ThemeProvider>
  );
}
export default App;
