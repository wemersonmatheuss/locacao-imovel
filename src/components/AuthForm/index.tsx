import styles from "./styles.module.css"

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

import { Input } from "../Input"
import { Button } from "../Button"


import { cadastrarUsuario, loginUsuario } from "../../services/api"

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


  async function handleSubmit() {
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

      if (isRegister && (password.length < 8 || password.length > 16)) {
        alert("A senha deve ter entre 8 e 16 caracteres (exigência do servidor)")
        return
      }

      try {
        if (isRegister) {
          await cadastrarUsuario({
            email,
            senha: password,
            confirmasenha: confirmPassword
          })

          alert("Cadastro realizado com sucesso!")
          navigate("/")
        } else {
          await loginUsuario({
            email,
            senha: password
          })

          alert("Login realizado com sucesso!")
          navigate("/home")
        }
      } catch (error) {
        console.error(error)
        const fallback = "Erro ao " + (isRegister ? "cadastrar" : "logar")
        alert(error instanceof Error && error.message ? error.message : fallback)
      }
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

      <div>
        <Input
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {isRegister && password.length > 0 ? (
          <p className={styles.passwordHint} role="status">
            A senha deve ter entre 8 e 16 caracteres.
          </p>
        ) : null}
      </div>

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
            <span className={styles.link} onClick={handleNavigate}>
              Clique aqui!
            </span>
          </>
        ) : (
          <>
            Ainda não possui conta?{" "}
            <span className={styles.link} onClick={handleNavigate}>
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
            aria-label="Declaro que li e aceito os termos de uso"
          />
          <span className={styles.termsTextWrap}>
            <Link to="/termos" className={styles.termsLink}>
              Li e aceito os termos de uso.
            </Link>
            <span className={styles.required} aria-hidden>
              *
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}