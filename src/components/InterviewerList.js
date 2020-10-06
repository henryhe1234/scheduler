import React from 'react';
import InterviewerListItem from "components/InterviewerListItem"
import "components/InterviewerList.scss";
import PropTyes from 'prop-types';
// const interviewers = [
//   { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
//   { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
//   { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
//   { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
//   { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
// ];

const InterviewerList = (props) => {
  // const interviewer = {
  //   id: 1,
  //   name: "Sylvia Palmer",
  //   avatar: "https://i.imgur.com/LpaY82x.png"
  // };

  return (
    <div>
      <section className="interviewers">
        <h4 className="interviewers__header text--light">Interviewers</h4>
        <ul className="interviewers__list">
          {props.interviewers.map(interviewer => 
            <InterviewerListItem
            key={interviewer.id}
            // id = {interviewer.id}
            // name = {interviewer.name}
            // avatar = {interviewer.avatar}
            {...interviewer}
            selected = {interviewer.id === props.value}
            setInterviewer={event => props.onChange(interviewer.id)}
             />
            )}
        </ul>
      </section>
    </div>
  );
};

InterviewerList.PropTyes = {
  interviewers:PropTyes.array.isRequired
}

export default InterviewerList;