

export type PatientData = {
  patientId: string | null;
  age: number | ''; 
  gender: string;
  weight: number | '';
  height: number | ''; 
  duration: number | ''; 
  a1c: number | ''; 
  ckd: boolean;
  cad: boolean;
  hld: boolean;
  lowActivity: number | ''; 
  mediumActivity: number | ''; 
  highActivity: number | ''; 
  fbsBb: number | ''; 
  fbsBl: number | '';
  fbsBd: number | ''; 
  fbsBbd: number | ''; 
  creatinine: number | ''; 
};

export type Medications = {
  metformin: number | '';
  glimepiride: number | '';
  januvia: number | '';
  tradjenta: number | '';
  glargine: number | '';  
  lispro: number | '';    
  actos: number | '';
  farxiga: number | '';
  ozempic: number | '';
};

export type SheetData = {
  patientId: string | null;
  age: number | ''; 
  gender: string;
  weight: number | '';
  height: number | ''; 
  duration: number | ''; 
  a1c: number | ''; 
  ckd: boolean;
  cad: boolean;
  hld: boolean;
  lowActivity: number | ''; 
  mediumActivity: number | ''; 
  highActivity: number | ''; 
  fbsBb: number | ''; 
  fbsBl: number | '';
  fbsBd: number | ''; 
  fbsBbd: number | ''; 
  creatinine: number | '';
  medications: Medications;
};


