import styles from "./Contacts.module.css";

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
  return (
    <div className={styles.formContainer}>
      <div className={styles.form}>
        {inputs.map((input, index) => (
          <input
            key={index}
            type={input.type}
            placeholder={input.placeholder}
            name={input.name}
            value={contact[input.name]}
            onChange={changeHandler}
          />
        ))}

        {isEditing ? (
          <button onClick={updateHandler}>Update Contact</button>
        ) : (
          <button onClick={addHandler}>Add Contact</button>
        )}
      </div>

      <button
        className={`${styles.deleted} ${
          selectedContacts.length > 0 ? styles.show : styles.hidden
        }`}
        onClick={confirmBulkDelete}
        disabled={selectedContacts.length === 0}
      >
        Delete Selected ({selectedContacts.length})
      </button>
    </div>
  );
}

export default ContactForm;
