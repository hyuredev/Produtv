// models/tarefa.ts
export interface Tarefa {
  id: number;
  title: string;
  description?: string;
  time: number;
  priority: string;
  isRunning: boolean;
  initialTime: number;
  isEditing?: boolean; // Propriedade opcional para edição
  isCompleted: boolean; // Novo campo para identificar se a tarefa foi concluída
}