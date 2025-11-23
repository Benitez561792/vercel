import { z } from "zod";

// Schema de Login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
  senha: z
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Schema de Cadastro
export const cadastroSchema = z.object({
  nome: z
    .string()
    .min(3, "Nome deve ter no mínimo 3 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido"),
  senha: z
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número"),
  confirmarSenha: z
    .string()
    .min(1, "Confirmação de senha é obrigatória"),
  cargo: z
    .string()
    .min(2, "Cargo deve ter no mínimo 2 caracteres")
    .optional(),
  departamento: z
    .string()
    .min(2, "Departamento deve ter no mínimo 2 caracteres")
    .optional(),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não coincidem",
  path: ["confirmarSenha"],
});

export type CadastroFormData = z.infer<typeof cadastroSchema>;

// Schema de Questionário
export const questionarioSchema = z.object({
  sono: z
    .number()
    .min(0, "Valor mínimo é 0")
    .max(10, "Valor máximo é 10"),
  estresse: z
    .number()
    .min(0, "Valor mínimo é 0")
    .max(10, "Valor máximo é 10"),
  motivacao: z
    .number()
    .min(0, "Valor mínimo é 0")
    .max(10, "Valor máximo é 10"),
  energia: z
    .number()
    .min(0, "Valor mínimo é 0")
    .max(10, "Valor máximo é 10"),
  satisfacao: z
    .number()
    .min(0, "Valor mínimo é 0")
    .max(10, "Valor máximo é 10"),
  observacoes: z
    .string()
    .max(500, "Observações devem ter no máximo 500 caracteres")
    .optional(),
});

export type QuestionarioFormData = z.infer<typeof questionarioSchema>;
