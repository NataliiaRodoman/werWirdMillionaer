import { Component, signal } from '@angular/core';
import { Frage, GameState } from '../../models/mode.model';
import { Forms } from '../../components/forms/forms';
import { Frages } from '../../fragen';
import { GameStart } from './components/game-start/game-start';
import { GameQuestion } from './components/game-question/game-question';

@Component({
  imports: [Forms, GameStart, GameQuestion], 
  selector: 'app-page',
  styleUrl: './page.scss',
  templateUrl: './page.html',
})

export class Page {

  gameState = signal<GameState>({
    istGestartet: false,
    istGewonnen: false,
    istVerloren: false,
    joker5050Verfuegbar: true,
    jokerFreundVerfuegbar: true,
    jokerSaalVerfuegbar: true
  });

  frages: Frage[] = Frages; 
  aktuelleFrageIndex: number = 0;
  aktuelleFrage: Frage | undefined;
  alleAntworten: string[] = [];
  feedback = signal<string | null>(null); 
  

  gewinnStufen: number[] = [
    100, 200, 300, 500, 1000, 
    2000, 4000, 8000, 16000, 32000, 
    64000, 125000, 250000, 500000, 1000000
  ];

  aktuellePreis: number = 0;
  gewonneneSumme: number = 0;
  
  // generiereZufaelligeFragen() {
  //   this.frages = [...Frages]
  //     .sort(() => Math.random() - 0.5)
  //     .slice(0, 15);
  // }
  
   spielZuruecksetzen() {

    this.gameState.set({
      istGestartet: false,
      istGewonnen: false,
      istVerloren: false,
      joker5050Verfuegbar: true,
      jokerFreundVerfuegbar: true,
      jokerSaalVerfuegbar: true
    });

    this.aktuelleFrageIndex = 0;
    this.gewonneneSumme = 0;
    this.aktuellePreis = 0;
    this.feedback.set(null);
  }

  showText() {
    this.spielZuruecksetzen(); 
   // this.generiereZufaelligeFragen();
    this.feedback.set('Hallo, wir starten!');
  }

 

  ladeFrageUndMischeAntworten() {
    let benoetigteSchwierigkeit = 1;

    if (this.aktuelleFrageIndex >= 10) {
      benoetigteSchwierigkeit = 3; 
    } else if (this.aktuelleFrageIndex >= 5) {
      benoetigteSchwierigkeit = 2; 
    } else {
      benoetigteSchwierigkeit = 1; 
    }
console.log( benoetigteSchwierigkeit);

    const passendeFragen = this.frages.filter(f => f.schwierigkeit === benoetigteSchwierigkeit);

    if (passendeFragen.length > 0) {

      const zufallsIndex = Math.floor(Math.random() * passendeFragen.length);

      this.aktuelleFrage = passendeFragen[zufallsIndex];
    } else {
      this.aktuelleFrage = this.frages[0];
    }

    if (this.aktuelleFrage) {
      this.aktuellePreis = this.gewinnStufen[this.aktuelleFrageIndex]

      const liste = [this.aktuelleFrage.antwortR, ...this.aktuelleFrage.antwortF];

      this.alleAntworten = liste.sort(() => Math.random() - 0.5);
    }
  }

  spielAbbrechen() {
    this.feedback.set(`Spiel beendet. Ihr Gewinn: ${this.gewonneneSumme} €.`);
    if (this.gewonneneSumme) {
      this.gameState.update(state =>({...state, istGewonnen: true}))
    }
  }

  pruefeAntwort(gewaehlteAntwort: string) {
    if (!this.aktuelleFrage) return;

    if (gewaehlteAntwort === this.aktuelleFrage.antwortR) {
   
      if (this.aktuelleFrageIndex === 14) {
        this.gewonneneSumme = this.gewinnStufen[14];
        this.feedback.set(`Gratulation! Sie haben die finale Frage richtig beantwortet!`);
        return;
      }
     
      this.feedback.set('Richtig!');   

      if (this.aktuelleFrageIndex >= 9) {
        this.gewonneneSumme = this.gewinnStufen[8];
      } else if (this.aktuelleFrageIndex >= 4) {       
        this.gewonneneSumme = this.gewinnStufen[3];   
      }
    } else {
        if (this.gewonneneSumme > 0) {
        this.feedback.set(`Falsch! Das Spiel ist vorbei. Sie gehen mit ${this.gewonneneSumme} € nach Hause.`);
        this.gameState.update(state =>({...state, istGewonnen: true, istGestartet: false}));
      } else {
        this.feedback.set('Falsch! Leider haben Sie 0 € gewonnen. Versuchen Sie es noch einmal!');
        this.gameState.update(state =>({...state, istVerloren: true, istGestartet: false}));
      }
    }

  }

  naechsterSchritt() {
    const state = this.gameState();

    if (state.istVerloren) {
      this.spielZuruecksetzen(); 
      return; 
    }

    this.feedback.set(null); 

    if (!state.istGestartet && !state.istGewonnen && !state.istVerloren) {
      this.gameState.update(s => ({ ...s, istGestartet: true }));
      this.ladeFrageUndMischeAntworten();
      return;
    }

    // if (state.istGestartet) {

    //   if (this.aktuelleFrageIndex < this.frages.length - 1) {
    //     this.aktuelleFrageIndex++; 
    //     this.ladeFrageUndMischeAntworten();
    //   } else {
    //     this.gewonneneSumme = this.gewinnStufen[14]; 
    //     this.feedback.set(`Gratulation! Sie haben ${this.gewonneneSumme} € gewonnen!`);
    //     this.gameState.update(s => ({ ...s, istGewonnen: true, istGestartet: false }));
    //   }
    // }

    if (state.istGestartet) {
      
      if (this.aktuelleFrageIndex === 14 && this.gewonneneSumme === this.gewinnStufen[14]) {
        this.feedback.set(`Wahnsinn! Sie sind Millionär! Sie haben ${this.gewonneneSumme} € gewonnen!`);
        
        this.gameState.update(s => ({ ...s, istGewonnen: true, istGestartet: false }));
        return;
      }

      if (this.aktuelleFrageIndex < this.gewinnStufen.length - 1) {
        this.aktuelleFrageIndex++; 
        this.ladeFrageUndMischeAntworten();
      }
    }
  }

  onFormSubmit(formData: any) {
    this.spielZuruecksetzen(); 
    this.feedback.set('Vielen Dank für Ihre Daten!');
  }

  onFormCancel() {
    this.spielZuruecksetzen(); 
    this.feedback.set('Spiel abgebrochen.');
  }

  
  setJoker5050Verfuegbar() {
    this.gameState.update(s => ({ ...s, joker5050Verfuegbar: false }));
  }

  setJokerFreundVerfuegbar() {
    this.gameState.update(s => ({ ...s, jokerFreundVerfuegbar: false }));
  }

  setJokerSaalVerfuegbar() {
    this.gameState.update(s => ({ ...s, jokerSaalVerfuegbar: false }));
  }
}
