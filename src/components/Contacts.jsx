import { useState } from "react";
import ContactsList from "./ContactsList";
import inputs from "../contacts/inputs"
import { v4 } from "uuid";
import styles from "./Contacts.module.css"
import Search from "./Search";

function Contacts() {
  
  const [contacts, setContacts] = useState([]);
  const [alert, setAlert] = useState([]);
    const [search, setSearch] = useState("");
  const [contact, setContact] = useState({
    id : "",
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
      return;
    }
    setAlert("");
    const newContact = {...contact , id : v4()}
    setContacts((contacts) => [...contacts, newContact]);
    setContact({
      name: "",
      lastName: "",
      email: "",
      phone: "",
    });
  };

  const deleteHandler = (id) => {
    const newContacts = contacts.filter(contact => contact.id !== id)
    setContacts(newContacts) 
  }

const filteredContacts = contacts.filter(
  (c) =>
    c.name.toLowerCase().includes(search) ||
    c.lastName.toLowerCase().includes(search) ||
    c.email.toLowerCase().includes(search) ||
    c.phone.toLowerCase().includes(search)
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
       
        <button onClick={addHandler}>Add Contact</button>
      </div>
      <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
      <Search
          search={search}
          setSearch={setSearch}
        />
     
      <ContactsList contacts={filteredContacts} deleteHandler={deleteHandler}   />
    </div>
  );
}

export default Contacts;
