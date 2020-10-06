import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = (day) => setState({ ...state, day });
  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {

      let days = all[0].data;
      let appointments = all[1].data;
      let interviewers = all[2].data;
      setState(prev => ({ ...prev, days, appointments, interviewers }));
    })
  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const foundDay = state.days.find((day) => day.appointments.includes(id));
    const days = state.days.map((day) => {
      if (day.name === foundDay.name && state.appointments[id].interview === null) {
        return { ...day, spots: day.spots - 1 };
      } else {
        return day;
      }
    })

    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {

        return setState({
          ...state,
          appointments,
          days
        })

      })
  }






  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    const foundDay = state.days.find((day) => day.appointments.includes(id));
    const days = state.days.map((day) => {
      if (day.name === foundDay.name) {
        return { ...day, spots: day.spots + 1 };
      } else {
        return day;
      }
    })

    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        

        return setState({
          ...state,
          appointments,
          days
        });

      })
  }


  return { state, setDay, bookInterview, cancelInterview }
}