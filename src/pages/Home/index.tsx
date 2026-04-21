import { useState } from "react"
import styles from "./styles.module.css"
import background from "../../assets/image-background.png"
import { Button } from "../../components/Button"

type FilterKey =
  | "cidade"
  | "bairro"
  | "regiao"
  | "praia"
  | "metragem"
  | "vagas"
  | "suites"
  | "salas"
  | "quartos"
  | "banheiros"
  | "piscina"
  | "gourmet"
  | "tipo"
  | "estado"
  | "finalidade"
  | "condominio"
  | "valor"

type Filters = Record<FilterKey, string>

const defaultFilters: Filters = {
  cidade: "Cidade",
  bairro: "Bairro",
  regiao: "Região",
  praia: "Proximidade à praia",
  metragem: "Metragem",
  vagas: "Vagas",
  suites: "Suítes",
  salas: "Salas",
  quartos: "Quartos",
  banheiros: "Banheiros",
  piscina: "Piscina",
  gourmet: "Área gourmet",
  tipo: "Tipo",
  estado: "Estado",
  finalidade: "Finalidade",
  condominio: "Condomínio",
  valor: "Valor",
}

const summaryFields: { key: FilterKey; label: string }[] = [
  { key: "cidade", label: "Cidade" },
  { key: "bairro", label: "Bairro" },
  { key: "regiao", label: "Região" },
  { key: "praia", label: "Proximidade à praia" },
  { key: "metragem", label: "Metragem" },
  { key: "vagas", label: "Vagas de garagem" },
  { key: "suites", label: "Número de suítes" },
  { key: "salas", label: "Número de salas" },
  { key: "quartos", label: "Número de quartos" },
  { key: "banheiros", label: "Número de banheiros" },
  { key: "piscina", label: "Possui piscina" },
  { key: "gourmet", label: "Possui área gourmet" },
  { key: "tipo", label: "Tipo do imóvel" },
  { key: "estado", label: "Estado de conservação" },
  { key: "finalidade", label: "Finalidade" },
  { key: "condominio", label: "Condomínio" },
  { key: "valor", label: "Valor" },
]

