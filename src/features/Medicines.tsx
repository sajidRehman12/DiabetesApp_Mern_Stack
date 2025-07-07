import React, { useEffect, useState } from 'react';
import {Pill, Calendar, Target, Heart,Droplets,} from 'lucide-react';
import { type Medications, type PatientData } from '../types/vitals';
import { getRecommendedMedications } from '../services/analysisService';
import { loadData } from '../services/loadData';

interface MedicineProps {
  patient: PatientData;
}

const unitBasedMeds = ['glargine', 'lispro']; // These use units, others use mg

const Medicines: React.FC<MedicineProps> = ({ patient }) => {
  const [medicines, setMedicines] = useState<Medications | null>(null);

  useEffect(() => {
    const getRecommendations = async () => {
      
      const dataset = await loadData(); // sheetData[]
      const meds = await getRecommendedMedications(patient, dataset); // Medications
    //  console.log(meds);
      setMedicines(meds);
    };
    getRecommendations();
  }, [patient]);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center shadow">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Medication Overview</h1>
              <p className="text-gray-600">Key recommendations and patient health summary</p>
            </div>
          </div>

          {/* Patient Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Patient Parameters</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">Age:</span>
                <span className="font-medium text-gray-800">{patient.age} years</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-red-500" />
                <span className="text-gray-600">A1c:</span>
                <span className="font-medium text-red-600">{patient.a1c}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-blue-500" />
                <span className="text-gray-600">CAD:</span>
                <span className="font-medium text-gray-800">{patient.cad ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-purple-500" />
                <span className="text-gray-600">CKD:</span>
                <span className="font-medium text-gray-800">{patient.ckd ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Pill className="w-4 h-4 text-orange-500" />
                <span className="text-gray-600">HLD:</span>
                <span className="font-medium text-gray-800">{patient.hld ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Pill className="w-4 h-4 text-cyan-500" />
                <span className="text-gray-600">Creatinine:</span>
                <span className="font-medium text-gray-800">{patient.creatinine} mg/dL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Medication List */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Pill className="w-5 h-5 text-green-600" />
          Medication Recommendations
        </h2>

        {medicines ? (() => {
  const filteredMeds = Object.entries(medicines).filter(
    ([_, val]) => val !== '' && Number(val) > 0);
   
  return filteredMeds.length > 0 ? (
    <div className="space-y-4">
      {filteredMeds.map(([key, val]) => (
        <div
          key={key}
          className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-900 capitalize">{key}</h3>
          </div>
          <div className="text-right">
            <p className="text-md font-bold text-gray-800">
              {val} {unitBasedMeds.includes(key) ? 'units' : 'mg'}
            </p>
          </div>
        </div>
      ))}
    </div>
    ) : (
      <p className="text-sm text-gray-500">No medications recommended for this patient.</p>
    );})() : (
    <p className="text-sm text-gray-500">Loading medication recommendations...</p>
    )}
      </div>
    </div>
  );
};

export default Medicines;
