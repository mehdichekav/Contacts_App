// src/components/ContactProvider.jsx
import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export const ContactContext = createContext();

function ContactProvider({ children }) {
  // 🟩 لیست مخاطبین از localStorage
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem("contacts");
    return saved ? JSON.parse(saved) : [];
  });

  // 🟩 فرم مخاطب
  const [contact, setContact] = useState({
    id: "",
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // 🟩 وضعیت‌های کمکی
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState("");
  const [alertType, setAlertType] = useState("");

  // 🟩 ذخیره در localStorage
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  // 🟩 پیام هشدار
  const showAlert = (msg, type) => {
    setAlert(msg);
    setAlertType(type);
    setTimeout(() => {
      setAlert("");
      setAlertType("");
    }, 2000);
  };

  // 🟩 افزودن مخاطب
  const addContact = () => {
    if (!contact.name || !contact.lastName || !contact.email || !contact.phone) {
      showAlert("Please Enter Valid Data!", "error");
      return;
    }

    const newContact = { ...contact, id: uuidv4() };
    setContacts((prev) => [...prev, newContact]);
    resetForm();
    showAlert("Contact added successfully!", "success");
  };

  // 🟩 حذف مخاطب
  const deleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    showAlert("Contact deleted!", "success");
  };

  // 🟩 ویرایش (پر کردن فرم)
  const editContact = (id) => {
    const editable = contacts.find((c) => c.id === id);
    if (editable) {
      setContact(editable);
      setIsEditing(true);
    }
  };

  // 🟩 بروزرسانی مخاطب
  const updateContact = () => {
    setContacts((prev) =>
      prev.map((c) => (c.id === contact.id ? contact : c))
    );
    resetForm();
    setIsEditing(false);
    showAlert("Contact updated successfully!", "success");
  };

  // 🟩 پاک کردن فرم
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
