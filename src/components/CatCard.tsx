import defaultCat from "../assets/cat.png";

export function CatCard({ cat, onDelete, onEdit }: any) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px"
    }}>
      {/* ESQUERDA */}
      <div style={{ display: "flex", gap: "15px" }}>
        <img
          src={cat.foto || defaultCat}
          style={{
            borderRadius: "8px",
            width: "80px",
            height: "80px",
            objectFit: "cover"
          }}
        />

        <div>
          <h3 style={{ color: "#7c75a3", margin: 0 }}>
            {cat.nome} {cat.genero === "MACHO" ? "♂" : "♀"}
          </h3>

          <strong>{cat.idade} anos</strong>

          <div style={{
            background: "#e57373",
            color: "white",
            borderRadius: "40px",
            padding: "2px 10px",
            display: "inline-block",
            marginTop: "5px"
          }}>
            {cat.tipoAdocao}
          </div>

          <p style={{ fontSize: "12px", color: "#555" }}>
            {cat.descricao}
          </p>
        </div>
      </div>

      {/* DIREITA */}
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => onEdit(cat)}
          style={{
            background: "#7c75a3",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "20px",
            cursor: "pointer"
          }}
        >
          Editar ✏️
        </button>

        <button
          onClick={() => onDelete(cat.id)}
          style={{
            background: "#d9534f",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "35px",
            height: "35px",
            cursor: "pointer"
          }}
        >
          ✖
        </button>
      </div>
    </div>
  );
}