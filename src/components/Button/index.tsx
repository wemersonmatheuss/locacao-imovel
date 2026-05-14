import styles from "./styles.module.css"

type ButtonProps = {
  text: "Acessar" | "Cadastrar" | "Procurar imóvel" | "Sair"
  onClick?: () => void
  type?: "button" | "submit"
  disabled?: boolean
}

export function Button({ text, onClick, type = "button", disabled }: ButtonProps) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  )
}