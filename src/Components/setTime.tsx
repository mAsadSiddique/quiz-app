import React, {Component} from 'react';

export default class Timer extends Component<{},{minutes: number, seconds: number}>{
  state = {
    minutes: 1,
    seconds: 0,
}

componentDidMount() {
    let myInterval = setInterval(() => {
        const { seconds, minutes } = this.state;

        if (seconds > 0) {
           this.setState(({ seconds }) => ({
                seconds: seconds - 1
            }))
        }
        if (seconds === 0) {
            if (minutes === 0) {
                clearInterval(myInterval)
            } else {
                this.setState(({ minutes }) => ({
                    minutes: minutes - 1,
                    seconds: 59
                }))
            }
        }
    }, 1000)

    
}

componentWillUnmount() {
  // clearInterval(myInterval);
}



render() {
    const { minutes, seconds } = this.state
    return (
        <div>
            { minutes === 0 && seconds === 0
                ? <h1>Time Up!</h1>
                : <h1>Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
            }
        </div>
    )
}
}

































// let startTime = 5;
// let time = startTime*60;

// const countDown = document.getElementById('root');

// function HandleTime(){
//   setInterval(()=>{
//     const minute = Math.floor(time/60);

//     let second = time % 60;
//     second = second < 60 ?  + second : second;

//     countDown!.innerHTML = `${minute}:${second}`
//     time--;
//     console.log(minute, second);

//     }, 1000);
//   return(
//     <div>
//       <h3>Hello</h3>
//     </div>
//   )
// }

// export default HandleTime;