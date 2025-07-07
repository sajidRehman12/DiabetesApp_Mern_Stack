import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { PatientData } from '../types/vitals';
import { User, Activity, Droplets, CheckCircle, AlertCircle, BarChart3 } from 'lucide-react';
import Medicines from './Medicines';

const VitalsForm: React.FC = () => {
  const [isReportVisible, setIsReportVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PatientData>({
    defaultValues: {
      patientId: '',
      age: '',
      gender: '',
      weight: '',
      height: '',
      duration: '',
      a1c: '',
      ckd: false,
      cad: false,
      hld: false,
      lowActivity: '',
      mediumActivity: '',
      highActivity: '',
      fbsBb: '',
      fbsBl: '',
      fbsBd: '',
      fbsBbd: '',
      creatinine: ''
    },
    mode: 'onChange'
  });

  const formData = watch();
 
  // Validation rules
  const validationRules = {
    age: {
      required: 'Age is required',
      min: { value: 20, message: 'Age must be at least 20' },
      max: { value: 100, message: 'Age must be at most 100' }
    },
    gender: {
      required: 'Gender is required'
    },
    weight: {
      required: 'Weight is required',
      min: { value: 40, message: 'Weight must be at least 40 lbs' },
      max: { value: 600, message: 'Weight must be at most 600 lbs' }
    },
    height: {
      required: 'Height is required',
      min: { value: 48, message: 'Height must be at least 48 inches' },
      max: { value: 84, message: 'Height must be at most 84 inches' }
    },
    duration: {
      required: 'Duration is required',
      min: { value: 1, message: 'Duration must be at least 1 month' },
      max: { value: 600, message: 'Duration must be at most 600 months' }
    },
    a1c: {
      required: 'A1C level is required',
      min: { value: 6, message: 'A1C must be at least 6%' },
      max: { value: 20, message: 'A1C must be at most 20%' }
    },
    creatinine: {
      required: 'Creatinine level is required',
      min: { value: 0.2, message: 'Creatinine must be at least 0.2 mg/dL' },
      max: { value: 14, message: 'Creatinine must be at most 14 mg/dL' }
    },
    lowActivity: {
      min: { value: 0, message: 'Activity must be at least 0 minutes' },
      max: { value: 600, message: 'Activity must be at most 600 minutes' }
    },
    mediumActivity: {
      min: { value: 0, message: 'Activity must be at least 0 minutes' },
      max: { value: 600, message: 'Activity must be at most 600 minutes' }
    },
    highActivity: {
      min: { value: 0, message: 'Activity must be at least 0 minutes' },
      max: { value: 600, message: 'Activity must be at most 600 minutes' }
    },
    fbsBb: {
      required: 'FBS is required',
      min: { value: 20, message: 'FBS must be at least 20 mg/dL' },
      max: { value: 600, message: 'FBS must be at most 600 mg/dL' }
    },
    fbsBl: {
      required: 'FBS is required',
      min: { value: 20, message: 'FBS must be at least 20 mg/dL' },
      max: { value: 600, message: 'FBS must be at most 600 mg/dL' }
    },
    fbsBd: {
      required: 'FBS is required',
      min: { value: 20, message: 'FBS must be at least 20 mg/dL' },
      max: { value: 600, message: 'FBS must be at most 600 mg/dL' }
    },
    fbsBbd: {
      required: 'FBS is required',
      min: { value: 20, message: 'FBS must be at least 20 mg/dL' },
      max: { value: 600, message: 'FBS must be at most 600 mg/dL' }
    }
  };

  const onSubmit = (data: PatientData) => {
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    console.log('Form Data:', data);
    setIsReportVisible(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <form onSubmit={handleSubmit(onSubmit)} className="xl:col-span-3 space-y-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              
              {/* Patient Demographics */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-blue-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-900">Patient Demographics</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    {/* Patient ID */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                        Patient ID
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          {...register('patientId')}
                          className={`w-full px-4 py-3 border rounded-lg bg-white transition-all duration-200 text-slate-900 placeholder-slate-400
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-400
                            ${errors.patientId ? 'border-red-300 bg-red-50' : 'border-slate-300'}`}
                          placeholder="Enter unique patient identifier"
                        />
                        {errors.patientId && (
                          <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                            <AlertCircle className="w-3 h-3" />
                            {errors.patientId.message}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Age */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                        Age
                        <span className="text-red-500 text-xs">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          {...register('age', {
                            ...validationRules.age,
                            valueAsNumber: true
                          })}
                          className={`w-full px-4 py-3 border rounded-lg bg-white transition-all duration-200 text-slate-900 placeholder-slate-400
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-400
                            ${errors.age ? 'border-red-300 bg-red-50' : 'border-slate-300'}`}
                          placeholder="20-100 years"
                          min="20"
                          max="100"
                        />
                        {errors.age && (
                          <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                            <AlertCircle className="w-3 h-3" />
                            {errors.age.message}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700">
                        Gender <span className="text-red-500 text-xs">*</span>
                      </label>
                      <select
                        {...register('gender', validationRules.gender)}
                        className={`w-full px-4 py-3 border rounded-lg bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                          ${errors.gender ? 'border-red-300 bg-red-50' : 'border-slate-300'}`}
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && (
                        <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                          <AlertCircle className="w-3 h-3" />
                          {errors.gender.message}
                        </div>
                      )}
                    </div>

                    {/* Weight */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                        Weight (lbs)
                        <span className="text-red-500 text-xs">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          {...register('weight', {
                            ...validationRules.weight,
                            valueAsNumber: true
                          })}
                          className={`w-full px-4 py-3 border rounded-lg bg-white transition-all duration-200 text-slate-900 placeholder-slate-400
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-400
                            ${errors.weight ? 'border-red-300 bg-red-50' : 'border-slate-300'}`}
                          placeholder="40-600 lbs"
                          min="40"
                          max="600"
                        />
                        {errors.weight && (
                          <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                            <AlertCircle className="w-3 h-3" />
                            {errors.weight.message}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Height */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                        Height (inches)
                        <span className="text-red-500 text-xs">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          {...register('height', {
                            ...validationRules.height,
                            valueAsNumber: true
                          })}
                          className={`w-full px-4 py-3 border rounded-lg bg-white transition-all duration-200 text-slate-900 placeholder-slate-400
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-400
                            ${errors.height ? 'border-red-300 bg-red-50' : 'border-slate-300'}`}
                          placeholder="48-84 inches"
                          min="48"
                          max="84"
                        />
                        {errors.height && (
                          <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                            <AlertCircle className="w-3 h-3" />
                            {errors.height.message}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Duration */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                        Diabetes Duration
                        <span className="text-red-500 text-xs">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          {...register('duration', {
                            ...validationRules.duration,
                            valueAsNumber: true
                          })}
                          className={`w-full px-4 py-3 border rounded-lg bg-white transition-all duration-200 text-slate-900 placeholder-slate-400
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-400
                            ${errors.duration ? 'border-red-300 bg-red-50' : 'border-slate-300'}`}
                          placeholder="1-600 months"
                          min="1"
                          max="600"
                        />
                        {errors.duration && (
                          <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                            <AlertCircle className="w-3 h-3" />
                            {errors.duration.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clinical Markers */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                      <Droplets className="w-4 h-4 text-red-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-900">Clinical Markers</h2>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    
                    {/* A1C */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                        Hemoglobin A1C (%)
                        <span className="text-red-500 text-xs">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          {...register('a1c', {
                            ...validationRules.a1c,
                            valueAsNumber: true
                          })}
                          className={`w-full px-4 py-3 border rounded-lg bg-white transition-all duration-200 text-slate-900 placeholder-slate-400
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-400
                            ${errors.a1c ? 'border-red-300 bg-red-50' : 'border-slate-300'}`}
                          placeholder="6.0-20.0%"
                          min="6"
                          max="20"
                        />
                        {errors.a1c && (
                          <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                            <AlertCircle className="w-3 h-3" />
                            {errors.a1c.message}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Creatinine */}
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                        Serum Creatinine (mg/dL)
                        <span className="text-red-500 text-xs">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.1"
                          {...register('creatinine', {
                            ...validationRules.creatinine,
                            valueAsNumber: true
                          })}
                          className={`w-full px-4 py-3 border rounded-lg bg-white transition-all duration-200 text-slate-900 placeholder-slate-400
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-400
                            ${errors.creatinine ? 'border-red-300 bg-red-50' : 'border-slate-300'}`}
                          placeholder="0.2-14.0 mg/dL"
                          min="0.2"
                          max="14"
                        />
                        {errors.creatinine && (
                          <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                            <AlertCircle className="w-3 h-3" />
                            {errors.creatinine.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-slate-700">Comorbid Conditions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { key: 'ckd', label: 'Chronic Kidney Disease', desc: 'CKD', color: 'border-blue-200 hover:bg-blue-50' },
                        { key: 'cad', label: 'Coronary Artery Disease', desc: 'CAD', color: 'border-red-200 hover:bg-red-50' },
                        { key: 'hld', label: 'Hyperlipidemia', desc: 'HLD', color: 'border-amber-200 hover:bg-amber-50' }
                      ].map(({ key, label, desc, color }) => (
                        <label key={key} className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${color} ${formData[key as keyof PatientData] ? 'bg-blue-50 border-blue-300' : 'bg-white hover:shadow-sm'}`}>
                          <input
                            type="checkbox"
                            {...register(key as keyof PatientData)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-0.5"
                          />
                          <div>
                            <div className="text-sm font-medium text-slate-900">{desc}</div>
                            <div className="text-xs text-slate-600">{label}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity & Glucose Monitoring */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Activity className="w-4 h-4 text-emerald-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-slate-900">Activity & Glucose Monitoring</h2>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 mb-4">Physical Activity (minutes per day)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      {/* Low Activity */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Low Intensity
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            {...register('lowActivity', {
                              ...validationRules.lowActivity,
                              valueAsNumber: true
                            })}
                            className={`w-full px-4 py-3 border rounded-lg bg-white transition-all duration-200 text-slate-900 placeholder-slate-400
                              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-400
                              ${errors.lowActivity ? 'border-red-300 bg-red-50' : 'border-slate-300'}`}
                            placeholder="0-600 min"
                            min="0"
                            max="600"
                          />
                          {errors.lowActivity && (
                            <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                              <AlertCircle className="w-3 h-3" />
                              {errors.lowActivity.message}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Medium Activity */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          Medium Intensity
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            {...register('mediumActivity', {
                              ...validationRules.mediumActivity,
                              valueAsNumber: true
                            })}
                            className={`w-full px-4 py-3 border rounded-lg bg-white transition-all duration-200 text-slate-900 placeholder-slate-400
                              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-400
                              ${errors.mediumActivity ? 'border-red-300 bg-red-50' : 'border-slate-300'}`}
                            placeholder="0-600 min"
                            min="0"
                            max="600"
                          />
                          {errors.mediumActivity && (
                            <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                              <AlertCircle className="w-3 h-3" />
                              {errors.mediumActivity.message}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* High Activity */}
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-slate-700">
                          High Intensity
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            {...register('highActivity', {
                              ...validationRules.highActivity,
                              valueAsNumber: true
                            })}
                            className={`w-full px-4 py-3 border rounded-lg bg-white transition-all duration-200 text-slate-900 placeholder-slate-400
                              focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-400
                              ${errors.highActivity ? 'border-red-300 bg-red-50' : 'border-slate-300'}`}
                            placeholder="0-600 min"
                            min="0"
                            max="600"
                          />
                          {errors.highActivity && (
                            <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                              <AlertCircle className="w-3 h-3" />
                              {errors.highActivity.message}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 mb-4">Fasting Blood Sugar Readings (mg/dL)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* FBS fields */}
                      {[
                        { key: 'fbsBb', label: 'BB - Before Breakfast' },
                        { key: 'fbsBl', label: 'BL - Before Lunch' },
                        { key: 'fbsBd', label: 'BD - Before Dinner' },
                        { key: 'fbsBbd', label: 'BBD - Before Bedtime' }
                      ].map(({ key, label }) => (
                        <div key={key} className="space-y-2">
                          <label className="block text-sm font-semibold text-slate-700">
                            {label}
                              <span className="text-red-500 text-xs">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="number"
                              {...register(key as keyof PatientData, {
                                ...validationRules[key as keyof typeof validationRules],
                                valueAsNumber: true
                              })}
                              className={`w-full px-4 py-3 border rounded-lg bg-white transition-all duration-200 text-slate-900 placeholder-slate-400
                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-slate-400
                                ${errors[key as keyof PatientData] ? 'border-red-300 bg-red-50' : 'border-slate-300'}`}
                              placeholder="20-600 mg/dL"
                              min="20"
                              max="600"
                            />
                            {errors[key as keyof PatientData] && (
                              <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
                                <AlertCircle className="w-3 h-3" />
                                {errors[key as keyof PatientData]?.message}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-start mt-auto h-14">
                <button
                  type="submit"
                  className={`px-8 py-3 rounded-lg font-semibold text-white transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                    ${isSubmitted 
                      ? 'bg-emerald-600 hover:bg-emerald-700' 
                      : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  disabled={isSubmitted}
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Assessment Complete
                    </>
                  ) : (
                    <>
                      <BarChart3 className="w-5 h-5" />
                      Generate Assessment
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      {isReportVisible && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
    <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-6 relative overflow-y-auto max-h-[90vh] animate-slideUp">
      <button
        onClick={() => setIsReportVisible(false)}
        className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-xl transition-colors duration-300">
        &times;
      </button>
      <Medicines patient={formData} />
    </div>
  </div>
)}
    </div>
  );
};

export default VitalsForm;