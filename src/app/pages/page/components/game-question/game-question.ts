import { Component, input, model, output } from '@angular/core';
import { Frage } from '../../../../models/mode.model';
import { FiftyFiffty } from '../game-jokers/fifty-fiffty/fifty-fiffty';
import { PhoneFriend } from '../game-jokers/phone-friend/phone-friend';
import { Audience } from '../game-jokers/audience/audience';
import { CurrencyPipe } from '@angular/common'; 

@Component({
  imports: [CurrencyPipe,FiftyFiffty, PhoneFriend, Audience],
  selector: 'app-game-question',
  styleUrl: './game-question.scss',
  templateUrl: './game-question.html',
})

export class GameQuestion {
  istGestartet = input<boolean>(false);
  istGewonnen = input<boolean>(false);
  feedback = input<string | null>(null);
  aktuelleFrage = input<Frage | undefined>();
  aktuellePreis = input<number>(0);
  joker5050Verfuegbar = model<boolean>(true);
  jokerFreundVerfuegbar = model<boolean>(true);
  jokerSaalVerfuegbar = model<boolean>(true);
  alleAntworten = model<string[]>([]);
  antwortGeprueft = output<string>();
  spielAbgebrochen = output<void>();
}