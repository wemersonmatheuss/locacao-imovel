import { Input } from "../Input"
import { Button } from "../Button"
import styles from "./styles.module.css"

type AuthFormProps = {
  type: "login" | "register"
}

export function AuthForm({ type }: AuthFormProps) {
  const isRegister = type === "register"

  return (
    <div className={styles.container}>
      <Input
        label="E-mail"
        type="email"
        placeholder="Digite seu e-mail"
      />

      <Input
        label="Senha"
        type="password"
        placeholder="Digite sua senha"
      />

      {isRegister && (
        <Input
          label="Confirmar senha"
          type="password"
          placeholder="Digite novamente sua senha"
        />
      )}

      <p className={styles.linkText}>
        {isRegister
          ? "Já possui uma conta? Clique aqui!"
          : "Ainda não possui conta? Clique aqui!"}
      </p>

      <Button
        text={isRegister ? "Cadastrar" : "Acessar"}
      />

      <div className={styles.terms}>
        <input type="checkbox" id="terms" />
        <label htmlFor="terms">
          Li e aceito os termos de uso.
        </label>
      </div>
    </div>
  )
}