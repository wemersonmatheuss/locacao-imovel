import styles from "./styles.module.css"

import { Input } from "../Input"
import { Button } from "../Button"
import { useNavigate } from "react-router-dom"

type AuthFormProps = {
  type: "login" | "register"
}

export function AuthForm({ type }: AuthFormProps) {
  const isRegister = type === "register"
  const navigate = useNavigate()

  function handleNavigate() {
    if (isRegister) {
      navigate("/")
    } else {
      navigate("/register")
    }
  }

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
        {isRegister ? (
          <>
            Já possui uma conta?{" "}
            <span
              className={styles.link}
              onClick={handleNavigate}
            >
              Clique aqui!
            </span>
          </>
        ) : (
          <>
            Ainda não possui conta?{" "}
            <span
              className={styles.link}
              onClick={handleNavigate}
            >
              Clique aqui!
            </span>
          </>
        )}
      </p>

      <div className={styles.divBottom}>
        <Button
          text={isRegister ? "Cadastrar" : "Acessar"}
        />

          <div className={styles.terms}>
            <input type="checkbox" id="terms" className={styles.checkbox}/>
            <label htmlFor="terms">
              Li e aceito os termos de uso.
            </label>
          </div>
      </div>

      
    </div>
  )
}