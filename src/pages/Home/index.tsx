import { useState } from "react"
import styles from "./styles.module.css"
import background from "../../assets/image-background.png"
import { Button } from "../../components/Button"
import {
  buscarImoveis,
  type ImovelApi,
  type ImovelRequestPayload,
} from "../../services/api"

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

function formatValorPtBr(n: number): string {
  return n.toLocaleString("pt-BR", { maximumFractionDigits: 0 })
}

function buildValorComprarOptions(): string[] {
  const out: string[] = []
  for (let v = 60_000; v <= 100_000; v += 10_000) {
    out.push(`Até ${formatValorPtBr(v)}`)
  }
  for (let v = 150_000; v <= 500_000; v += 50_000) {
    out.push(`Até ${formatValorPtBr(v)}`)
  }
  out.push("Mais de 501.000")
  return out
}

const VALOR_COMPRAR_OPTIONS = buildValorComprarOptions()

function buildValorAlugarOptions(): string[] {
  const out: string[] = []
  for (let i = 1; i <= 10; i++) {
    out.push(`Até ${formatValorPtBr(i * 1000)}`)
  }
  for (let i = 2; i <= 10; i++) {
    out.push(`Até ${formatValorPtBr(i * 10000)}`)
  }
  out.push("Mais de 101.000")
  return out
}

const VALOR_ALUGAR_OPTIONS = buildValorAlugarOptions()

function valorOptionsForFinalidade(finalidade: string): readonly string[] {
  return finalidade === "Alugar" ? VALOR_ALUGAR_OPTIONS : VALOR_COMPRAR_OPTIONS
}

function parseSelectInt(raw: string, placeholder: string): number | null {
  if (raw === placeholder) return null
  const t = raw.trim()
  if (t.endsWith("+")) {
    const n = Number.parseInt(t.slice(0, -1), 10)
    return Number.isFinite(n) ? n : null
  }
  const n = Number.parseInt(t, 10)
  return Number.isFinite(n) ? n : null
}

function parseValorMax(valor: string, placeholder: string): number | null {
  if (valor === placeholder) return null
  if (valor.startsWith("Mais de")) return null
  if (valor.startsWith("Até ")) {
    const compact = valor.slice(4).replace(/\./g, "").trim()
    const n = Number.parseFloat(compact)
    return Number.isFinite(n) ? n : null
  }
  return null
}

function filtersToImovelRequest(f: Filters): ImovelRequestPayload {
  const d = defaultFilters
  return {
    cidade: f.cidade === d.cidade ? null : f.cidade,
    bairro: f.bairro === d.bairro ? null : f.bairro,
    regiao: f.regiao === d.regiao ? null : f.regiao,
    proximidadePraia: f.praia === d.praia ? null : f.praia,
    metragem: f.metragem === d.metragem ? null : f.metragem,
    vagasGaragens: parseSelectInt(f.vagas, d.vagas),
    numerosSuite: parseSelectInt(f.suites, d.suites),
    numerosSalas: parseSelectInt(f.salas, d.salas),
    numerosQuartos: parseSelectInt(f.quartos, d.quartos),
    numerosBanheiros: parseSelectInt(f.banheiros, d.banheiros),
    possuiPiscina: f.piscina === d.piscina ? null : f.piscina,
    possuiAreaGourmet: f.gourmet === d.gourmet ? null : f.gourmet,
    tipoImovel: f.tipo === d.tipo ? null : f.tipo,
    idadeImovel: null,
    estadoConservacao: f.estado === d.estado ? null : f.estado,
    finalidade: f.finalidade === d.finalidade ? null : f.finalidade,
    condominio: f.condominio === d.condominio ? null : f.condominio,
    valor: parseValorMax(f.valor, d.valor),
  }
}

