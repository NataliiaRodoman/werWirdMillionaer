export interface Frage {
    id: number;
    title: string;
    antwortR: string;
    antwortF: string[];
    audience: number[];
    schwierigkeit: number;
}

export interface GameState {
  istGestartet: boolean;
  istGewonnen: boolean;
  istVerloren: boolean;
  joker5050Verfuegbar: boolean;
  jokerFreundVerfuegbar: boolean;
  jokerSaalVerfuegbar: boolean;
}