"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

const professionalInfoSchema = z.object({
  years_experience: z
    .number({ message: "Years of experience must be a number" })
    .int({ message: "Years of experience must be an integer number" })
    .nonnegative({ message: "Years of experience must be positive" }),
  education: z.string().optional(),
  specializations: z
    .array(
      z.string({ message: "Each value in specializations must be a string" })
    )
    .optional(),
  bio: z.string().optional(),
});

type ProfessionalInfoFormValues = z.infer<typeof professionalInfoSchema>;

export default function ProfessionalInfoPage() {
  const router = useRouter();
  const [specializationInput, setSpecializationInput] = useState("");
  const [specializations, setSpecializations] = useState<string[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfessionalInfoFormValues>({
    resolver: zodResolver(professionalInfoSchema),
    mode: "onTouched",
    defaultValues: {
      years_experience: 0,
      education: "",
      specializations: [],
      bio: "",
    },
  });

  const onSubmit = async (data: ProfessionalInfoFormValues) => {
    // TODO: Save data to state management or context
    const formData = { ...data, specializations };
    console.log("Professional Info:", formData);
    router.push("/onboarding/licenses-info");
  };

  const handleAddSpecialization = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && specializationInput.trim()) {
      e.preventDefault();
      const newSpec = specializationInput.trim();
      if (!specializations.includes(newSpec)) {
        const updated = [...specializations, newSpec];
        setSpecializations(updated);
        setValue("specializations", updated);
      }
      setSpecializationInput("");
    }
  };

  const handleRemoveSpecialization = (index: number) => {
    const updated = specializations.filter((_, i) => i !== index);
    setSpecializations(updated);
    setValue("specializations", updated);
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[640px] flex flex-col gap-8">
        {/* Progress Section */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-6 justify-between items-center">
            <p className="text-gray-900 text-base font-medium leading-normal">
              Step 2 of 4
            </p>
            <p className="text-gray-500 text-sm font-normal">50% completed</p>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{ width: "50%" }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="w-full bg-white rounded-lg p-8 sm:p-10 shadow-xl border border-gray-100">
          <div className="mb-10 flex flex-col gap-2">
            <h1 className="text-3xl sm:text-[32px] font-bold text-gray-900 leading-tight tracking-tight">
              Tell us about your work
            </h1>
            <p className="text-gray-500 text-base font-normal leading-relaxed">
              Help us tailor your experience by sharing your professional
              background and expertise.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* Years of Experience and Education */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <label className="flex flex-col gap-2 group">
                <span className="text-gray-900 text-sm font-medium pl-1">
                  Years of Experience
                </span>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none">
                    <span className="material-symbols-outlined text-[20px]">
                      work_history
                    </span>
                  </span>
                  <Controller
                    name="years_experience"
                    control={control}
                    render={({ field: { onChange, value, ...field } }) => (
                      <input
                        {...field}
                        type="number"
                        min="0"
                        value={value}
                        onChange={(e) =>
                          onChange(parseInt(e.target.value) || 0)
                        }
                        placeholder="e.g. 5"
                        className="w-full h-14 bg-gray-50 text-gray-900 border border-gray-200 rounded-full pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-400"
                      />
                    )}
                  />
                </div>
                {errors.years_experience && (
                  <p className="text-red-600 text-sm pl-1">
                    {errors.years_experience.message}
                  </p>
                )}
              </label>

              <label className="flex flex-col gap-2 group">
                <span className="text-gray-900 text-sm font-medium pl-1">
                  Highest Education
                </span>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none">
                    <span className="material-symbols-outlined text-[20px]">
                      school
                    </span>
                  </span>
                  <Controller
                    name="education"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        placeholder="University or Certification"
                        className="w-full h-14 bg-gray-50 text-gray-900 border border-gray-200 rounded-full pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-400"
                      />
                    )}
                  />
                </div>
                {errors.education && (
                  <p className="text-red-600 text-sm pl-1">
                    {errors.education.message}
                  </p>
                )}
              </label>
            </div>

            {/* Specializations */}
            <label className="flex flex-col gap-2">
              <span className="text-gray-900 text-sm font-medium pl-1">
                Specializations
              </span>
              <div className="w-full min-h-[56px] bg-gray-50 border border-gray-200 rounded-3xl p-2 flex flex-wrap items-center gap-2 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent transition-all">
                {specializations.map((spec, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1.5 rounded-full border border-blue-200"
                  >
                    <span className="text-sm font-medium">{spec}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSpecialization(index)}
                      className="text-blue-600 hover:text-white rounded-full p-0.5 hover:bg-blue-600/80 transition-colors flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        close
                      </span>
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  value={specializationInput}
                  onChange={(e) => setSpecializationInput(e.target.value)}
                  onKeyDown={handleAddSpecialization}
                  placeholder="Add skills..."
                  className="flex-1 bg-transparent border-none text-gray-900 placeholder:text-gray-400 focus:ring-0 min-w-[120px] h-10 px-2"
                />
                <span className="material-symbols-outlined text-gray-400 pr-2 text-[20px]">
                  add_circle
                </span>
              </div>
              {errors.specializations && (
                <p className="text-red-600 text-sm pl-1">
                  {errors.specializations.message}
                </p>
              )}
            </label>

            {/* Bio */}
            <label className="flex flex-col gap-2">
              <span className="text-gray-900 text-sm font-medium pl-1">
                Short Bio
              </span>
              <Controller
                name="bio"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Write a few sentences about your professional journey..."
                    className="w-full bg-gray-50 text-gray-900 border border-gray-200 rounded-3xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-400 resize-none h-32"
                  />
                )}
              />
              {errors.bio && (
                <p className="text-red-600 text-sm pl-1">
                  {errors.bio.message}
                </p>
              )}
            </label>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 mt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => router.push("/onboarding/personal-info")}
                className="group flex items-center gap-2 px-6 h-12 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all font-medium"
              >
                <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform text-[20px]">
                  arrow_back
                </span>
                Back
              </button>
              <button
                type="submit"
                className="group flex items-center gap-2 px-8 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40"
              >
                Next Step
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-[20px]">
                  arrow_forward
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
