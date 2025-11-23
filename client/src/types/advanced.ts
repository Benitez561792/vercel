// ========================================
// UNION TYPES (6 exemplos)
// ========================================

/**
 * 1. ApiResponse - Resposta de API com estados diferentes
 */
export type ApiResponse<T> =
  | { status: "success"; data: T; message?: string }
  | { status: "error"; error: string; code?: number }
  | { status: "loading"; progress?: number };

/**
 * 2. UserAction - Ações do usuário no sistema
 */
export type UserAction =
  | { type: "LOGIN"; payload: { email: string; senha: string } }
  | { type: "LOGOUT" }
  | { type: "UPDATE_PROFILE"; payload: { nome?: string; foto?: string } }
  | { type: "CHANGE_PASSWORD"; payload: { senhaAtual: string; novaSenha: string } };

/**
 * 3. NotificationType - Tipos de notificação
 */
export type NotificationType =
  | { variant: "success"; title: string; description?: string }
  | { variant: "error"; title: string; description?: string; retry?: () => void }
  | { variant: "warning"; title: string; description?: string; action?: { label: string; onClick: () => void } }
  | { variant: "info"; title: string; description?: string };

/**
 * 4. FormStatus - Status de formulário
 */
export type FormStatus =
  | "idle"
  | "validating"
  | "submitting"
  | "success"
  | "error";

/**
 * 5. ChartData - Dados de gráficos
 */
export type ChartData =
  | { type: "line"; points: Array<{ x: number; y: number }> }
  | { type: "bar"; categories: string[]; values: number[] }
  | { type: "pie"; segments: Array<{ label: string; value: number; color: string }> }
  | { type: "area"; data: Array<{ date: string; value: number }> };

/**
 * 6. SystemEvent - Eventos do sistema
 */
export type SystemEvent =
  | { type: "USER_LOGIN"; userId: string; timestamp: string }
  | { type: "USER_LOGOUT"; userId: string; timestamp: string }
  | { type: "QUESTIONARIO_SUBMITTED"; questionarioId: string; userId: string; timestamp: string }
  | { type: "DATA_SYNC"; status: "started" | "completed" | "failed"; timestamp: string }
  | { type: "ERROR"; error: Error; context?: string; timestamp: string };

// ========================================
// INTERSECTION TYPES (5 exemplos)
// ========================================

/**
 * Interfaces base para composição
 */
interface Identifiable {
  id: string;
}

interface Timestamped {
  createdAt: string;
  updatedAt: string;
}

interface Auditable {
  createdBy: string;
  updatedBy?: string;
}

interface SoftDeletable {
  isDeleted: boolean;
  deletedAt?: string;
  deletedBy?: string;
}

/**
 * 1. Entity - Entidade básica com ID e timestamps
 */
export type Entity = Identifiable & Timestamped;

/**
 * 2. AuditedEntity - Entidade com auditoria completa
 */
export type AuditedEntity = Entity & Auditable;

/**
 * 3. FullEntity - Entidade completa com soft delete
 */
export type FullEntity = Entity & Auditable & SoftDeletable;

/**
 * 4. CompleteUser - Usuário completo
 */
interface UserBase {
  nome: string;
  email: string;
}

interface UserAuth {
  senha?: string;
  token?: string;
}

interface UserProfile {
  cargo?: string;
  departamento?: string;
  foto?: string;
  nivel?: "colaborador" | "rh" | "admin";
}

export type CompleteUser = UserBase & UserAuth & UserProfile & Entity;

/**
 * 5. QuestionarioCompleto - Questionário com metadados
 */
interface QuestionarioData {
  sono: number;
  estresse: number;
  motivacao: number;
  energia: number;
  satisfacao: number;
  observacoes?: string;
}

interface QuestionarioMetadata {
  userId: string;
  ibe: number;
  status: "pendente" | "concluido" | "cancelado";
}

export type QuestionarioCompleto = QuestionarioData & QuestionarioMetadata & Entity;

// ========================================
// TIPOS UTILITÁRIOS
// ========================================

/**
 * Tipo condicional para extrair propriedades opcionais
 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Tipo para tornar todas as propriedades readonly
 */
export type Immutable<T> = {
  readonly [P in keyof T]: T[P];
};

/**
 * Tipo para extrair valores de um objeto
 */
export type ValueOf<T> = T[keyof T];
