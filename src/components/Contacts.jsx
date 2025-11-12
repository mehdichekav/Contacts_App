// import { useEffect, useState, useContext  } from "react";



// import { v4 } from "uuid";

// import inputs from "../contacts/inputs";

// import ContactsList from "./ContactsList";
// import styles from "./Contacts.module.css";
// import Search from "./Search";
// import Modal from "./Modal";
// import ContactForm from "./ContactForm";

// function Contacts() {
  
//   const [contacts, setContacts] = useState(() => {
//     const saved = localStorage.getItem("contacts");
//     return saved ? JSON.parse(saved) : [];
//   });
//   const [alert, setAlert] = useState([]);
//   const [alertType, setAlertType] = useState("");
//   const [search, setSearch] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [selectedContacts, setSelectedContacts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [deleteType, setDeleteType] = useState("");
//   const [deleteId, setDeleteId] = useState(null);
//   const [contact, setContact] = useState({
//     id: "",
//     name: "",
//     lastName: "",
//     email: "",
//     phone: "",
//   });

//   useEffect(() => {
//     localStorage.setItem("contacts", JSON.stringify(contacts));
//   }, [contacts]);

//   const changeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setContact((contact) => ({ ...contact, [name]: value }));
//   };

//   const addHandler = () => {
//     if (
//       !contact.name ||
//       !contact.lastName ||
//       !contact.email ||
//       !contact.phone
//     ) {
//       setAlert("Please Enter Valid Data!");
//       setAlertType("error");
//       setTimeout(() => {
//         setAlert("");
//         setAlertType("");
//       }, 2000);
//       return;
//     }
//     setAlert("");
//     const newContact = { ...contact, id: v4() };
//     setContacts((contacts) => [...contacts, newContact]);
//     setContact({
//       name: "",
//       lastName: "",
//       email: "",
//       phone: "",
//     });
//     setAlert("Contact added successfully!");
//     setAlertType("success");
//     setTimeout(() => {
//       setAlert("");
//       setAlertType("");
//     }, 2000);
//   };

//   const deleteHandler = (id) => {
//     const newContacts = contacts.filter((contact) => contact.id !== id);
//     setContacts(newContacts);
//   };

//   const editHandler = (id) => {
//     const newEdit = contacts.find((contact) => contact.id === id);
//     if (newEdit) {
//     setContact(newEdit);
//     setIsEditing(true);
//     }
//   };

//   const updateHandler = () => {
//     setContacts((prevContacts) =>
//       prevContacts.map((item) => (item.id === contact.id ? contact : item))
//     );

//     setContact({
//       id: "",
//       name: "",
//       lastName: "",
//       email: "",
//       phone: "",
//     });

//     setIsEditing(false);
//     setAlert("Contact updated successfully!");
//     setAlertType("success");
//     setTimeout(() => {
//       setAlert("");
//       setAlertType("");
//     }, 2000);
//   };

//   const filteredContacts =
//     search.trim() === ""
//       ? contacts
//       : contacts.filter(
//           (event) =>
//             event.name.toLowerCase().includes(search) ||
//             event.lastName.toLowerCase().includes(search) ||
//             event.email.toLowerCase().includes(search) ||
//             event.phone.toLowerCase().includes(search)
//         );

//   const handleSelect = (id, isChecked) => {
//     if (isChecked) {
//       setSelectedContacts((prev) => [...prev, id]);
//     } else {
//       setSelectedContacts((prev) =>
//         prev.filter((contactId) => contactId !== id)
//       );
//     }
//   };

//   const confirmDeleteSingle = (id) => {
//     setDeleteId(id);
//     setDeleteType("single");
//     setShowModal(true);
//   };

//   const confirmBulkDelete = () => {
//     setDeleteType("bulk");
//     setShowModal(true);
//   };

