import type { PatientData, SheetData, Medications } from "../types/vitals";

export async function getRecommendedMedications(
  input: PatientData,
  dataset: SheetData[]
): Promise<Medications | null> {


  if (!dataset?.length) return null;

  const numericKeys: (keyof PatientData)[] = [
    "age", "weight", "height", "duration", "a1c",
    "lowActivity", "mediumActivity", "highActivity",
    "fbsBb", "fbsBl", "fbsBd", "fbsBbd", "creatinine",
  ];

  const toVector = (obj: Partial<PatientData>) =>
    numericKeys.map(key => Number(obj[key] ?? 0));

  const inputVector = toVector(input);

  let mostSimilar: SheetData | null = null;
  let highestSimilarity = -Infinity;
  let sim = 0;

  for (const record of dataset) {
    const recordVector = toVector(record);

    const dot = inputVector.reduce((sum, val, i) => sum + val * recordVector[i], 0);
    const normA = Math.hypot(...inputVector);
    const normB = Math.hypot(...recordVector);
    let similarity = (normA && normB) ? dot / (normA * normB) : 0;

    if (input.ckd !== record.ckd) similarity -= 0.05;
    if (input.cad !== record.cad) similarity -= 0.05;
    if (input.hld !== record.hld) similarity -= 0.05;
    if (input.gender !== record.gender) similarity -= 0.02;
    

    if (similarity > highestSimilarity) {
      sim = similarity;
      highestSimilarity = similarity;
      mostSimilar = record;
    }
  }
  return mostSimilar?.medications ?? null;
}
