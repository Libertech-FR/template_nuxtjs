export interface Id {
  $oid: string;
}

export interface Info {
}

export interface Date2 {
  $numberLong: string;
}

export interface Date {
  $date: Date2;
}

export interface DebutJournee {
  heure: string;
  commune: string;
  codePostal: string;
  heuresMoteur: string;
  heuresMarteau: string;
}

export interface FinJournee {
  heure: string;
  commune: string;
  codePostal: string;
  heuresMoteur: string;
  heuresMarteau: string;
}

export interface BilanJournee {
  metresFores: number;
  secondesMoteur: string;
  secondesMarteau: string;
  nombreTrous: number;
  vitessePenetration: number;
}

export interface Indicateurs {
  consoCarburantParMetres: number;
  heuresMarteauParHeuresMoteur: number;
  metresForesParHeureMoteur: number;
}

export interface Date3 {
  $numberLong: string;
}

export interface CreatedAt {
  $date: Date3;
}

export interface Date4 {
  $numberLong: string;
}

export interface LastUpdateAt {
  $date: Date4;
}

export interface Metadata {
  createdBy: string;
  createdAt: CreatedAt;
  lastUpdateBy: string;
  lastUpdateAt: LastUpdateAt;
}

export interface Import {
  _id: Id;
  info: Info;
  date: Date;
  machine: string;
  mois: string;
  annee: string;
  jour: number;
  foreur: string;
  debutJournee: DebutJournee;
  finJournee: FinJournee;
  bilanJournee: BilanJournee;
  indicateurs: Indicateurs;
  metadata: Metadata;
}


