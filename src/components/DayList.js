import React from "react";
import DayListItem from "./DayListItem";

function DayList({ days, day, setDay }) {
  const listItems = days.map((d) => {
    return (
      <DayListItem
        key={d.id}
        name={d.name}
        spots={d.spots}
        setDay={setDay}
        selected={d.name === day ? true : false}
      />
    );
  });

  return <ul>{listItems}</ul>;
}

export default DayList;
