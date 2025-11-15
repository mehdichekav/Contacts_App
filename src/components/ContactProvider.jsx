import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ContactContext = createContext();

const BASE_URL = "http://localhost:5000/contacts";

function ContactProvider({ children }) {
  const [contacts, setContacts] = useState([]);
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
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios
      .get(BASE_URL)
      .then((res) => {
        setContacts(res.data);
        setLoading(false);
      })
      .catch(() => {
        showAlert("Failed to load contacts!", "error");
        setLoading(false);
      });
  }, []);


  const showAlert = (msg, type) => {
    setAlert(msg);
    setAlertType(type);
    setTimeout(() => {
      setAlert("");
      setAlertType("");
    }, 2000);
  };


  const addContact = async () => {
    if (!contact.name || !contact.lastName || !contact.email || !contact.phone) {
      showAlert("Please enter valid data!", "error");
      return;
    }

    try {
      const res = await axios.post(BASE_URL, contact);

      setContacts((prev) => [...prev, res.data]);
      resetForm();
      showAlert("Contact added successfully!", "success");
    } catch (error) {
      showAlert("Failed to add contact!", "error");
    }
  };


  const deleteContact = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      setContacts((prev) => prev.filter((c) => c.id !== id));
      showAlert("Contact deleted!", "success");
    } catch {
      showAlert("Failed to delete!", "error");
    }
  };


  const editContact = (id) => {
    const editable = contacts.find((c) => c.id === id);
    if (editable) {
      setContact(editable);
      setIsEditing(true);
    }
  };


  const updateContact = async () => {
    try {
      await axios.put(`${BASE_URL}/${contact.id}`, contact);

      setContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? contact : c))
      );

      resetForm();
      setIsEditing(false);
      showAlert("Contact updated!", "success");
    } catch {
      showAlert("Failed to update contact!", "error");
    }
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
        loading,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
}

export default ContactProvider;
