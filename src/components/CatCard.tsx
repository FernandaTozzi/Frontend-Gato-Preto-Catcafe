export function CatCard({ cat, onDelete, onEdit }: any) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "20px"
    }}>
      <div style={{ display: "flex", gap: "15px" }}>
        <img
          src="assets/cat.png"
          style={{ borderRadius: "8px" }}
        />

        <div>
          <h3 style={{ color: "#f4a261", margin: 0 }}>
            {cat.nome} {cat.genero === "MACHO" ? "♂" : "♀"}
          </h3>

          <strong>{cat.idade} Anos</strong>

          <div style={{
            background: "#e57373",
            color: "white",
            borderRadius: "10px",
            display: "inline-block",
            padding: "2px 10px",
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
            borderRadius: "20px"
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
            height: "35px"
          }}
        >
          ✖
        </button>
      </div>
    </div>
  );
}