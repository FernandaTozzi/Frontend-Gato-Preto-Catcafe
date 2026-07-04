import { useEffect, useState } from "react";
import defaultCat from "../assets/cat.png";

export function CatCard({ cat, onDelete, onEdit }: any) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

const calcularIdade = (dataNascimento: string) => {
  const nascimento = new Date(dataNascimento);
  const hoje = new Date();

  let anos = hoje.getFullYear() - nascimento.getFullYear();
  let meses = hoje.getMonth() - nascimento.getMonth();

  if (meses < 0) {
    anos--;
    meses += 12;
  }

  if (hoje.getDate() < nascimento.getDate()) {
      meses--;
      if (meses < 0) {
        anos--;
        meses += 12;
      }
    }

    if (anos <= 0) {
      return `${meses} ${meses === 1 ? "mês" : "meses"}`;
    }

    if (meses === 0) {
      return `${anos} ${anos === 1 ? "ano" : "anos"}`;
    }

    return `${anos} ${anos === 1 ? "ano" : "anos"} e ${meses} ${meses === 1 ? "mês" : "meses"}`;
  };

  return (
    <div style={card}>
      {/* ESQUERDA */}
      <div style={leftContent}>
        <img
          src={
            cat.foto
              ? `http://localhost:8080/uploads/${cat.foto}`
              : defaultCat
          }
          alt={cat.nome}
          style={catImage}
        />

        <div style={info}>
          <h3 style={name}>
            {cat.nome} {cat.genero === "MACHO" ? "♂" : "♀"}
          </h3>

          <strong>{calcularIdade(cat.idade)}</strong>

          <div style={{ display: "flex", gap: "8px", marginTop: "5px", flexWrap: "wrap" }}>
          <div style={tag}>
            {cat.tipoAdocao.charAt(0) + cat.tipoAdocao.slice(1).toLowerCase()}
          </div>

          <div
            style={{
              ...tag,
              background:
                cat.status === "DISPONIVEL"
                  ? "#31b869"
                  : "#e57373"
            }}
          >
            {cat.status === "DISPONIVEL" ? "Disponível" : "Adotado"}
          </div>
        </div>

          {!isMobile && <p style={description}>{cat.descricao}</p>}
        </div>
      </div>

      {/* DIREITA */}
      <div style={actions}>
        <button
          onClick={() => onEdit(cat)}
          style={isMobile ? editButtonMobile : editButton}
          aria-label="Editar gatinho"
        >
          {isMobile ? "✏️" : "Editar ✏️"}
        </button>

        <button
          onClick={() => onDelete(cat.id)}
          style={deleteButton}
          aria-label="Excluir gatinho"
        >
          ✖
        </button>
      </div>
    </div>
  );
}

const card = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
  marginBottom: "20px",
  width: "100%",
};

const leftContent = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  minWidth: 0,
};

const catImage = {
  width: "80px",
  height: "80px",
  minWidth: "80px",
  minHeight: "80px",
  borderRadius: "8px",
  objectFit: "cover" as const,
};

const info = {
  minWidth: 0,
};

const name = {
  color: "#7c75a3",
  margin: 0,
};

const tag = {
  background: "#a57bea",
  color: "white",
  borderRadius: "40px",
  padding: "2px 10px",
  display: "inline-block",
  marginTop: "5px",
};

const description = {
  fontSize: "12px",
  color: "#555",
};

const actions = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexShrink: 0,
};

const editButton = {
  background: "#7c75a3",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "20px",
  cursor: "pointer",
};

const editButtonMobile = {
  background: "#7c75a3",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "35px",
  height: "35px",
  minWidth: "35px",
  minHeight: "35px",
  maxWidth: "35px",
  maxHeight: "35px",
  padding: 0,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const deleteButton = {
  background: "#d9534f",
  color: "white",
  border: "none",
  borderRadius: "50%",
  width: "35px",
  height: "35px",
  minWidth: "35px",
  minHeight: "35px",
  maxWidth: "35px",
  maxHeight: "35px",
  padding: 0,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};