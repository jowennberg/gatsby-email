import React, {useReducer} from "react";
import styles from "./form.module.css";

const INITIAL_STATE = {
  name: "",
  email: "",
  subject: "",
  body: "",
  status: "IDLE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateFieldValue": {
      return {...state, [action.field]: action.value};
    }
    case "updateStatus": {
      return {...state, status: action.status};
    }
    case "reset":
    default: {
      return INITIAL_STATE;
    }
  }
};

export const Form = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const setStatus = (status) => dispatch({type: "updateStatus", status});

  const updateFieldValue = (field) => (event) => {
    dispatch({
      type: "updateFieldValue",
      field,
      value: event.target.value,
    });
  };

  const {name, email, subject, body, status} = state;

  const handleSubmit = (event) => {
    event.preventDefault();

    setStatus("PENDING");

    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(state),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setStatus("SUCCESS");
      })
      .catch((error) => {
        setStatus("ERROR");
        console.error(error);
      });
  };

  if (status === "SUCCESS") {
    return (
      <p className={styles.success}>
        Message sent!{" "}
        <button
          className={`${styles.button} ${styles.centered}`}
          type="reset"
          onClick={() => dispatch({type: "reset"})}
        >
          Reset
        </button>
      </p>
    );
  }

  return (
    <>
      {status === "ERROR" && (
        <p className={styles.error}>Something went wrong. Please try again!</p>
      )}
      <form
        onSubmit={handleSubmit}
        className={`${styles.form} ${
          state.status === "PENDING" && styles.pending
        }`}
      >
        <label className={styles.label}>
          Name
          <input
            type="text"
            value={name}
            onChange={updateFieldValue("name")}
            name="name"
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={updateFieldValue("email")}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Subject
          <input
            type="text"
            name="subject"
            value={subject}
            onChange={updateFieldValue("subject")}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Body
          <textarea
            className={styles.input}
            name="body"
            value={body}
            onChange={updateFieldValue("body")}
          />
        </label>
        <button className={styles.button}>Send</button>
      </form>
    </>
  );
};
