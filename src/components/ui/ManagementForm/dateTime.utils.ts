export function todayIso() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export const timeOptions = Array.from({ length: 31 }, (_, index) => {
  const minutes = 540 + index * 30;
  return minutes === 1440 ? "00:00" : `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
});

export function timeMinutes(value: string) {
  if (value === "00:00") return 1440;
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

