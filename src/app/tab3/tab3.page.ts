import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TarefaService } from '../services/tarefa.service';
import { Tarefa } from '../models/tarefa';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  completedTasks: Tarefa[] = []; // Tarefas concluídas

  weekDays: string[] = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
  totalProductiveTime: number = 0; // Total de tempo produtivo em segundos
  recentActivities: any[] = []; // Lista de atividades recentes

  constructor(
    private navCtrl: NavController,
    private tarefaService: TarefaService
  ) {}

  ngOnInit(): void {
    // Obtém as tarefas do serviço quando o componente é inicializado
    this.loadRecentActivities();
    this.calculateProductivity();
    this.tarefaService.completedTasks$.subscribe(tasks => {
      this.completedTasks = tasks;
    });
  }

  loadRecentActivities() {
    // Aqui você irá buscar ou carregar as atividades recentes do usuário
    this.recentActivities = [
      { title: 'Tarefa 1', description: 'Descrição da Tarefa 1', timeSpent: 3600 },
      { title: 'Tarefa 2', description: 'Descrição da Tarefa 2', timeSpent: 7200 },
    ];
  }

  calculateProductivity() {
    // Aqui você pode calcular as tarefas completas e o tempo total
    this.totalProductiveTime = this.recentActivities.reduce((total, activity) => total + activity.timeSpent, 0);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} seg`;
  }
  openProfile() {
    this.navCtrl.navigateForward('/perfil');
  }
}
