import { useEffect, useState } from "react";
import defaultImage from "../assets/atividade-especial.png";

export function AtividadeCard({
  atividade,
  onDelete,
  onEdit,
}: any) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () =>
      window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div style={card}>
      <div style={leftContent}>
        <img
          src={
            atividade.imagem
              ? `http://localhost:8080/uploads/${atividade.imagem}`
              : defaultImage
          }
          alt={atividade.titulo}
          style={image}
        />

        <div style={info}>
          <h3 style={title}>
            {atividade.titulo}
          </h3>

          {!isMobile && (
            <p style={description}>
              {atividade.descricao}
            </p>
          )}

         {atividade.data && (
            <div style={dateBox}>
              <strong>Data:</strong>{" "}
              {new Date(atividade.data).toLocaleDateString("pt-BR")}

              <br />

              <strong>Horário:</strong>{" "}
              {atividade.horarioInicio?.slice(0, 5)} às{" "}
              {atividade.horarioFim?.slice(0, 5)}
            </div>
          )}
        </div>
      </div>

      <div style={actions}>
        <button
          onClick={() => onEdit(atividade)}
          style={
            isMobile
              ? editButtonMobile
              : editButton
          }
        >
          {isMobile ? "✏️" : "Editar ✏️"}
        </button>

        <button
          onClick={() => onDelete(atividade.id)}
          style={deleteButton}
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

const image = {
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

const title = {
  color: "#7c75a3",
  margin: 0,
};

const description = {
  fontSize: "12px",
  color: "#555",
};

const dateBox = {
  marginTop: "8px",
  fontSize: "12px",
  color: "#666",
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
};