export function Home() {
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [modalOpen, setModalOpen] = useState(false)

  function setField(key: FilterKey) {
    return (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilters((prev) => ({ ...prev, [key]: e.target.value }))
    }
  }

  function displayValue(key: FilterKey): string {
    const v = filters[key]
    return v === defaultFilters[key] ? "Não informado" : v
  }

  function openResultModal() {
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  return (
    <div className={styles.container}>
      {modalOpen ? (
        <div
          className={styles.modalOverlay}
          role="presentation"
          onClick={closeModal}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-summary-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="search-summary-title" className={styles.modalTitle}>
              Sua busca
            </h2>
            <p className={styles.modalSubtitle}>
              Por enquanto mostramos só o que você escolheu. Depois entra o
              imóvel ideal.
            </p>
            <ul className={styles.summaryList}>
              {summaryFields.map(({ key, label }) => {
                const isPlaceholder = filters[key] === defaultFilters[key]
                return (
                  <li key={key} className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>{label}</span>
                    <span
                      className={
                        isPlaceholder
                          ? `${styles.summaryValue} ${styles.summaryValueMuted}`
                          : styles.summaryValue
                      }
                    >
                      {displayValue(key)}
                    </span>
                  </li>
                )
              })}
            </ul>
            <button
              type="button"
              className={styles.modalClose}
              onClick={closeModal}
            >
              Fechar
            </button>
          </div>
        </div>
      ) : null}

      {/* LADO ESQUERDO */}
      <div
        className={styles.left}
        style={{ backgroundImage: `url(${background})` }}
      />

      {/* LADO DIREITO */}
      <div className={styles.right}>
        <h1 className={styles.title}>Procure o imóvel ideal</h1>

        {/* LOCALIZAÇÃO */}
        <h2 className={styles.subtitle}>Localização</h2>

        <div className={styles.grid}>
          <div>
            <label>Cidade</label>
            <select value={filters.cidade} onChange={setField("cidade")}>
              <option>Cidade</option>
              <option>Limoeiro</option>
              <option>Bom Jardim</option>
              <option>Orobó</option>
              <option>Surubim</option>
              <option>Feira Nova</option>
            </select>
          </div>

          <div>
            <label>Bairro</label>
            <select value={filters.bairro} onChange={setField("bairro")}>
              <option>Bairro</option>
              <option>Mendes</option>
              <option>Santa Terezinha</option>
              <option>Cidade Alta</option>
            </select>
          </div>

          <div>
            <label>Região</label>
            <select value={filters.regiao} onChange={setField("regiao")}>
              <option>Região</option>
              <option>Periférica</option>
              <option>Comercial</option>
              <option>Centro</option>
            </select>
          </div>

          <div>
            <label>Proximidade à praia</label>
            <select value={filters.praia} onChange={setField("praia")}>
              <option>Proximidade à praia</option>
              <option>Sim</option>
              <option>Não</option>
            </select>
          </div>
        </div>

        {/* CARACTERÍSTICAS */}
        <h2 className={styles.subtitle}>Características do imóvel</h2>

        <div className={styles.grid}>
          <div>
            <label>Metragem</label>
            <select value={filters.metragem} onChange={setField("metragem")}>
              <option>Metragem</option>
              <option>50m²</option>
              <option>80m²</option>
              <option>120m²</option>
              <option>200m²</option>
              <option>300m²+</option>
            </select>
          </div>

          <div>
            <label>Vagas de garagem</label>
            <select value={filters.vagas} onChange={setField("vagas")}>
              <option>Vagas</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4+</option>
            </select>
          </div>

          <div>
            <label>Número de suítes</label>
            <select value={filters.suites} onChange={setField("suites")}>
              <option>Suítes</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4+</option>
            </select>
          </div>

          <div>
            <label>Número de salas</label>
            <select value={filters.salas} onChange={setField("salas")}>
              <option>Salas</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4+</option>
            </select>
          </div>

          <div>
            <label>Número de quartos</label>
            <select value={filters.quartos} onChange={setField("quartos")}>
              <option>Quartos</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6+</option>
            </select>
          </div>

          <div>
            <label>Número de banheiros</label>
            <select value={filters.banheiros} onChange={setField("banheiros")}>
              <option>Banheiros</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6+</option>
            </select>
          </div>

          <div>
            <label>Possui piscina</label>
            <select value={filters.piscina} onChange={setField("piscina")}>
              <option>Piscina</option>
              <option>Sim</option>
              <option>Não</option>
            </select>
          </div>

          <div>
            <label>Possui área gourmet</label>
            <select value={filters.gourmet} onChange={setField("gourmet")}>
              <option>Área gourmet</option>
              <option>Sim</option>
              <option>Não</option>
            </select>
          </div>
        </div>

        {/* ESTRUTURA */}
        <h2 className={styles.subtitle}>Estrutura</h2>

        <div className={styles.grid}>
          <div>
            <label>Tipo do imóvel</label>
            <select value={filters.tipo} onChange={setField("tipo")}>
              <option>Tipo</option>
              <option>Apartamento</option>
              <option>Casa</option>
              <option>Chácara</option>
            </select>
          </div>

          <div>
            <label>Estado de conservação</label>
            <select value={filters.estado} onChange={setField("estado")}>
              <option>Estado</option>
              <option>Novo</option>
              <option>Seminovo</option>
              <option>Muito usado</option>
            </select>
          </div>
        </div>

        {/* NEGOCIAÇÃO */}
        <h2 className={styles.subtitle}>Negociação</h2>

        <div className={styles.grid}>
          <div>
            <label>Finalidade</label>
            <select
              value={filters.finalidade}
              onChange={setField("finalidade")}
            >
              <option>Finalidade</option>
              <option>Alugar</option>
              <option>Comprar</option>
            </select>
          </div>

          <div>
            <label>Condomínio</label>
            <select
              value={filters.condominio}
              onChange={setField("condominio")}
            >
              <option>Condomínio</option>
              <option>Sim</option>
              <option>Não</option>
            </select>
          </div>

          <div>
            <label>Valor</label>
            <select value={filters.valor} onChange={setField("valor")}>
              <option>Valor</option>
              <option>Até 100 mil</option>
              <option>100k - 300k</option>
              <option>300k - 600k</option>
              <option>600k+</option>
            </select>
          </div>
        </div>

        <Button text="Procurar imóvel" onClick={openResultModal} />
      </div>
    </div>
  )
}
