import { useContext, useState, useMemo } from "react";
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
    loading,
  } = useContext(ContactContext);

  const [search, setSearch] = useState("");
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteType, setDeleteType] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  
  const filteredContacts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return contacts;

    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.lastName.toLowerCase().includes(term) ||
        c.email.toLowerCase().includes(term) ||
        c.phone.includes(term)
    );
  }, [search, contacts]);


  const changeHandler = (e) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

 
  const handleSelect = (id, checked) => {
    setSelectedContacts((prev) =>
      checked ? [...prev, id] : prev.filter((cid) => cid !== id)
    );
  };


  const confirmDeleteSingle = (id) => {
    setDeleteId(id);
    setDeleteType("single");
    setShowModal(true);
  };

 
  const confirmBulkDelete = () => {
    if (selectedContacts.length === 0) return;
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

  return (
    <div className={styles.container}>
      
      {loading && <p className={styles.loading}>Loading contacts...</p>}

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
          onCancel={() => setShowModal(false)}
        />
      )}


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
          <p>{alert}</p>
        </div>
      )}

    
      <Search search={search} setSearch={setSearch} />

      <ContactsList
        contacts={filteredContacts}
        deleteHandler={confirmDeleteSingle}
        editHandler={editContact}
        handleSelect={handleSelect}
      />
    </div>
  );
}

export default Contacts;


