import { useState } from "react"
import styles from "./styles.module.css"

type InputProps = {
  label: string
  type: "text" | "email" | "password"
  placeholder?: string
}

export function Input({ label, type, placeholder }: InputProps) {
  const [showPassword, setShowPassword] = useState(false)

  const isPassword = type === "password"

  function handleTogglePassword() {
    setShowPassword(!showPassword)
  }

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>

      <div className={styles.inputWrapper}>
        <input
          type={isPassword && showPassword ? "text" : type}
          placeholder={placeholder}
          className={styles.input}
        />

        {isPassword && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className={styles.eyeButton}
          >
            👁️
          </button>
        )}
      </div>
    </div>
  )
}