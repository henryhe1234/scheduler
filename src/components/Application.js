import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index.js";
import "components/Application.scss";
import { getAppointmentsForDay } from "../helpers/selectors.js"
// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// "GET_DAYS":         http://localhost:8001/api/days,
// "GET_APPOINTMENTS": http://localhost:8001/api/appointments,
// "GET_INTERVIEWERS": http://localhost:8001/api/interviewer

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Henry",
//       interviewer: {
//         id: 2,
//         name: "Andy",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       }
//     }
//   },
// ];



const Application = (props) => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewewr :{}
  });
  const setDay = (day) => setState({ ...state, day });
  // const setDays = (days) => {
  //   setState(prev => ({ ...prev, days }));
  // }
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
      
      let days = all[0].data;
      let appointments = all[1].data;
      let interviewer = all[2].data;


      // let newAppointments = {...appointments, interview};
      // set your states here with the correct values...
      setState(prev => ({...prev, days,appointments,interviewer}));
      
      

    })
  }, [])

  const dailyAppointments = getAppointmentsForDay(state,state.day);

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => <Appointment
          key={appointment.id} {...appointment}
        />)}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
export default Application;