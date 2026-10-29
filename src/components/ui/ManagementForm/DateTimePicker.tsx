import { useRef, useState } from "react";
import styles from "./DateTimePicker.module.css";

import { timeOptions } from "./dateTime.utils";

type Props = { id: string; value: string; onChange: (value: string) => void; invalid?: boolean };

export function DatePicker({ id, value, onChange, invalid, max }: Props & { max?: string }) {
  const details = useRef<HTMLDetailsElement>(null);
  const base = value ? new Date(`${value}T12:00:00`) : new Date();
  const [month, setMonth] = useState(base.getMonth());
  const [year, setYear] = useState(base.getFullYear());
  const maxYear = max ? Number(max.slice(0, 4)) : Math.max(2100, year);
  const months = Array.from({ length: 12 }, (_, i) => new Date(2020, i, 1).toLocaleDateString("pt-BR", { month: "long" }));
  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();

  function changeMonth(direction: number) {
    const next = new Date(year, month + direction, 1);
    if (next.getFullYear() < 1900 || next.getFullYear() > maxYear) return;
    setYear(next.getFullYear());
    setMonth(next.getMonth());
  }

  return (
    <details className={styles.picker} ref={details}>
      <summary id={id} aria-labelledby={`${id}-label`} className={`${styles.trigger} ${invalid ? styles.invalid : ""}`} aria-invalid={invalid}>{value ? value.split("-").reverse().join("/") : "Selecione a data"}<span aria-hidden="true">▦</span></summary>
      <div className={styles.popup}>
        <div className={styles.monthNav}>
          <button type="button" className={styles.navButton} aria-label="Mês anterior" onClick={() => changeMonth(-1)}>‹</button>
          <select aria-label="Mês" value={month} onChange={event => setMonth(Number(event.target.value))}>{months.map((name, i) => <option key={name} value={i}>{name}</option>)}</select>
          <select aria-label="Ano" value={year} onChange={event => setYear(Number(event.target.value))}>{Array.from({ length: maxYear - 1899 }, (_, i) => maxYear - i).map(y => <option key={y}>{y}</option>)}</select>
          <button type="button" className={styles.navButton} aria-label="Próximo mês" onClick={() => changeMonth(1)}>›</button>
        </div>
        <div className={styles.days}>
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map(day => <span className={styles.weekday} key={day}>{day}</span>)}
          {Array.from({ length: firstDay }, (_, i) => <span key={`empty-${i}`} />)}
          {Array.from({ length: days }, (_, i) => {
            const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
            return <button type="button" key={date} className={`${styles.day} ${date === value ? styles.selected : ""}`} disabled={Boolean(max && date > max)} aria-label={date.split("-").reverse().join("/")} aria-pressed={date === value} onClick={() => { onChange(date); if (details.current) details.current.open = false; }}>{i + 1}</button>;
          })}
        </div>
      </div>
    </details>
  );
}

export function TimePicker({ id, value, onChange, invalid }: Props) {
  const details = useRef<HTMLDetailsElement>(null);
  const options = value && !timeOptions.includes(value) ? [value, ...timeOptions] : timeOptions;
  return (
    <details className={styles.picker} ref={details}>
      <summary id={id} aria-labelledby={`${id}-label`} className={`${styles.trigger} ${invalid ? styles.invalid : ""}`} aria-invalid={invalid}>{value || "Selecione o horário"}<span aria-hidden="true">◷</span></summary>
      <div className={styles.popup}><div className={styles.times}>
        {options.map(time => <button type="button" key={time} className={`${styles.time} ${time === value ? styles.selected : ""}`} aria-pressed={time === value} onClick={() => { onChange(time); if (details.current) details.current.open = false; }}>{time}</button>)}
      </div></div>
    </details>
  );
}
