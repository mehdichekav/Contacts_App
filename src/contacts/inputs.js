const inputs = [
  {
    name: "name",
    label: "First Name",
    type: "text",
    placeholder: "Enter first name",
    validate: {
      required: "First name is required",
    }
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter last name",
    validate: {
      required: "Last name is required",
    }
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter email",
    validate: {
      required: "Email is required",
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email format",
      },
    }
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
    placeholder: "11-digit phone",
    validate: {
      required: "Phone is required",
      pattern: {
        value: /^[0-9]{11}$/,
        message: "Phone must be exactly 11 digits",
      },
    }
  }
];

export default inputs;
