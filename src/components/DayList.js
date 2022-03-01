import React from "react";
import DayListItem from "./DayListItem";

function DayList(props) {
  const listItems = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        setDay={props.setDay}
        selected={day.name === props.value}
      />
    );
  });

  return <ul>{listItems}</ul>;
}

export default DayList;
