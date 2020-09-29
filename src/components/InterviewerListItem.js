import React from 'react';
import classnames from "classnames";

import "components/InterviewerListItem.scss";

const InterviewerListItem = (props) => {
  let interviewerClass = classnames("interviewers__item",{
    "interviewers__item--selected":props.selected,

  });




  return (
    <div>
      <li className = {interviewerClass} onClick ={props.setInterviewer} >
        <img
          className="interviewers__item-image"
          src={props.avatar}
          alt={props.name}
        />
  {props.selected && props.name}
</li>
    </div>
  );
};

export default InterviewerListItem;