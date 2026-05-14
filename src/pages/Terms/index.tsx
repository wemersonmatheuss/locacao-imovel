import { useNavigate } from "react-router-dom"
import styles from "./styles.module.css"

export function Terms() {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <article className={styles.card}>
        <button type="button" className={styles.back} onClick={() => navigate(-1)}>
          ← Voltar
        </button>

        <h1 className={styles.title}>Termos de uso e privacidade</h1>
        <p className={styles.updated}>
          Documento informativo alinhado à Lei Geral de Proteção de Dados (Lei nº
          13.709/2018 — LGPD).
        </p>

        <section className={styles.section}>
          <h2>1. Finalidade do tratamento de dados</h2>
          <p>
            Este sistema utiliza o seu <strong>e-mail</strong> e a sua{" "}
            <strong>senha</strong> exclusivamente para permitir o{" "}
            <strong>cadastro</strong>, a <strong>autenticação</strong> (login) e o
            uso das funcionalidades previstas na aplicação (por exemplo, busca e
            preferências relacionadas a imóveis). Esses dados{" "}
            <strong>não serão utilizados para qualquer outra finalidade</strong>,
            como marketing de terceiros, venda de listas ou envio de comunicações
            não relacionadas ao funcionamento do próprio sistema, salvo obrigação
            legal ou ordem judicial.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Base legal e consentimento</h2>
          <p>
            O tratamento de dados pessoais necessários ao cadastro e à conta de
            usuário fundamenta-se na execução do serviço solicitado e no
            consentimento manifestado ao aceitar estes termos. Você pode revogar
            consentimentos adicionais, quando aplicável, conforme indicado neste
            documento ou em canais de contato do responsável pelo sistema.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Segurança da senha</h2>
          <p>
            A senha é armazenada de forma protegida no servidor (por exemplo,
            mediante técnicas de hashing). Recomenda-se não compartilhar a senha e
            utilizá-la apenas neste sistema, nos limites definidos pela política de
            cadastro (comprimento e complexidade exigidos pela aplicação).
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. Direitos do titular (LGPD)</h2>
          <p>Você pode solicitar, conforme a lei:</p>
          <ul>
            <li>confirmação da existência de tratamento;</li>
            <li>acesso aos dados;</li>
            <li>correção de dados incompletos, inexatos ou desatualizados;</li>
            <li>anonimização, bloqueio ou eliminação de dados desnecessários ou
              tratados em desconformidade;</li>
            <li>informação sobre compartilhamentos, quando houver.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>5. Retenção</h2>
          <p>
            Os dados serão mantidos pelo tempo necessário para cumprir as
            finalidades descritas acima e obrigações legais. Após o encerramento da
            conta ou fim da necessidade, poderão ser eliminados ou anonimizados,
            conforme regras técnicas e legais aplicáveis.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Alterações</h2>
          <p>
            Estes termos podem ser atualizados para refletir mudanças na lei ou no
            sistema. Recomenda-se revisar esta página periodicamente.
          </p>
        </section>
      </article>
    </div>
  )
}
