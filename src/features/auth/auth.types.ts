export interface Address { estado: string; cidade: string; rua: string; numero: number; }
export interface User { id: number; tipoUsuario: "CLIENTE" | "ADM"; nome: string; email: string; cpf: string; telefone: string; endereco: (Address & { id: number }) | null; }
export interface Registration { nome: string; email: string; senha: string; cpf: string; telefone: string; endereco: Address | null; }
