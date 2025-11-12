
import { useContext } from "react";
import { ContactContext } from "./ContactProvider";
import styles from "./ContactForm.module.css";


function ContactForm({
  inputs,
  contact,
  changeHandler,
  isEditing,
  addHandler,
  updateHandler,
  selectedContacts,
  confirmBulkDelete,
}) {
  const { alert, alertType } = useContext(ContactContext);

  return (
    <div className={styles.formContainer}>
      <h2>{isEditing ? "✏️ Edit Contact" : "➕ Add New Contact"}</h2>

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          isEditing ? updateHandler() : addHandler();
        }}
      >
        {inputs.map((input) => (
          <div key={input.name} className={styles.inputGroup}>
            <label htmlFor={input.name}>{input.label}</label>
            <input
              id={input.name}
              name={input.name}
              type={input.type}
              placeholder={input.placeholder}
              value={contact[input.name] || ""}
              onChange={changeHandler}
            />
          </div>
        ))}

        <div className={styles.buttons}>
          <button type="submit" className={styles.submitBtn}>
            {isEditing ? "💾 Update Contact" : "➕ Add Contact"}
          </button>

          {selectedContacts.length > 0 && (
            <button
              type="button"
              onClick={confirmBulkDelete}
              className={`${styles.deleteBtn}`}
            >
              🗑️ Delete Selected ({selectedContacts.length})
            </button>
          )}
        </div>
      </form>

      {alert && (
        <div
          className={`${styles.alert} ${
            alertType === "success"
              ? styles.success
              : alertType === "error"
              ? styles.error
              : ""
          }`}
        >
          {alert}
        </div>
      )}
    </div>
  );
}

export default ContactForm;
