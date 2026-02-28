import styles from "./styles.module.css"

type ButtonProps = {
  text: "Acessar" | "Cadastrar" | "Procurar imóvel" | "Sair"
  onClick?: () => void
  type?: "button" | "submit"
}

export function Button({ text, onClick, type = "button" }: ButtonProps) {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  )
}