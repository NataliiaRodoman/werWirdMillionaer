import { Component, computed, input, model, signal } from '@angular/core';
import { Frage } from '../../../../../models/mode.model';

@Component({
  imports: [],
  selector: 'app-audience',
  styleUrl: './audience.scss',
  templateUrl: './audience.html',
})
export class Audience {

  aktuelleFrage = input<Frage | undefined>();
  alleAntworten = model<string[]>([]);
  jokerSaalVerfuegbar = model<boolean>(true);
  zeigeSaalGrafik = signal(false);

  saalJokerDaten = computed(() => {

    const aktuelleFrage = this.aktuelleFrage();
    const alleAntworten = this.alleAntworten();

    if (!aktuelleFrage) return [];

    const prozentRichtig = 80;
    const falscheProzente = aktuelleFrage.audience || [];

    const prozentMap = new Map<string, number>();
    prozentMap.set(aktuelleFrage.antwortR, prozentRichtig);
    
    aktuelleFrage.antwortF.forEach((antwort, index) => {
      prozentMap.set(antwort, falscheProzente[index] || 0);
    });

    const originaleVierAntworten = [aktuelleFrage.antwortR, ...aktuelleFrage.antwortF];

    return originaleVierAntworten.map(antwort => {
  
      const istNochSichtbar = alleAntworten.includes(antwort);
      const finalerProzentwert = istNochSichtbar ? (prozentMap.get(antwort) || 0) : 0;

      return {
        text: antwort,
        prozent: finalerProzentwert,
        istRichtig: antwort === aktuelleFrage?.antwortR
      };
    });
  });


  nutzeSaalJoker() {
    if (!this.aktuelleFrage || !this.jokerSaalVerfuegbar()) return;
    
    this.jokerSaalVerfuegbar.set(false);
    this.zeigeSaalGrafik.set(true); 
  }

  schliesseSaalJoker() {
    this.zeigeSaalGrafik.set(false);
  }

}
