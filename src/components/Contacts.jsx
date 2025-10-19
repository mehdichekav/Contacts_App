import { useState } from "react";
import ContactsList from "./ContactsList";
import inputs from "../contacts/inputs";
import { v4 } from "uuid";
import styles from "./Contacts.module.css";
import Search from "./Search";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState([]);
  const [alertType, setAlertType] = useState("");
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [contact, setContact] = useState({
    id: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setContact((contact) => ({ ...contact, [name]: value }));
  };

  const addHandler = () => {
    if (
      !contact.name ||
      !contact.lastName ||
      !contact.email ||
      !contact.phone
    ) {
      setAlert("Please Enter Valid Data!");
      setAlertType("error");
      setTimeout(() => {
        setAlert("");
        setAlertType("");
      }, 2000);
      return;
    }
    setAlert("");
    const newContact = { ...contact, id: v4() };
    setContacts((contacts) => [...contacts, newContact]);
    setContact({
      name: "",
      lastName: "",
      email: "",
      phone: "",
    });
  };

  const deleteHandler = (id) => {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(newContacts);
  };

  const editHandler = (id) => {
    const newEdit = contacts.find((contact) => contact.id === id);
    setContact(newEdit);
    setIsEditing(true);
  };

  const updateHandler = () => {
    setContacts((prevContacts) =>
      prevContacts.map((item) => (item.id === contact.id ? contact : item))
    );

    setContact({
      id: "",
      name: "",
      lastName: "",
      email: "",
      phone: "",
    });

    setIsEditing(false);
    setAlert("Contact updated successfully!");
    setAlertType("success");
    setTimeout(() => {
      setAlert("");
      setAlertType("");
    }, 2000);
  };

  const filteredContacts =
    search.trim() === ""
      ? contacts
      : contacts.filter(
          (event) =>
            event.name.toLowerCase().includes(search) ||
            event.lastName.toLowerCase().includes(search) ||
            event.email.toLowerCase().includes(search) ||
            event.phone.toLowerCase().includes(search)
        );
  return (
    <div className={styles.container}>
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
      <div
        className={`${styles.alert} ${
          alertType === "success"
            ? styles.success
            : alertType === "error"
            ? styles.error
            : ""
        }`}
      >
        {alert && <p>{alert}</p>}
      </div>
      <Search search={search} setSearch={setSearch} />

      <ContactsList
        contacts={filteredContacts}
        deleteHandler={deleteHandler}
        editHandler={editHandler}
      />
    </div>
  );
}

export default Contacts;
