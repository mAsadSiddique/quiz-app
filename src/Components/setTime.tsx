import React, {Component} from 'react';

export default class Timer extends Component{
  // state: number{
  //   minute: 3;

  // }
  render(){
    return(
      <div>
        <h4>Time Remaining: 3:00</h4>
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