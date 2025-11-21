import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useEffect } from "react";

import styles from "./ContactForm.module.css";

function ContactForm({
  inputs = [],
  isEditing = false,
  addHandler,
  updateHandler,
  selectedContacts = [],
  confirmBulkDelete,
  defaultValues = {},
  validationSchema
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ 
    defaultValues,
    resolver: yupResolver(validationSchema) 
  });


  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);


  const onSubmit = (data) => {
    isEditing ? updateHandler(data) : addHandler(data);
    reset();
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
              {...register(input.name, input.validate)}
            />

            {errors[input.name] && (
              <p className={styles.error}>{errors[input.name]?.message}</p>
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
