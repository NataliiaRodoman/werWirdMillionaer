import { Component, input, model, signal } from '@angular/core';
import { Frage } from '../../../../../models/mode.model';

@Component({
  imports: [],
  selector: 'app-phone-friend',
  styleUrl: './phone-friend.scss',
  templateUrl: './phone-friend.html',
})

export class PhoneFriend {
  aktuelleFrage = input<Frage | undefined>();
  jokerFreundVerfuegbar = model<boolean>(true);
  telefonAnrufAktiv = signal(false); 
  telefonText = signal(''); 

nutzeFreundJoker() {

  const aktuelleFrage = this.aktuelleFrage();

  if (!aktuelleFrage || !this.jokerFreundVerfuegbar()) return;

  this.jokerFreundVerfuegbar.set(false);
  this.telefonAnrufAktiv.set(true);
  this.telefonText.set('Hallo! Schön von dir zu hören. Lass mich kurz die Frage hören... Hmm...');

  setTimeout(() => {
    if (aktuelleFrage) {
      this.telefonText.set(`Ah, ich habs! Ich bin mir ganz sicher, die richtige Antwort ist: ${aktuelleFrage.antwortR}.`);
    }
  }, 4000); 
}


schliesseTelefon() {
  this.telefonAnrufAktiv.set(false);
}

}
