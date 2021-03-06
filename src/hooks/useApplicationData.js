import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const updateSpots = (day, days, appointments) => {
    const dayIndex = days.findIndex((dayName) => dayName.name === day);
    const dayObj = days[dayIndex];
    const apptIds = dayObj.appointments;

    let spots = 0;
    for (const id of apptIds) {
      let appointment = appointments[id];
      !appointment.interview && spots++;
    }
    let newDayObj = { ...dayObj, spots };
    let newDaysArr = [...days];
    newDaysArr[dayIndex] = newDayObj;
    return newDaysArr;
  };

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      let dayNum = updateSpots(state.day, state.days, appointments);
      setState({
        ...state,
        appointments,
        days: dayNum,
      });
    });
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      let dayNum = updateSpots(state.day, state.days, appointments);
      setState({ ...state, appointments, days: dayNum });
    });
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
