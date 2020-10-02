import React from 'react';

const Error = (props) => {

  const close = ()=>{
    props.onClose();
  }

  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{props.message}</h3>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={()=>{close()}}

      />
    </main>
  );
};

export default Error;