// function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }

import Appointment from "components/Appointment";


// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   },



//   interviewers: {
//     "1": {
//       "id": 1,
//       "name": "Sylvia Palmer",
//       "avatar": "https://i.imgur.com/LpaY82x.png"
//     },
//     "2": {
//       id: 2,
//       name: "Tori Malcolm",
//       avatar: "https://i.imgur.com/Nmx0Qxo.png"
//     }
//   }

// };

export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let array = [];
  state.days.forEach((everyDay) => {
    if (everyDay.name === day) {
      // console.log(everyDay.name);
      for (let num of everyDay.appointments) {
        array.push(state.appointments[num]);
      }
    }
  })
  return array;
}


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  let obj = {};
  let interviewerId = interview.interviewer;


  let interviewer = state.interviewers[interviewerId];
  return obj = { ...interview, interviewer }



}
export function getInterviewersForDay(state, day) {
  //... returns an array of Interviewers for that day
  let array = [];
  state.days.forEach((everyDay) => {
    if (everyDay.name === day) {
      // console.log(everyDay.name);
      for (let num of everyDay.interviewers) {
        array.push(state.interviewers[num]);
      }
    }
  })
  return array;
}