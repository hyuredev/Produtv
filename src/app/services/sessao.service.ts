import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {
  private usuarioLogadoSource = new BehaviorSubject<any>(null);
  usuarioLogado$ = this.usuarioLogadoSource.asObservable();

  constructor() {}

  // Método para definir os dados do usuário
  setUsuarioLogado(usuarioData: any): void {
    this.usuarioLogadoSource.next(usuarioData);
  }

  // Método para obter os dados do usuário atual
  getUsuarioLogado(): any {
    return this.usuarioLogadoSource.getValue();
  }

  // Método para limpar os dados do usuário ao sair
  limparSessao(): void {
    this.usuarioLogadoSource.next(null);
  }
}