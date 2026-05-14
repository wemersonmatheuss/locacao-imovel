const API_BASE =
  typeof import.meta.env.VITE_API_URL === "string" &&
  import.meta.env.VITE_API_URL.trim() !== ""
    ? import.meta.env.VITE_API_URL.trim().replace(/\/$/, "")
    : "";

function apiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${p}`;
}

type UsuarioCadastro = {
  email: string;
  senha: string;
  confirmasenha: string;
};

type UsuarioLogin = {
  email: string;
  senha: string;
};

async function readErrorBody(response: Response): Promise<string> {
  const text = await response.text();
  if (!text) return "";
  try {
    const json = JSON.parse(text) as { message?: string; error?: string };
    if (typeof json.message === "string" && json.message) return json.message;
    if (typeof json.error === "string" && json.error) return json.error;
  } catch {}
  return text.slice(0, 200);
}

export async function cadastrarUsuario(data: UsuarioCadastro): Promise<boolean> {
  const response = await fetch(apiUrl("/usuario/cadastro"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const detail = await readErrorBody(response);
    throw new Error(
      detail ? `Erro ao cadastrar: ${detail}` : `Erro ao cadastrar (HTTP ${response.status})`
    );
  }

  return true;
}

export async function loginUsuario(data: UsuarioLogin): Promise<boolean> {
  const response = await fetch(apiUrl("/usuario/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const detail = await readErrorBody(response);
    throw new Error(
      detail ? `Erro no login: ${detail}` : `Erro no login (HTTP ${response.status})`
    );
  }

  return true;
}

export type ImovelRequestPayload = {
  cidade: string | null;
  bairro: string | null;
  regiao: string | null;
  proximidadePraia: string | null;
  metragem: string | null;
  vagasGaragens: number | null;
  numerosSuite: number | null;
  numerosSalas: number | null;
  numerosQuartos: number | null;
  numerosBanheiros: number | null;
  possuiPiscina: string | null;
  possuiAreaGourmet: string | null;
  tipoImovel: string | null;
  idadeImovel: number | null;
  estadoConservacao: string | null;
  finalidade: string | null;
  condominio: string | null;
  valor: number | null;
};

export type LocalizacaoApi = {
  idLocalizacao?: number;
  cidade?: string | null;
  bairro?: string | null;
  regiao?: string | null;
  proximidadepraia?: string | null;
  proximidadePraia?: string | null;
};

export type CaracteristicaImovelApi = {
  idCaracteristica?: number;
  metragem?: string | null;
  vagasGaragens?: number | null;
  numerosSuite?: number | null;
  numerosSalas?: number | null;
  numerosQuartos?: number | null;
  numerosBanheiros?: number | null;
  possuiPiscina?: string | null;
  possuiAreaGourmet?: string | null;
  tipoImovel?: string | null;
  idadeImovel?: number | null;
  estadoConservacao?: string | null;
};

export type NegociacaoApi = {
  idNegociacao?: number;
  finalidade?: string | null;
  condominio?: string | null;
  valor?: number | null;
};

export type ImovelApi = {
  idImovel?: number;
  localizacao?: LocalizacaoApi | null;
  caracteristicaImovel?: CaracteristicaImovelApi | null;
  negociacao?: NegociacaoApi | null;
};

export const EXEMPLO_JSON_BUSCAR_IMOVEIS = `{
  "cidade": null,
  "bairro": null,
  "regiao": null,
  "proximidadePraia": null,
  "metragem": null,
  "vagasGaragens": null,
  "numerosSuite": null,
  "numerosSalas": null,
  "numerosQuartos": null,
  "numerosBanheiros": null,
  "possuiPiscina": null,
  "possuiAreaGourmet": null,
  "tipoImovel": null,
  "idadeImovel": null,
  "estadoConservacao": null,
  "finalidade": null,
  "condominio": null,
  "valor": null
}`;

export async function buscarImoveis(
  body: ImovelRequestPayload
): Promise<ImovelApi[]> {
  const response = await fetch(apiUrl("/imoveis/buscar"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const detail = await readErrorBody(response);
    throw new Error(
      detail
        ? `Erro na busca: ${detail}`
        : `Erro na busca (HTTP ${response.status})`
    );
  }

  const data: unknown = await response.json();
  let list: ImovelApi[] = [];
  if (Array.isArray(data)) list = data as ImovelApi[];
  else if (data && typeof data === "object") {
    const o = data as { content?: unknown; data?: unknown; imoveis?: unknown };
    if (Array.isArray(o.content)) list = o.content as ImovelApi[];
    else if (Array.isArray(o.data)) list = o.data as ImovelApi[];
    else if (Array.isArray(o.imoveis)) list = o.imoveis as ImovelApi[];
  }

  if (import.meta.env.DEV) {
    console.info(
      "[imóveis/buscar]",
      apiUrl("/imoveis/buscar"),
      "HTTP",
      response.status,
      "itens:",
      list.length,
      "tipo corpo:",
      Array.isArray(data) ? "array" : typeof data
    );
    if (!Array.isArray(data) && list.length === 0) {
      console.warn("[imóveis/buscar] Corpo inesperado (esperado array JSON):", data);
    }
  }

  return list;
}
