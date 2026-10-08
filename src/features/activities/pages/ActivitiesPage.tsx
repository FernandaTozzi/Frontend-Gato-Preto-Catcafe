import { ManagementPageHeader } from "../../../components/ui/ManagementPageHeader/ManagementPageHeader";
import type { Activity, ActivityForm } from "../activity.types";
import { useEffect, useState } from "react";
import {
  getActivities,
  createActivity,
  deleteActivity,
  updateActivity,
} from "../activity.service";

import { ActivityCard } from "../components/ActivityCard.tsx";
import { ActivityFormModal } from "../components/ActivityFormModal.tsx";

function ActivitiesPage() {
  const [atividades, setAtividades] = useState<Activity[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAtividade, setSelectedAtividade] = useState<Activity | null>(null);

  // carregar atividades
  const loadAtividades = async () => {
    const data = await getActivities();
    setAtividades(data);
  };

  const [loadError, setLoadError] = useState("");
  useEffect(() => {
    let active = true;
    getActivities().then((data) => { if (active) setAtividades(data); })
      .catch(() => { if (active) setLoadError("Não foi possível carregar os dados."); });
    return () => { active = false; };
  }, []);

  const handleCreate = async (atividade: ActivityForm) => {
    await createActivity(atividade);
    await loadAtividades();
  };

  const handleDelete = async (id: number) => {
    await deleteActivity(id);
    await loadAtividades();
  };

  const handleEdit = (atividade: Activity) => {
    setSelectedAtividade(atividade);
    setIsModalOpen(true);
  };

  const handleUpdate = async (atividade: ActivityForm) => {
    if (atividade.id === undefined) throw new Error("Registro sem identificador.");
    await updateActivity(atividade.id, atividade);
    await loadAtividades();
  };

  return (
    <div>
      {loadError && <p role="alert">{loadError}</p>}
      {/* HEADER */}
      <ManagementPageHeader title="Gerenciar Atividades Especiais" addLabel="Adicionar nova Atividade" onAdd={() => { setSelectedAtividade(null); setIsModalOpen(true); }} />

      {/* LISTA */}
      <div className="list-box">
        {atividades.map((atividade) => (
          <ActivityCard
            key={atividade.id}
            atividade={atividade}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <ActivityFormModal
          key={selectedAtividade?.id ?? "new"}
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

export default ActivitiesPage;