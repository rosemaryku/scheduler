import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

function InterviewerList(props) {
  const { interviewers, interviewer, setInterviewer } = props;

  const listItems = interviewers.map((ind) => {
    return (
      <InterviewerListItem
        id={ind.id}
        name={ind.name}
        avatar={ind.avatar}
        selected={ind.id === interviewer ? true : false}
        setInterviewer={setInterviewer}
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{listItems}</ul>
    </section>
  );
}

export default InterviewerList;
