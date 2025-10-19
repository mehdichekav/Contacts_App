import ContactItem from "./ContactItem";
import styles from "./ContactsList.module.css";

function ContactsList({ contacts, deleteHandler, editHandler }) {
  return (
    <div className={styles.container}>
      <h3>ContactsList</h3>
      <div className={styles.listContainer}>
        {contacts.length ? (
          <ul className={`${styles.contacts} ${styles.contactItem}`}>
            {contacts.map((contact) => (
              <ContactItem
                key={contact.id}
                data={contact}
                deleteHandler={deleteHandler}
                editHandler={editHandler}
              />
            ))}
          </ul>
        ) : (
          <p className={`${styles.message} ${styles.noResult} `}>
            No Contacts Yet!
          </p>
        )}
      </div>
    </div>
  );
}

export default ContactsList;
