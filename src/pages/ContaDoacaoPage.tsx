import { useEffect, useState } from "react";

import {
  atualizarContaDoacao,
  buscarContaDoacao,
  type ContaDoacao,
} from "../services/contaDoacaoService";

function ContaDoacaoPage() {
  const [conta, setConta] = useState<ContaDoacao>({
    banco: "",
    agencia: "",
    conta: "",
    chavePix: "",
    titular: "",
  });

  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarConta();
  }, []);

  async function carregarConta() {
    try {
      const dados = await buscarContaDoacao();
      setConta(dados);
    } catch (error) {
      console.error(error);
    } finally {
      setCarregando(false);
    }
  }

  function alterarCampo(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;

    setConta((contaAtual) => ({
      ...contaAtual,
      [name]: value,
    }));
  }

  async function salvarAlteracoes() {
    try {
      const contaAtualizada = await atualizarContaDoacao(conta);

      setConta(contaAtualizada);
      setEditando(false);

      alert("Informações atualizadas com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Não foi possível atualizar as informações.");
    }
  }

  if (carregando) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      {/* HEADER */}
      <div className="header">
        <h1 className="title">Conta para Doações</h1>
      </div>

      {/* FORMULÁRIO */}
      <div style={form}>
        <div style={fieldRow}>
          <label style={label}>Banco:</label>

          <input
            name="banco"
            value={conta.banco}
            onChange={alterarCampo}
            disabled={!editando}
            style={{
              ...input,
              backgroundColor: editando ? "#FFFFFF" : "#F2E1D2",
            }}
          />
        </div>

        <div style={fieldRow}>
          <label style={label}>Agência:</label>

          <input
            name="agencia"
            value={conta.agencia}
            onChange={alterarCampo}
            disabled={!editando}
            style={{
              ...input,
              backgroundColor: editando ? "#FFFFFF" : "#F2E1D2",
            }}
          />
        </div>

        <div style={fieldRow}>
          <label style={label}>Conta:</label>

          <input
            name="conta"
            value={conta.conta}
            onChange={alterarCampo}
            disabled={!editando}
            style={{
              ...input,
              backgroundColor: editando ? "#FFFFFF" : "#F2E1D2",
            }}
          />
        </div>

        <div style={fieldRow}>
          <label style={label}>Pix:</label>

          <input
            name="chavePix"
            value={conta.chavePix}
            onChange={alterarCampo}
            disabled={!editando}
            style={{
              ...input,
              backgroundColor: editando ? "#FFFFFF" : "#F2E1D2",
            }}
          />
        </div>

        <div style={fieldRow}>
          <label style={label}>Titular:</label>

          <input
            name="titular"
            value={conta.titular}
            onChange={alterarCampo}
            disabled={!editando}
            style={{
              ...input,
              backgroundColor: editando ? "#FFFFFF" : "#F2E1D2",
            }}
          />
        </div>

        {!editando ? (
          <button
            type="button"
            style={button}
            onClick={() => setEditando(true)}
          >
            EDITAR INFORMAÇÕES ✎
          </button>
        ) : (
          <button
            type="button"
            style={button}
            onClick={salvarAlteracoes}
          >
            SALVAR ALTERAÇÕES
          </button>
        )}
      </div>
    </div>
  );
}

const form = {
    width: "100%",
    maxWidth: "520px",
    marginTop: "28px",  
};

const fieldRow = {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    marginBottom: "12px",
};

const label = {
    width: "70px",
    color: "#333333",
    fontSize: "14px",
};

const input = {
  flex: 1,
  height: "44px",
  border: "1px solid #555555",
  borderRadius: "24px",
  padding: "0 22px",
  color: "#333333",
  outline: "none",
  boxSizing: "border-box" as const,
};

const button = {
  marginTop: "16px",
  border: "none",
  borderRadius: "25px",
  background: "#8d83c6",
  color: "#ffffff",
  padding: "14px 32px",
  cursor: "pointer",
  fontSize: "14px",
};

export default ContaDoacaoPage;