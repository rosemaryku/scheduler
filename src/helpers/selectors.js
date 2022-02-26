export function getAppointmentsForDay(state, day) {
  const findDay = state.days.find((dayItem) => dayItem.name === day);

  return findDay
    ? findDay.appointments.map((id) => state.appointments[id])
    : [];
}

export function getInterview(state, interview) {
  return (
    interview && {
      student: interview.student,
      interviewer: { ...state.interviewers[interview.interviewer] },
    }
  );
}

export function getInterviewersForDay(state, day) {
  const findDay = state.days.find((dayItem) => dayItem.name === day);

  return findDay
    ? findDay.interviewers.map((id) => state.interviewers[id])
    : [];
}
