import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AnimatedNumber from "animated-number-react";
import SwapHorizIcon from "@material-ui/icons/SwapHoriz";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  currency: {
    padding: "1px;",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function WorkersState({ active, inacive }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h6" component="h5">
          Workers Active / Inactive
        </Typography>
        <Typography>
          {active} / {inacive}
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
function UnpaidState({ unpaid, currency = "ETH", clickEvent }) {
  const classes = useStyles();

  let fractionDigit = 5;

  if (currency === "ETH") {
    fractionDigit = 5;
  } else if (currency === "BTC") {
    fractionDigit = 6;
  } else if (currency === "USD") {
    fractionDigit = 2;
  }

  const formatValue = (value) => value.toFixed(fractionDigit);

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h6" component="h5">
          Unpaid blance
        </Typography>
        <Typography>
          <AnimatedNumber value={unpaid} formatValue={formatValue} />
          <span onClick={() => clickEvent()} className={classes.currency}>
            {" " + currency}
            <IconButton
              aria-label="delete"
              className={classes.margin}
              size="small"
              color ="secondary"
          
            >
              <SwapHorizIcon fontSize="inherit" />
            </IconButton>
          </span>
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}

export { WorkersState, UnpaidState };
