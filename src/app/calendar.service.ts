import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private apiKey = 'Xc4uS2ulkLSIgOSMQGfKYopc2jH6LtRz'; // Insira sua chave de API aqui
  private apiUrl = 'https://calendarific.com/api/v2/holidays';

  constructor(private http: HttpClient) {}

  getHolidays(country: string, year: number, language: string = 'pt-BR'): Observable<any> {
    const url = `${this.apiUrl}?api_key=${this.apiKey}&country=${country}&year=${year}&language=${language}`;
    return this.http.get(url);
  }
}