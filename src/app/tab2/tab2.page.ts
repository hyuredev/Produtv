import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  holidays: any[] = [];

  constructor(private navCtrl: NavController, private calendarService: CalendarService) {}

  ngOnInit() {
    this.loadHolidays();
  }

  openProfile() {
    this.navCtrl.navigateForward('/login-cadastro');
  }

  loadHolidays() {
    const year: number = new Date().getFullYear();
    const country: string = 'BR';

    this.calendarService.getHolidays(country, year).subscribe((response: { response: { holidays: any[]; }; }) => {
      this.holidays = response.response.holidays.map(holiday => ({
        name: this.translateHolidayName(holiday.name),
        date: holiday.date.iso,
      }));
      console.log(this.holidays);
    }, (error: any) => {
      console.error('Erro ao carregar feriados:', error);
    });
  }

  private translateHolidayName(name: string): string {
    const translations: { [key: string]: string } = {
      "New Year's Day": "Ano Novo",
      "Christmas": "Natal",
      "Independence Day": "Dia da Independência",
      // Adicione mais traduções conforme necessário
    };
    return translations[name] || name;
  }

  getMonths(): string[] {
    return [
      'Janeiro', 'Fevereiro', 'Março', 'Abril',
      'Maio', 'Junho', 'Julho', 'Agosto',
      'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
  }

  getHolidaysByMonth(monthIndex: number): any[] {
    return this.holidays.filter(holiday => {
      const holidayDate = new Date(holiday.date);
      return holidayDate.getMonth() === monthIndex; // Exibe todos os feriados do mês
    });
  }
}