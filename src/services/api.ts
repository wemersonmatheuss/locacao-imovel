const API_URL = "http://localhost:8080";

type UsuarioCadastro = {
  email: string;
  senha: string;
  confirmasenha: string;
};

type UsuarioLogin = {
  email: string;
  senha: string;
};

export async function cadastrarUsuario(data: UsuarioCadastro): Promise<boolean> {
  const response = await fetch(`${API_URL}/usuario/cadastro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Erro ao cadastrar");
  }

  return true;
}

// ✅ LOGIN
export async function loginUsuario(data: UsuarioLogin): Promise<boolean> {
  const response = await fetch(`${API_URL}/usuario/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error("Erro no login");
  }

  return true;
}