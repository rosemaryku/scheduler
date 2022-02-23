import React from "react";
import "./DayListItem.scss";
import classNames from "classnames";

function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    " day-list__item--selected": props.selected,
    " day-list__item--full": props.spots === 0,
  });

  function formatSpots() {
    if (props.spots === 0) {
      return "no spots remaining";
    } else if (props.spots === 1) {
      return "1 spot remaining";
    } else {
      return `${props.spots} spots remaining`;
    }
  }

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
      selected={props.selected}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light"> {formatSpots(props.spots)} </h3>
    </li>
  );
}

export default DayListItem;
