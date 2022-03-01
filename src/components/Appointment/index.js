import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";

function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }

  function deleteInterview(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(DELETE);
    props.cancelInterview(props.id, interview).then(() => transition(EMPTY));
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            console.log("Clicked onAdd");
            transition(CREATE);
          }}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => {
            back();
          }}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === DELETE && <Status message={DELETE} />}
      {mode === CONFIRM && (
        <Confirm onConfirm={deleteInterview} onCancel={back} message={DELETE} />
      )}
    </article>
  );
}

export default Appointment;
