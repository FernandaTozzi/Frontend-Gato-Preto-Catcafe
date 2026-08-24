import { useEffect, useState } from "react";

import defaultImage from "../assets/cardapio.png";

export function ItemCardapioCard({
  item,
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
            item.imagem
              ? `http://localhost:8080/uploads/${item.imagem}`
              : defaultImage
          }
          alt={item.nome}
          style={image}
        />

        <div style={info}>
          <h3 style={title}>
            {item.nome}
          </h3>

          <span style={tagCategory}>
            {item.categoria}
          </span>

          {!isMobile && (
            <p style={description}>
              {item.descricao}
            </p>
          )}

          <strong style={price}>
            R$ {Number(item.preco).toFixed(2).replace(".", ",")}
          </strong>
        </div>
      </div>

      <div style={actions}>
        <button
          onClick={() => onEdit(item)}
          style={
            isMobile
              ? editButtonMobile
              : editButton
          }
        >
          {isMobile ? "✏️" : "Editar ✏️"}
        </button>

        <button
          onClick={() => onDelete(item.id)}
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
  margin: "8px 0 6px 0",
};

const price = {
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

const tagCategory = {
  display: "inline-block",
  background: "#7c75a3",
  color: "white",
  padding: "4px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  width: "fit-content",
  marginTop: "8px",
};