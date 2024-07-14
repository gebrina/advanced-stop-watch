import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';

type ButtonProps = {
  bg: string;
  variant: string;
  disabled: boolean;
};

const Wrapper = styled.section`
      display:flex;
      justify-content:center;
      align-items:center;
      background:rgba(55,55,30,.3);
      flex-direction:column;
      box-shadow:5px 5px 5px rgba(25,25,25,.5);
      @media only screen and (min-width:600px){
         width:60%;
         border-radius:10px;
         transform:translateY(20px);
         margin:0 auto;
      }
`;

const ButtonWrapper = styled.div`
     display:flex;
     width:100%;
     align-items:center;
     justify-content:center;
     flex-wrap:wrap;
`;

const Button = styled.button<ButtonProps>`
    border:none;
    background:${(props) => props.bg};
    disabled:${(props) => props.disabled};
    cursor:${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
    margin:10px;
    padding:5px 15px;
    font-size:20px;
    font-weight:bold;
    color:#fff;
    border-radius:5px;
    &:hover{
      opacity:.7;
      transition:all .5s ease;
    }
`;

const Watch = styled.p`
    text-align:center;
    font-size:40px;
    font-weight:bold;
    color:blue;
`;

const WatchWrapper = styled.div`
    display:flex;
    gap:10px;
 `;

const Title = styled.h1`
     font-size:40px;
     text-decoration:underline;
     color:darkblue;
     font-weight:700;
`;

export const App = () => {
  const [milisec, setMiliSec] = useState('00');
  const [timerStarted, setTimerStrted] = useState(false);
  const milisecRef = useRef(0);
  const minutesRef = useRef('00');
  const secondsRef = useRef('00');
  let miliSecIntervalRef = useRef<any>();

  const updateTimer = () => {
    milisecRef.current += 1;
    if (milisecRef.current < 59) {
      setMiliSec((prev) => {
        const next = parseInt(prev) + 1;
        return addZeroPrefix(next);
      });
    } else {
      setMiliSec('00');
      milisecRef.current = 0;
      updateSeconds();
    }
  };

  const updateSeconds = () => {
    let seconds = Number(secondsRef.current);
    if (seconds < 59) {
      secondsRef.current = addZeroPrefix(seconds + 1);
    } else {
      secondsRef.current = '00';
      updateMinutes();
    }
  };

  const updateMinutes = () => {
    const minutes = Number(minutesRef.current);
    if (minutes < 59) {
      minutesRef.current = addZeroPrefix(minutes + 1);
    } else {
      minutesRef.current = '00';
    }
  };

  const addZeroPrefix = (value: number): string => {
    return (value < 10 ? '0' + value : value).toString();
  };

  const handleStart = () => {
    setTimerStrted(true);
    miliSecIntervalRef.current = setInterval(() => {
      updateTimer();
    }, 10);
  };

  const handleStope = () => {
    setTimerStrted(false);
    clearInterval(miliSecIntervalRef.current);
  };

  const handleReset = () => {
    setMiliSec('00');
    minutesRef.current = '00';
    secondsRef.current = '00';
  };

  return (
    <Wrapper>
      <Title>an HoUr</Title>
      <ButtonWrapper>
        <Button
          onClick={handleStart}
          disabled={timerStarted}
          bg="green"
          variant="success"
        >
          Start
        </Button>
        <Button
          onClick={handleStope}
          disabled={!timerStarted}
          bg="red"
          variant="danger"
        >
          Stop
        </Button>
        <Button
          onClick={handleReset}
          disabled={
            !Boolean(
              !timerStarted &&
                (Number(milisec) ||
                  Number(secondsRef.current) ||
                  Number(minutesRef.current))
            )
          }
          bg="indigo"
          variant="info"
        >
          Reset
        </Button>
      </ButtonWrapper>
      <WatchWrapper>
        <Watch>{minutesRef.current} :</Watch>
        <Watch>{secondsRef.current} :</Watch>
        <Watch>{milisec}</Watch>
      </WatchWrapper>
    </Wrapper>
  );
};
