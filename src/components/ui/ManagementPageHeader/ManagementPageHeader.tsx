export function ManagementPageHeader({ title, addLabel, onAdd }: { title: string; addLabel: string; onAdd: () => void }) {
  return <div className="header"><h1 className="title">{title}</h1><button className="add-button" onClick={onAdd}>+ {addLabel}</button></div>;
}
