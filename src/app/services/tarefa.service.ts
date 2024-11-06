import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tarefa } from '../models/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private tasks: Tarefa[] = [];
  private completedTasks: Tarefa[] = []; // Tarefas concluídas

  private tasksSubject = new BehaviorSubject<Tarefa[]>(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  private completedTasksSubject = new BehaviorSubject<Tarefa[]>(this.completedTasks);
  completedTasks$ = this.completedTasksSubject.asObservable();

  private timerInterval: any;

  constructor() {}

  // Adiciona uma nova tarefa
  addTask(task: Tarefa) {
    // Define um ID único baseado no timestamp
    task.id = new Date().getTime();
    task.isRunning = false;
    task.initialTime = task.time; // Armazena o tempo inicial
    task.isCompleted = false; // Define como não concluída ao adicionar

    // Adiciona a tarefa na lista de tarefas e atualiza
    this.tasks.push(task);
    this.updateTasks(); // Método para persistir ou atualizar a lista de tarefas, se necessário
  }

  // Obtém todas as tarefas
  getTasks(): Tarefa[] {
    return this.tasks;
  }

  // Retorna as tarefas concluídas
  getCompletedTasks(): Tarefa[] {
    return this.completedTasks;
  }

  // Inicia ou retoma a contagem regressiva
  playTask(taskId: number) {
    const task = this.tasks.find(task => task.id === taskId);
    if (task && !task.isRunning) {
      task.isRunning = true;
      this.timerInterval = setInterval(() => {
        if (task.time > 0) {
          task.time--;
        } else {
          this.pauseTask(taskId);
          task.isCompleted = true;
          this.completeTask(taskId); // Marca como concluída
          console.log('Tarefa concluída:', task);
        }
        this.updateTasks();
      }, 1000);
    }
  }

  // Pausa a contagem regressiva
  pauseTask(taskId: number) {
    const task = this.tasks.find(task => task.id === taskId);
    if (task && task.isRunning) {
      task.isRunning = false;
      clearInterval(this.timerInterval);
      this.updateTasks();
    }
  }

  // Marca a tarefa como concluída e atualiza o array de tarefas concluídas
  completeTask(taskId: number) {
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);
    if (taskIndex > -1) {
      const completedTask = { ...this.tasks[taskIndex], isRunning: false };
      this.completedTasks.push(completedTask);
      this.completedTasksSubject.next([...this.completedTasks]); // Notifica alterações
      this.updateTasks();
    }
  }

  editTask(updatedTask: Tarefa) {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = { ...updatedTask };
    }
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }


  // Reinicia a contagem para o tempo inicial
  resetTask(taskId: number) {
    const task = this.tasks.find(task => task.id === taskId);
    if (task) {
      task.time = task.initialTime;
      task.isRunning = false;
      clearInterval(this.timerInterval);
      this.updateTasks();
    }
  }

  // Atualiza a lista de tarefas
  private updateTasks() {
    this.tasksSubject.next([...this.tasks]);
  }
}