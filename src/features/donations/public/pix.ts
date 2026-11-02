// Pix estático (BR Code/EMV), sem valor fixo: quem doa escolhe o valor.
const field = (id: string, value: string) => {
  if (new TextEncoder().encode(value).length > 99) {
    throw new Error("Os dados da chave Pix excedem o limite do QR Code.");
  }
  return id + String(new TextEncoder().encode(value).length).padStart(2, "0") + value;
};

function crc16(value: string): string {
  let crc = 0xffff;
  for (const byte of new TextEncoder().encode(value)) {
    crc ^= byte << 8;
    for (let i = 0; i < 8; i++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function normalized(value: string, max: number): string {
  return value.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Za-z0-9 .-]/g, "")
    .trim()
    .slice(0, max);
}

export function createPixPayload(chavePix: string, titular: string): string {
  const key = chavePix.trim();
  const name = normalized(titular, 25);

  if (!key || !name) {
    throw new Error("Cadastre uma chave Pix e um titular para gerar o QR Code.");
  }

  // O campo de conta do recebedor tem limite de 99 bytes no padrão EMV.
  const account = field("00", "br.gov.bcb.pix") + field("01", key);
  const payload =
    field("00", "01") +
    field("26", account) +
    field("52", "0000") +
    field("53", "986") +
    field("58", "BR") +
    field("59", name) +
    field("60", "LONDRINA") +
    field("62", field("05", "***")) +
    "6304";

  return payload + crc16(payload);
}