//   const handleConfirmDelete = () => {
//     if (deleteType === "single") {
//       setContacts((prev) => prev.filter((c) => c.id !== deleteId));
//     } else if (deleteType === "bulk") {
//       setContacts((prev) =>
//         prev.filter((c) => !selectedContacts.includes(c.id))
//       );
//       setSelectedContacts([]);
//     }
//     setShowModal(false);
//   };

//   const handleCancelDelete = () => {
//     setShowModal(false);
//   };

//   return (
//     <div className={styles.container}>
//       <ContactForm
//         inputs={inputs}
//         contact={contact}
//         changeHandler={changeHandler}
//         isEditing={isEditing}
//         addHandler={addHandler}
//         updateHandler={updateHandler}
//         selectedContacts={selectedContacts}
//         confirmBulkDelete={confirmBulkDelete}
//       />
//       {showModal && (
//         <Modal
//           message={
//             deleteType === "bulk"
//               ? "Are you sure you want to delete selected contacts?"
//               : "Are you sure you want to delete this contact?"
//           }
//           onConfirm={handleConfirmDelete}
//           onCancel={handleCancelDelete}
//         />
//       )}
//       <div
//         className={`${styles.alert} ${
//           alertType === "success"
//             ? styles.success
//             : alertType === "error"
//             ? styles.error
//             : ""
//         }`}
//       >
//         {alert && <p>{alert}</p>}
//       </div>
//       <Search search={search} setSearch={setSearch} />

//       <ContactsList
//         contacts={filteredContacts}
//         deleteHandler={deleteHandler}
//         editHandler={editHandler}
//         handleSelect={handleSelect}
//         confirmDeleteSingle={confirmDeleteSingle}
//       />
//     </div>
//   );
// }

// export default Contacts;


import { useContext, useState } from "react";
import { ContactContext } from "./ContactProvider";

import inputs from "../contacts/inputs";
import ContactsList from "./ContactsList";
import styles from "./Contacts.module.css";
import Search from "./Search";
import Modal from "./Modal";
import ContactForm from "./ContactForm";

function Contacts() {
  const {
    contacts,
    contact,
    setContact,
    addContact,
    deleteContact,
    editContact,
    updateContact,
    alert,
    alertType,
    isEditing,
  } = useContext(ContactContext);

  const [search, setSearch] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [deleteId, setDeleteId] = useState(null);


  const filteredContacts =
    search.trim() === ""
      ? contacts
      : contacts.filter(
          (c) =>
            c.name.toLowerCase().includes(search) ||
            c.lastName.toLowerCase().includes(search) ||
            c.email.toLowerCase().includes(search) ||
            c.phone.toLowerCase().includes(search)
        );

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (id, isChecked) => {
    if (isChecked) {
      setSelectedContacts((prev) => [...prev, id]);
    } else {
      setSelectedContacts((prev) => prev.filter((cid) => cid !== id));
    }
  };

  const confirmDeleteSingle = (id) => {
    setDeleteId(id);
    setDeleteType("single");
    setShowModal(true);
  };

  const confirmBulkDelete = () => {
    setDeleteType("bulk");
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteType === "single") {
      deleteContact(deleteId);
    } else if (deleteType === "bulk") {
      selectedContacts.forEach((id) => deleteContact(id));
      setSelectedContacts([]);
    }
    setShowModal(false);
  };

  const handleCancelDelete = () => setShowModal(false);

  return (
    <div className={styles.container}>
      <ContactForm
        inputs={inputs}
        contact={contact}
        changeHandler={changeHandler}
        isEditing={isEditing}
        addHandler={addContact}
        updateHandler={updateContact}
        selectedContacts={selectedContacts}
        confirmBulkDelete={confirmBulkDelete}
      />

      {showModal && (
        <Modal
          message={
            deleteType === "bulk"
              ? "Are you sure you want to delete selected contacts?"
              : "Are you sure you want to delete this contact?"
          }
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

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
        deleteHandler={confirmDeleteSingle}
        editHandler={editContact}
        handleSelect={handleSelect}
        confirmDeleteSingle={confirmDeleteSingle}
      />
    </div>
  );
}

export default Contacts;
