import styles from "./styles.module.css"

import { useNavigate } from "react-router-dom"
import { useState } from "react"


import { Input } from "../Input"
import { Button } from "../Button"

type AuthFormProps = {
  type: "login" | "register"
}

export function AuthForm({ type }: AuthFormProps) {
  const isRegister = type === "register"
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  function handleNavigate() {
    if (isRegister) {
      navigate("/")
    } else {
      navigate("/register")
    }
  }

  function handleSubmit() {
    if (!email) {
      alert("Preencha o campo de e-mail")
      return
    }

    if (!password) {
      alert("Preencha o campo de senha")
      return
    }

    if (isRegister && !confirmPassword) {
      alert("Preencha o campo de confirmar senha")
      return
    }

    if (isRegister && password !== confirmPassword) {
      alert("As senhas não coincidem")
      return
    }

    alert("Formulário válido!")
  }

  return (
    <div className={styles.container}>
      <Input
        label="E-mail"
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        label="Senha"
        type="password"
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {isRegister && (
        <Input
          label="Confirmar senha"
          type="password"
          placeholder="Digite novamente sua senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
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
          onClick={handleSubmit}
        />

        <div className={styles.terms}>
          <input
            type="checkbox"
            id="terms"
            className={styles.checkbox}
          />
          <label htmlFor="terms" className={styles.termsLabel}>
              Li e aceito os termos de uso.
              <span className={styles.required}>*</span>
          </label>
        </div>
      </div>
    </div>
  )
}