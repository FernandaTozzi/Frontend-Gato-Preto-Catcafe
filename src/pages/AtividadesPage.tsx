import { useEffect, useState } from "react";
import {
  getAtividades,
  createAtividade,
  deleteAtividade,
  updateAtividade,
} from "../services/atividadeService";

import { AtividadeCard } from "../components/AtividadeCard.tsx";
import { AtividadeModal } from "../components/AtividadeModal.tsx";

function AtividadesPage() {
  const [atividades, setAtividades] = useState<any[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAtividade, setSelectedAtividade] = useState<any | null>(null);

  // carregar atividades
  const loadAtividades = async () => {
    const data = await getAtividades();
    setAtividades(data);
  };

  useEffect(() => {
    loadAtividades();
  }, []);

  const handleCreate = async (atividade: any) => {
    await createAtividade(atividade);
    await loadAtividades();
  };

  const handleDelete = async (id: number) => {
    await deleteAtividade(id);
    await loadAtividades();
  };

  const handleEdit = (atividade: any) => {
    setSelectedAtividade(atividade);
    setIsModalOpen(true);
  };

  const handleUpdate = async (atividade: any) => {
    await updateAtividade(atividade.id, atividade);
    await loadAtividades();
  };

  return (
    <div>
      {/* HEADER */}
      <div className="header">
        <h1 className="title">
          Gerenciar Atividades Especiais
        </h1>

        <button
          className="add-button"
          onClick={() => {
            setSelectedAtividade(null);
            setIsModalOpen(true);
          }}
        >
          + Adicionar nova Atividade
        </button>
      </div>

      {/* LISTA */}
      <div className="list-box">
        {atividades.map((atividade) => (
          <AtividadeCard
            key={atividade.id}
            atividade={atividade}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <AtividadeModal
          atividadeToEdit={selectedAtividade}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedAtividade(null);
          }}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default AtividadesPage;