async function buscarImoveisEmCascata(
  f: Filters
): Promise<{ list: ImovelApi[]; notice: string | null }> {
  const base = filtersToImovelRequest(f)
  const semTetoValor: ImovelRequestPayload = { ...base, valor: null }

  let list = await buscarImoveis(base)
  if (list.length > 0) return { list, notice: null }

  if (base.valor != null) {
    list = await buscarImoveis(semTetoValor)
    if (list.length > 0) {
      return {
        list,
        notice:
          "Nenhum imóvel ficou dentro do valor máximo escolhido; exibindo as melhores opções sem esse limite de preço.",
      }
    }
  }

  const relaxed = semTetoValor

  if (f.finalidade === "Comprar") {
    for (const fin of ["Venda", "À venda"] as const) {
      list = await buscarImoveis({ ...relaxed, finalidade: fin })
      if (list.length > 0) {
        return {
          list,
          notice: `No cadastro a finalidade de compra aparece como “${fin}”.`,
        }
      }
    }
  }

  if (f.finalidade === "Alugar") {
    for (const fin of ["Locação", "Aluguel"] as const) {
      list = await buscarImoveis({ ...relaxed, finalidade: fin })
      if (list.length > 0) {
        return {
          list,
          notice: `No cadastro a finalidade de aluguel aparece como “${fin}”.`,
        }
      }
    }
  }

  list = await buscarImoveis({
    ...relaxed,
    cidade: null,
    tipoImovel: null,
    finalidade: null,
  })
  if (list.length > 0) {
    return {
      list,
      notice:
        "Ampliamos a busca: nenhum imóvel cumpria ao mesmo tempo cidade, tipo e finalidade; mostramos os melhores do catálogo completo (ordenados pela sua preferência).",
    }
  }

  return { list: [], notice: null }
}

function formatMoeda(n: number): string {
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  })
}

function textoOuTraco(v: string | number | null | undefined): string {
  if (v === null || v === undefined || v === "") return "—"
  return String(v)
}

type ImovelResultCardProps = {
  imovel: ImovelApi
  destaque?: boolean
}

