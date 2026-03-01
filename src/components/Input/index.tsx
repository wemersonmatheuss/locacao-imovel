import styles from "./styles.module.css"

type InputProps = {
  label: string
  type: "text" | "email" | "password"
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

export function Input({
  label,
  type,
  placeholder,
  value,
  onChange,
  required
}: InputProps) {

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {label}
        {required && (
          <span className={styles.required}>*</span>
        )}
      </label>

      <div className={styles.inputWrapper}>
        <input
          type={type}
          placeholder={placeholder}
          className={styles.input}
          value={value}
          onChange={onChange}
          required={required}
        />
      </div>
    </div>
  )
}