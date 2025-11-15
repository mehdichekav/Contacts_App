import { createContext, useState, useEffect } from "react";

export const ContactContext = createContext();

function ContactProvider({ children }) {
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem("contacts");
    return saved ? JSON.parse(saved) : [];
  });

  const [contact, setContact] = useState({
    id: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState("");
  const [alertType, setAlertType] = useState("");

  // ذخیره خودکار در localStorage
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const showAlert = (msg, type) => {
    setAlert(msg);
    setAlertType(type);
    setTimeout(() => {
      setAlert("");
      setAlertType("");
    }, 2000);
  };

  const addContact = () => {
    if (!contact.name || !contact.lastName || !contact.email || !contact.phone) {
      showAlert("Please enter valid data!", "error");
      return;
    }

    const newContact = {
      ...contact,
      id: Date.now(), // ساخت ID یکتا
    };

    setContacts((prev) => [...prev, newContact]);

    resetForm();
    showAlert("Contact added successfully!", "success");
  };

  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    showAlert("Contact deleted!", "success");
  };

  const editContact = (id) => {
    const editable = contacts.find((c) => c.id === id);
    if (editable) {
      setContact(editable);
      setIsEditing(true);
    }
  };

  const updateContact = () => {
    setContacts((prev) =>
      prev.map((c) => (c.id === contact.id ? contact : c))
    );

    resetForm();
    setIsEditing(false);
    showAlert("Contact updated!", "success");
  };

  const resetForm = () => {
    setContact({
      id: "",
      name: "",
      lastName: "",
      email: "",
      phone: "",
    });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        contact,
        setContact,
        isEditing,
        addContact,
        deleteContact,
        editContact,
        updateContact,
        alert,
        alertType,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export default ContactProvider;
