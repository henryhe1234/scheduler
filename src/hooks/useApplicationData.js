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



    let days;
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
      .then(() => {
        if(state.appointments[id].interview === null){
        if (id >= 1 && id <= 5) {
          days = state.days.map(element => element.id == 1 ? { ...element, spots: element.spots - 1 } : element);

        } else if (id >= 6 && id <= 10) {
          days = state.days.map(element => element.id == 2 ? { ...element, spots: element.spots0 - 1 } : element);

        } else if (id >= 11 && id <= 15) {
          days = state.days.map(element => element.id == 3 ? { ...element, spots: element.spots - 1 } : element);
        } else if (id >= 16 && id <= 20) {
          days = state.days.map(element => element.id == 4 ? { ...element, spots: element.spots - 1 } : element);
        } else if (id >= 21 && id <= 25) {
          days = state.days.map(element => element.id == 5 ? { ...element, spots: element.spots - 1 } : element);
        }
      }
        return days ? setState({
          ...state,
          appointments,
          days
        }) : setState({...state,appointments})

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


    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        let days;
        if (id >= 1 && id <= 5) {
          days = state.days.map(element => element.id == 1 ? { ...element, spots: element.spots + 1 } : element);

        } else if (id >= 6 && id <= 10) {
          days = state.days.map(element => element.id == 2 ? { ...element, spots: element.spots + 1 } : element);

        } else if (id >= 11 && id <= 15) {
          days = state.days.map(element => element.id == 3 ? { ...element, spots: element.spots + 1 } : element);
        } else if (id >= 16 && id <= 20) {
          days = state.days.map(element => element.id == 4 ? { ...element, spots: element.spots + 1 } : element);
        } else if (id >= 21 && id <= 25) {
          days = state.days.map(element => element.id == 5 ? { ...element, spots: element.spots + 1 } : element);
        }

        return setState({
          ...state,
          appointments,
          days
        });

      })
  }


  return { state, setDay, bookInterview, cancelInterview }
}