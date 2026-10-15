import { Component, input, model } from '@angular/core';
import { Frage } from '../../../../../models/mode.model';

@Component({
  imports: [],
  selector: 'app-fifty-fiffty',
  styleUrl: './fifty-fiffty.scss',
  templateUrl: './fifty-fiffty.html',
})
export class FiftyFiffty {

  aktuelleFrage = input<Frage | undefined>();
  alleAntworten = model<string[]>([]);
  joker5050Verfuegbar = model<boolean>(true);

nutze5050Joker() {
   const aktuelleFrage = this.aktuelleFrage();
   const alleAntworten = this.alleAntworten();
    
    if (!aktuelleFrage || !this.joker5050Verfuegbar() || alleAntworten.length <= 2) return;

    const falscheAntworten = alleAntworten.filter(a => a !== aktuelleFrage?.antwortR);
    
    const eineFalscheAntwort = falscheAntworten[Math.floor(Math.random() * falscheAntworten.length)];


    const neueAntworten = [aktuelleFrage.antwortR, eineFalscheAntwort];
    neueAntworten.sort(() => Math.random() - 0.5);

    this.joker5050Verfuegbar.set(false);
    this.alleAntworten.set(neueAntworten);
  }
}


