import { useEffect, useState } from "react";
import { ManagementSearch, matchesSearch } from "../../../components/ui/ManagementSearch/ManagementSearch";
import { ManagementPageHeader } from "../../../components/ui/ManagementPageHeader/ManagementPageHeader";
import { ConfirmModal } from "../../../components/ui/ConfirmModal/ConfirmModal";
import type { Cat, CatForm } from "../cat.types";
import { getCats, createCat, deleteCat, updateCat } from "../cat.service";
import { availableCats } from "../catGroup";
import { CatCard } from "../components/CatCard";
import { CatFormModal } from "../components/CatFormModal";
import styles from "./CatsPage.module.css";

type StatusTab = "DISPONIVEL" | "ADOTADO";

function CatsPage() {
  const [search, setSearch] = useState("");
  const [cats, setCats] = useState<Cat[]>([]);
  const [activeTab, setActiveTab] = useState<StatusTab>("DISPONIVEL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState<Cat | null>(null);
  const [catToDelete, setCatToDelete] = useState<Cat | null>(null);
  const [loadError, setLoadError] = useState("");

  async function loadCats() {
    const data = await getCats();
    setCats(data);
    setLoadError("");
  }

  useEffect(() => {
    let active = true;
    getCats()
      .then((data) => { if (active) setCats(data); })
      .catch(() => { if (active) setLoadError("Não foi possível carregar os dados."); });
    return () => { active = false; };
  }, []);

  async function handleCreate(cat: CatForm) {
    await createCat(cat);
    await loadCats();
    setActiveTab(cat.status === "ADOTADO" ? "ADOTADO" : "DISPONIVEL");
  }

  async function handleDelete() {
    if (!catToDelete) return;
    await deleteCat(catToDelete.id);
    setCatToDelete(null);
    await loadCats();
  }

  function handleEdit(cat: Cat) {
    setSelectedCat(cat);
    setIsModalOpen(true);
  }

  async function handleUpdate(cat: CatForm) {
    if (cat.id === undefined) throw new Error("Registro sem identificador.");
    await updateCat(cat.id, cat);
    await loadCats();
    setActiveTab(cat.status === "ADOTADO" ? "ADOTADO" : "DISPONIVEL");
  }

  const availableCount = availableCats(cats).length;
  const adoptedCount = cats.filter((cat) => cat.status === "ADOTADO").length;
  const visibleCats = cats.filter((cat) =>
    cat.status === activeTab &&
    matchesSearch(search, [cat.nome, cat.genero, cat.tipoAdocao, cat.descricao, cat.status, cat.idade])
  );

  return (
    <div>
      {loadError && <p role="alert">{loadError}</p>}
      <ManagementPageHeader
        title="Gerenciar Gatinhos"
        addLabel="Adicionar novo Gatinho"
        onAdd={() => { setSelectedCat(null); setIsModalOpen(true); }}
      />
      <ManagementSearch value={search} onChange={setSearch} label="Pesquisar gatinhos" />

      <div className={styles.tabs} role="tablist" aria-label="Status dos gatinhos">
        <button
          id="available-cats-tab"
          type="button"
          role="tab"
          aria-selected={activeTab === "DISPONIVEL"}
          aria-controls="cats-panel"
          className={`${styles.tab} ${styles.available} ${activeTab === "DISPONIVEL" ? styles.selected : ""}`}
          onClick={() => setActiveTab("DISPONIVEL")}
        >
          Disponíveis <span className={styles.count}>{availableCount}</span>
        </button>
        <button
          id="adopted-cats-tab"
          type="button"
          role="tab"
          aria-selected={activeTab === "ADOTADO"}
          aria-controls="cats-panel"
          className={`${styles.tab} ${styles.adopted} ${activeTab === "ADOTADO" ? styles.selected : ""}`}
          onClick={() => setActiveTab("ADOTADO")}
        >
          Adotados <span className={styles.count}>{adoptedCount}</span>
        </button>
      </div>

      <div
        id="cats-panel"
        role="tabpanel"
        aria-labelledby={activeTab === "DISPONIVEL" ? "available-cats-tab" : "adopted-cats-tab"}
        className={styles.listPanel}
      >
        {!loadError && visibleCats.length === 0 && (
          <p role="status" className={styles.empty}>
            {search.trim() ? "Nenhum resultado encontrado nesta categoria." : `Nenhum gatinho ${activeTab === "DISPONIVEL" ? "disponível" : "adotado"} cadastrado.`}
          </p>
        )}
        {visibleCats.map((cat) => (
          <CatCard
            key={cat.id}
            cat={cat}
            onDelete={() => setCatToDelete(cat)}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {isModalOpen && (
        <CatFormModal
          key={selectedCat?.id ?? "new"}
          catToEdit={selectedCat}
          onClose={() => { setIsModalOpen(false); setSelectedCat(null); }}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />
      )}
      {catToDelete && (
        <ConfirmModal
          title="Excluir Gatinho"
          message="Tem certeza que deseja excluir este gatinho da lista?"
          onCancel={() => setCatToDelete(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default CatsPage;
