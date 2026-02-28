import styles from "./styles.module.css"

import { AuthForm } from "../../components/AuthForm"

export function Login() {
  return (
    <div className={styles.container}>
      <AuthForm type="login" />
    </div>
  )
}