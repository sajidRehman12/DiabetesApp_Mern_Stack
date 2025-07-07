import * as XLSX from 'xlsx';
import type { SheetData } from '../types/vitals';

export async function loadData(): Promise<SheetData[]> {
  const response = await fetch('/assets/diabetes_master_data-v1.xlsx');
  if (!response.ok) {
    console.error('Failed to fetch Excel file:', response.status);
    return [];
  }

  const arrayBuffer = await response.arrayBuffer();
  const data = new Uint8Array(arrayBuffer);

  const workbook = XLSX.read(data, { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const allRows = XLSX.utils.sheet_to_json<any[]>(sheet, {
    header: 1,
    defval: ''
  });

  let headerRowIndex = allRows.findIndex(
    (row) =>
      Array.isArray(row) &&
      row.some((cell) => String(cell).trim().toLowerCase() === 'patientid')
  );

  if (headerRowIndex === -1) {
    console.error('Header row not found (patientId column missing)');
    return [];
  }

  const rawHeaders = allRows[headerRowIndex].map((h: any) =>
    String(h).trim().toLowerCase()
  );
  const dataRows = allRows.slice(headerRowIndex + 1);

  const objectRows = dataRows.map((row) => {
    const obj: any = {};
    rawHeaders.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });

  const cleanedRows = objectRows.filter((row) =>
    Object.values(row).some(
      (value) => value !== '' && value !== null && value !== undefined
    )
  );

  const mapped: SheetData[] = cleanedRows.map((row) => ({
    patientId: row['patientid']?.toString() ?? null,
    age: row['age'] === '' ? '' : Number(row['age']),
    gender: row['gender']?.toString() ?? '',
    weight: row['weight'] === '' ? '' : Number(row['weight']),
    height: row['height'] === '' ? '' : Number(row['height']),
    duration: row['duration'] === '' ? '' : Number(row['duration']),
    a1c: row['a1c'] === '' ? '' : Number(row['a1c']),
    ckd: row['ckd'] == 1 || row['ckd'] === true || row['ckd'] === 'true',
    cad: row['cad'] == 1 || row['cad'] === true || row['cad'] === 'true',
    hld: row['hld'] == 1 || row['hld'] === true || row['hld'] === 'true',
    lowActivity: row['lowactivity'] === '' ? '' : Number(row['lowactivity']),
    mediumActivity:
      row['mediumactivity'] === '' ? '' : Number(row['mediumactivity']),
    highActivity:
      row['highactivity'] === '' ? '' : Number(row['highactivity']),
    fbsBb: row['fbsbb'] === '' ? '' : Number(row['fbsbb']),
    fbsBl: row['fbsbl'] === '' ? '' : Number(row['fbsbl']),
    fbsBd: row['fbsbd'] === '' ? '' : Number(row['fbsbd']),
    fbsBbd: row['fbsbbd'] === '' ? '' : Number(row['fbsbbd']),
    creatinine: row['creatinine'] === '' ? '' : Number(row['creatinine']),
    medications: {
      metformin: row['metformin'] === '' ? '' : Number(row['metformin']),
      glimepiride: row['glimepiride'] === '' ? '' : Number(row['glimepiride']),
      januvia: row['januvia'] === '' ? '' : Number(row['januvia']),
      tradjenta: row['tradjenta'] === '' ? '' : Number(row['tradjenta']),
      glargine: row['glargine'] === '' ? '' : Number(row['glargine']),
      lispro: row['lispro'] === '' ? '' : Number(row['lispro']),
      actos: row['actos'] === '' ? '' : Number(row['actos']),
      farxiga: row['farxiga'] === '' ? '' : Number(row['farxiga']),
      ozempic: row['ozempic'] === '' ? '' : Number(row['ozempic']),
    }
  }));

  return mapped;
}
