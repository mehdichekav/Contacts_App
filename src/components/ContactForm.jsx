// import { useContext } from "react";
// import { ContactContext } from "./ContactProvider";
// import styles from "./ContactForm.module.css";

// function ContactForm({
//   inputs,
//   contact,
//   changeHandler,
//   isEditing,
//   addHandler,
//   updateHandler,
//   selectedContacts,
//   confirmBulkDelete,
// }) {
//   const { alert, alertType } = useContext(ContactContext);

//   return (
//     <div className={styles.formContainer}>
//       <h2>{isEditing ? "✏️ Edit Contact" : "➕ Add New Contact"}</h2>

//       <form
//         className={styles.form}
//         onSubmit={(e) => {
//           e.preventDefault();
//           isEditing ? updateHandler() : addHandler();
//         }}
//       >
//         {inputs.map((input) => (
//           <div key={input.name} className={styles.inputGroup}>
//             <label htmlFor={input.name}>{input.label}</label>
//             <input
//               id={input.name}
//               name={input.name}
//               type={input.type}
//               placeholder={input.placeholder}
//               value={contact[input.name] || ""}
//               onChange={changeHandler}
//             />
//           </div>
//         ))}

//         <div className={styles.buttons}>
//           <button type="submit" className={styles.submitBtn}>
//             {isEditing ? "💾 Update Contact" : "➕ Add Contact"}
//           </button>

//           {selectedContacts.length > 0 && (
//             <button
//               type="button"
//               onClick={confirmBulkDelete}
//               className={`${styles.deleteBtn}`}
//             >
//               🗑️ Delete Selected ({selectedContacts.length})
//             </button>
//           )}
//         </div>
//       </form>

//       {alert && (
//         <div
//           className={`${styles.alert} ${
//             alertType === "success"
//               ? styles.success
//               : alertType === "error"
//               ? styles.error
//               : ""
//           }`}
//         >
//           {alert}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ContactForm;



import { useForm } from "react-hook-form";
import { useEffect } from "react";
import styles from "./ContactForm.module.css";

function ContactForm({
  inputs,
  isEditing,
  addHandler,
  updateHandler,
  selectedContacts,
  confirmBulkDelete,
  defaultValues,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = (data) => {
    if (isEditing) {
      updateHandler(data);
    } else {
      addHandler(data);
    }
    if (!isEditing) reset();
  };

  return (
    <div className={styles.formContainer}>
      <h2>{isEditing ? "✏️ Edit Contact" : "➕ Add New Contact"}</h2>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {inputs.map((input) => (
          <div key={input.name} className={styles.inputGroup}>
            <label htmlFor={input.name}>{input.label}</label>

            <input
              id={input.name}
              type={input.type}
              placeholder={input.placeholder}
              {...register(input.name, {
                required: `${input.label} is required`,
                ...(input.name === "email" && {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                }),
                ...(input.name === "phone" && {
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: "Phone must be 11 digits",
                  },
                }),
              })}
            />

            {errors[input.name] && (
              <p className={styles.error}>{errors[input.name].message}</p>
            )}
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
              className={styles.deleteBtn}
            >
              🗑️ Delete Selected ({selectedContacts.length})
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
