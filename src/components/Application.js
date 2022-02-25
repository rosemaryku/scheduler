import React, { useState, useEffect } from "react";
import "./Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  useEffect(() => {
    Promise.all([axios.get("/api/days"), axios.get("/api/appointments")]).then(
      (all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
        }));
      }
    );
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const apptList = [];

  for (let item in dailyAppointments) {
    apptList.push(<Appointment key={item.id} {...dailyAppointments[item]} />);
  }

  const setDay = (day) => setState((prev) => ({ ...prev, day: day }));

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
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {apptList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