function ImovelResultCard({ imovel, destaque }: ImovelResultCardProps) {
  const loc = imovel.localizacao
  const car = imovel.caracteristicaImovel
  const neg = imovel.negociacao

  const valorNeg =
    neg?.valor != null && Number.isFinite(neg.valor)
      ? formatMoeda(neg.valor)
      : "—"

  const rows: [string, string][] = [
    ["Referência", imovel.idImovel != null ? `#${imovel.idImovel}` : "—"],
    ["Cidade", textoOuTraco(loc?.cidade)],
    ["Bairro", textoOuTraco(loc?.bairro)],
    ["Região", textoOuTraco(loc?.regiao)],
    ["Proximidade à praia", textoOuTraco(loc?.proximidadepraia ?? loc?.proximidadePraia)],
    ["Metragem", textoOuTraco(car?.metragem)],
    ["Vagas de garagem", textoOuTraco(car?.vagasGaragens)],
    ["Suítes", textoOuTraco(car?.numerosSuite)],
    ["Salas", textoOuTraco(car?.numerosSalas)],
    ["Quartos", textoOuTraco(car?.numerosQuartos)],
    ["Banheiros", textoOuTraco(car?.numerosBanheiros)],
    ["Piscina", textoOuTraco(car?.possuiPiscina)],
    ["Área gourmet", textoOuTraco(car?.possuiAreaGourmet)],
    ["Tipo do imóvel", textoOuTraco(car?.tipoImovel)],
    ["Idade do imóvel (anos)", textoOuTraco(car?.idadeImovel)],
    ["Estado de conservação", textoOuTraco(car?.estadoConservacao)],
    ["Finalidade", textoOuTraco(neg?.finalidade)],
    ["Condomínio", textoOuTraco(neg?.condominio)],
    ["Valor", valorNeg],
  ]

  return (
    <div
      className={
        destaque
          ? `${styles.resultCard} ${styles.resultCardDestaque}`
          : styles.resultCard
      }
    >
      <ul className={styles.summaryList}>
        {rows.map(([label, value]) => (
          <li key={label} className={styles.summaryRow}>
            <span className={styles.summaryLabel}>{label}</span>
            <span className={styles.summaryValue}>{value}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Home() {
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [modalOpen, setModalOpen] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [imovelResults, setImovelResults] = useState<ImovelApi[] | null>(null)
  const [searchNotice, setSearchNotice] = useState<string | null>(null)

  function setField(key: FilterKey) {
    return (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilters((prev) => ({ ...prev, [key]: e.target.value }))
    }
  }

  function setFinalidade(e: React.ChangeEvent<HTMLSelectElement>) {
    const nextFinalidade = e.target.value
    setFilters((prev) => {
      const opts = valorOptionsForFinalidade(nextFinalidade)
      const placeholder = defaultFilters.valor
      const valorOk =
        prev.valor === placeholder || opts.includes(prev.valor)
      return {
        ...prev,
        finalidade: nextFinalidade,
        valor: valorOk ? prev.valor : placeholder,
      }
    })
  }

  async function handleProcurarImovel() {
    setModalOpen(true)
    setSearchLoading(true)
    setSearchError(null)
    setSearchNotice(null)
    setImovelResults(null)
    try {
      const { list, notice } = await buscarImoveisEmCascata(filters)
      setImovelResults(list)
      setSearchNotice(notice)
    } catch (err) {
      setSearchError(
        err instanceof Error ? err.message : "Não foi possível buscar imóveis."
      )
    } finally {
      setSearchLoading(false)
    }
  }

  function closeModal() {
    setModalOpen(false)
    setSearchLoading(false)
    setSearchError(null)
    setSearchNotice(null)
    setImovelResults(null)
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
            aria-labelledby="imovel-result-title"
            aria-busy={searchLoading}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="imovel-result-title" className={styles.modalTitle}>
              Imóvel ideal para você
            </h2>
            <p className={styles.modalSubtitle}>
              Resultado da recomendação com base nas suas preferências e nos
              dados do sistema.
            </p>

            {searchNotice ? (
              <p className={styles.modalNotice} role="status">
                {searchNotice}
              </p>
            ) : null}

            {searchLoading ? (
              <p className={styles.modalStatus}>Buscando imóvel…</p>
            ) : null}

            {searchError ? (
              <p className={styles.modalError} role="alert">
                {searchError}
              </p>
            ) : null}

            {!searchLoading && !searchError && imovelResults ? (
              imovelResults.length === 0 ? (
                <div className={styles.modalEmptyBlock}>
                  <p className={styles.modalStatus}>
                    O servidor respondeu, mas não há imóveis na lista. As causas
                    mais comuns são:
                  </p>
                  <ul className={styles.modalHintList}>
                    <li>
                      <strong>Banco vazio ou sem linhas compatíveis</strong> — no
                      Swagger, envie o mesmo filtro com campos vazios; se voltar
                      lista vazia, não há registros no MySQL para retornar.
                    </li>
                    <li>
                      <strong>CORS ou porta diferente de 5173</strong> — rode o
                      front com <code>npm run dev</code>: as chamadas vão para
                      o mesmo endereço do Vite e o proxy encaminha ao Java na
                      porta 8080. Se abrir o build em outra porta, ajuste o
                      CORS no back-end.
                    </li>
                    <li>
                      Já tentamos relaxar preço, finalidade (Venda/Locação) e
                      ampliar cidade e tipo; se ainda assim vier vazio, o
                      cadastro não tem imóveis que passem nos filtros do
                      serviço.
                    </li>
                  </ul>
                </div>
              ) : (
                <div className={styles.resultStack}>
                  <ImovelResultCard imovel={imovelResults[0]} destaque />

                  {imovelResults.length > 1 ? (
                    <>
                      <h3 className={styles.modalSecondaryTitle}>
                        Outras opções ({imovelResults.length - 1})
                      </h3>
                      <ul className={styles.altList}>
                        {imovelResults.slice(1).map((imovel, idx) => (
                          <li key={imovel.idImovel ?? idx}>
                            <ImovelResultCard imovel={imovel} />
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </div>
              )
            ) : null}

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

      <div
        className={styles.left}
        style={{ backgroundImage: `url(${background})` }}
      />

      <div className={styles.right}>
        <h1 className={styles.title}>Procure o imóvel ideal</h1>

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

        <h2 className={styles.subtitle}>Negociação</h2>

        <div className={styles.grid}>
          <div>
            <label>Finalidade</label>
            <select
              value={filters.finalidade}
              onChange={setFinalidade}
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
              <option>{defaultFilters.valor}</option>
              {valorOptionsForFinalidade(filters.finalidade).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button
          text="Procurar imóvel"
          onClick={() => void handleProcurarImovel()}
          disabled={searchLoading}
        />
      </div>
    </div>
  )
}
