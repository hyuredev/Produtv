import { Component, ViewChild, OnInit } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TarefaService } from '../services/tarefa.service';
import { Tarefa } from '../models/tarefa';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild('modal', { static: false }) modal!: IonModal;
  
  tasks: Tarefa[] = [];
  completedTasks: Tarefa[] = []; // Tarefas concluídas
  newTaskTitle = '';
  newTaskDescription = '';
  newTaskTime = 0;
  newTaskPriority = 'baixa';
  errorMessage: string = ''; // Mensagem de erro inicial

  constructor(
    private navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private tarefaService: TarefaService
  ) {}

  ngOnInit() {
    // Carrega as tarefas ativas ao inicializar a Tab1
    this.tasks = this.tarefaService.getTasks();
  }

  // Carrega as tarefas do serviço
  private loadTasks() {
    this.tasks = this.tarefaService.getTasks();
    this.completedTasks = this.tarefaService.getCompletedTasks();
    this.tarefaService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  // Marca uma tarefa como concluída
  markTaskAsComplete(taskId: number) {
    this.tarefaService.completeTask(taskId);
    this.tasks = this.tarefaService.getTasks(); // Atualiza a lista de tarefas ativas
  }

  /// Adiciona uma nova tarefa
  addTask() {
    // Verifica se os campos obrigatórios foram preenchidos
    if (!this.newTaskTitle || this.newTaskTime <= 0) {
      this.errorMessage = 'Por favor, preencha o título e defina um tempo válido.';
      return;
    }
    this.errorMessage = '';

    // Cria a nova tarefa com os dados do formulário
    const newTask: Tarefa = {
      id: 0, // O id será definido no TarefaService
      title: this.newTaskTitle,
      description: this.newTaskDescription,
      time: this.newTaskTime * 60, // Converte minutos para segundos
      priority: this.newTaskPriority,
      isRunning: false,
      initialTime: this.newTaskTime * 60,
      isCompleted: false // Inicialmente, a tarefa não está concluída
    };

    // Adiciona a nova tarefa através do serviço
    this.tarefaService.addTask(newTask);
    this.modal.dismiss(); // Fecha o modal após adicionar a tarefa
    this.resetForm(); // Reinicia os campos do formulário
  }


  // Controle de tarefas (play, pause, reset)
  play(taskId: number) {
    this.tarefaService.playTask(taskId);
  }

  pause(taskId: number) {
    this.tarefaService.pauseTask(taskId);
  }

  reset(taskId: number) {
    this.tarefaService.resetTask(taskId);
  }

  // Edição de tarefas
  edit(task: Tarefa) {
    task.isEditing = true;
  }

  save(task: Tarefa) {
    task.isEditing = false;
    this.tarefaService.editTask(task);
  }

  delete(taskId: number) {
    this.tarefaService.deleteTask(taskId);
    this.loadTasks(); // Atualiza a lista após a exclusão
  }

  // Reseta o formulário
  private resetForm() {
    this.newTaskTitle = '';
    this.newTaskDescription = '';
    this.newTaskTime = 0;
    this.newTaskPriority = 'baixa'; // Valor padrão
  }

  // Define o estilo da borda com base na prioridade
  getBorderStyle(priority: string) {
    switch (priority) {
      case 'alta':
        return '2px solid red';
      case 'media':
        return '2px solid yellow';
      default:
        return '2px solid green';
    }
  }

  cancel() {
    this.modal?.dismiss(null, 'cancel');
  }

  openProfile() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.navCtrl.navigateForward('/perfil');
      } else {
        this.navCtrl.navigateForward('/login-cadastro');
      }
    });
  }
}
