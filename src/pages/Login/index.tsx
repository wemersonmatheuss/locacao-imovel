import styles from "./styles.module.css"
import { AuthForm } from "../../components/AuthForm"
import background from "../../assets/image-background.png"

export function Login() {
  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${background})` }}
    >
      <AuthForm type="login" />
    </div>
  )
}