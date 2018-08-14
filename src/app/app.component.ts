import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  // Creamos los distintos tipos de Subjects
  private subject = new Subject<number>();
  private behaviourSubject = new BehaviorSubject<number>(null);
  private replaySubject = new ReplaySubject<number>();

  // Creamos los Observables para cada uno de los Subjects
  private subject$ = this.subject.asObservable();
  private behaviourSubject$ = this.behaviourSubject.asObservable();
  private replaySubject$ = this.replaySubject.asObservable();

  private contador = 1;
  public resultadoSubject = '';
  public resultadoBehaviourSubject = '';
  public resultadoReplaySubject = '';

  ngOnInit() {
    // Emitiremos un valor cada segundo a través de cada Subject.
    // En la tercera iteración, nos suscribiremos a cada Subject.

    const interval = setInterval(() => {
      this.subject.next(this.contador);
      this.behaviourSubject.next(this.contador);
      this.replaySubject.next(this.contador);

      if (this.contador === 3) {
        this.subject$.subscribe(valor => {
          this.resultadoSubject += '<br />' + valor;
        });

        this.behaviourSubject$.subscribe(valor => {
          this.resultadoBehaviourSubject += '<br />' + valor;
        });

        this.replaySubject$.subscribe(valor => {
          this.resultadoReplaySubject += '<br />' + valor;
        });
      } else if (this.contador > 4) {
        clearInterval(interval);
      }

      this.contador++;
    }, 1000);
  }
}
