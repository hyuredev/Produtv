import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('modal', { static: false }) modal!: IonModal; // Referência ao modal para criar tarefas
  taskTitle: string = ''; // Título da tarefa
  taskModel: string = ''; // Modelo da tarefa
  taskPriority: string = ''; // Prioridade da tarefa
  taskTime: number = 0; // Tempo para o alarme em minutos
  tasks: any[] = []; // Array para armazenar as tarefas criadas

  constructor(private navCtrl: NavController) {}

  // Método para abrir o modal de criação de tarefa
  openModal() {
    this.taskTitle = ''; // Reseta o título da tarefa
    this.taskModel = ''; // Reseta o modelo da tarefa
    this.taskPriority = ''; // Reseta a prioridade da tarefa
    this.taskTime = 0; // Reseta o tempo da tarefa
    this.modal?.present(); // Mostra o modal
  }

  // Método para cancelar a criação da tarefa e fechar o modal
  cancel() {
    this.modal?.dismiss(null, 'cancel'); // Fecha o modal
  }

  // Método para confirmar a criação da tarefa
  confirm() {
    if (this.taskTitle && this.taskModel) {
      const newTask = {
        title: this.taskTitle,
        model: this.taskModel,
        priority: this.taskPriority,
        time: this.taskTime,
        timeRemaining: this.taskTime * 60, // Converte para segundos
        interval: null // Inicializa o intervalo
      };
      this.tasks.push(newTask);
      this.cancel();
    }
  }

  // Método para iniciar, pausar ou recomeçar a contagem
  toggleTimer(task: any) {
    if (task.interval) {
      // Se o timer está em andamento, pausar
      clearInterval(task.interval);
      delete task.interval;
    } else {
      // Se o timer foi pausado ou está em zero, reiniciar ou iniciar
      if (task.timeRemaining <= 0) {
        task.timeRemaining = task.time * 60; // Reinicia para o tempo total
      }
      task.interval = setInterval(() => {
        if (task.timeRemaining > 0) {
          task.timeRemaining--;
        } else {
          clearInterval(task.interval);
          delete task.interval; // Remove a referência ao intervalo quando o timer acabar
          // Aqui você pode adicionar lógica para notificar o usuário
        }
      }, 1000);
    }
  }

  // Método para formatar o tempo em minutos e segundos
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} seg`;
  }

  // Método para definir o estilo da borda da tarefa com base na prioridade
  getBorderStyle(priority: string): string {
    let borderColor = '';
    let borderRadius = '8px'; // Adicione o raio de borda padrão
  
    switch (priority) {
      case 'baixa':
        borderColor = 'lightblue'; // Bordas azuis para prioridade baixa
        break;
      case 'media':
        borderColor = 'purple'; // Bordas roxas para prioridade média
        break;
      case 'alta':
        borderColor = 'red'; // Bordas vermelhas para prioridade alta
        break;
      default:
        borderColor = 'transparent'; // Sem borda para prioridade não definida
        borderRadius = '0'; // Sem arredondamento
    }
  
    return `2px solid ${borderColor}; border-radius: ${borderRadius};`;
  }

  // Método para navegar para a página de perfil
  openProfile() {
    this.navCtrl.navigateForward('/login-cadastro'); // Navega para a página de login/cadastro
  }
}