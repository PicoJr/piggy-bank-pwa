import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import LinearProgress from "@material-ui/core/LinearProgress";
import Container from "@material-ui/core/Container";

import PigSVG from "./bank.svg";

function piggy_progress(coin, goal) {
  if (coin < 0) {
    return 0;
  } else if (coin > goal) {
    return 100;
  } else {
    return (coin / goal) * 100;
  }
}

function CoinButton(props) {
  return (
    <Button
      variant="contained"
      fullWidth="true"
      onClick={() => {
        props.setCoin(props.coin + Number(props.increment));
      }}
    >
      Store {props.increment} coins
    </Button>
  );
}

function CoinIncrement(props) {
  return (
    <TextField
      id="standard-number"
      label="Amount"
      type="number"
      fullWidth="true"
      defaultValue={props.increment}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={(event) => {
        props.setIncrement(Number(event.target.value));
      }}
    />
  );
}

function CoinGoal(props) {
  return (
    <TextField
      id="standard-number"
      label="Goal"
      type="number"
      fullWidth="true"
      defaultValue={props.goal}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={(event) => {
        props.setGoal(Number(event.target.value));
      }}
    />
  );
}

function GoalReached(props) {
  if (props.coin >= props.goal) {
    return (
      <div>
        <Button
          variant="contained"
          fullWidth="true"
          onClick={() => {
            props.setCoin(0);
          }}
        >
          Goal Reached! Reset?
        </Button>
      </div>
    );
  } else {
    return null;
  }
}

function PiggyBank(props) {
  return (
    <Paper>
      <Paper>
        <CoinGoal goal={props.goal} setGoal={props.setGoal} />
      </Paper>
      <Paper>
        <LinearProgress
          variant="determinate"
          value={piggy_progress(props.coin, props.goal)}
        />
      </Paper>
      <Paper>
        {props.coin} / {props.goal}
      </Paper>

      <Paper>
        <Container>
          <img
            src={PigSVG}
            alt="piggy bank"
            style={{
              filter:
                "grayscale(" +
                (100 - piggy_progress(props.coin, props.goal)) +
                "%)",
            }}
          />
        </Container>
      </Paper>
      <Paper>
        <CoinButton
          increment={props.increment}
          coin={props.coin}
          setCoin={props.setCoin}
        />
      </Paper>
      <Paper>
        <CoinIncrement
          increment={props.increment}
          setIncrement={props.setIncrement}
        />
      </Paper>
      <Paper>
        <GoalReached
          coin={props.coin}
          goal={props.goal}
          setCoin={props.setCoin}
        />
      </Paper>
    </Paper>
  );
}

function App() {
  const [coin, setCoin] = useState(0);
  const [goal, setGoal] = useState(100);
  const [increment, setIncrement] = useState(10);
  return (
    <PiggyBank
      coin={coin}
      setCoin={setCoin}
      increment={increment}
      setIncrement={setIncrement}
      goal={goal}
      setGoal={setGoal}
    />
  );
}

export default App;
