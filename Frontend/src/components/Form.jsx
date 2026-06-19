import Input from "./Input";
import Button from "./Button";

export default function Form({
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
        <Input
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

      <Button>
        {buttonText}
      </Button>
    </form>
  );
}