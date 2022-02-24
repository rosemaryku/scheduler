export function getAppointmentsForDay(state, day) {
  const findDay = state.days.find((dayItem) => dayItem.name === day);

  return findDay
    ? findDay.appointments.map((id) => state.appointments[id])
    : [];
}
