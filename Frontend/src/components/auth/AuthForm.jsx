import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";

export default function AuthForm({
  fields,
  values,
  setValues,
  onSubmit,
  buttonText,
}) {
  return (
    <form
      className="space-y-4"
      onSubmit={onSubmit}
    >
      {fields.map((field) => (
        <AuthInput
          key={field.name}
          type={field.type}
          placeholder={field.placeholder}
          value={values[field.name]}
          onChange={(e) =>
            setValues({
              ...values,
              [field.name]:
                e.target.value,
            })
          }
        />
      ))}

      <AuthButton>
        {buttonText}
      </AuthButton>
    </form>
  );
}