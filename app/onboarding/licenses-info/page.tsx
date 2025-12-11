"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";

const licensesInfoSchema = z.object({
  license_number: z
    .string()
    .min(1, { message: "License number should not be empty" }),
  issuing_country: z
    .string()
    .min(1, { message: "Issuing country should not be empty" }),
});

type LicensesInfoFormValues = z.infer<typeof licensesInfoSchema>;

export default function LicensesInfoPage() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LicensesInfoFormValues>({
    resolver: zodResolver(licensesInfoSchema),
    mode: "onTouched",
    defaultValues: {
      license_number: "",
      issuing_country: "",
    },
  });

  const onSubmit = async (data: LicensesInfoFormValues) => {
    // TODO: Save data to state management or context
    console.log("Licenses Info:", data);
    router.push("/onboarding/availability");
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[640px] flex flex-col gap-8">
        {/* Progress Section */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-6 justify-between items-center">
            <p className="text-gray-900 text-base font-medium leading-normal">
              Step 3 of 4
            </p>
            <p className="text-gray-500 text-sm font-normal">75% completed</p>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{ width: "75%" }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="w-full bg-white rounded-lg p-8 sm:p-10 shadow-xl border border-gray-100">
          <div className="mb-10 flex flex-col gap-2">
            <h1 className="text-3xl sm:text-[32px] font-bold text-gray-900 leading-tight tracking-tight">
              License Information
            </h1>
            <p className="text-gray-500 text-base font-normal leading-relaxed">
              Verify your professional credentials to ensure you meet our
              standards.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* License Number */}
            <label className="flex flex-col gap-2 group">
              <span className="text-gray-900 text-sm font-medium pl-1">
                License Number
              </span>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none">
                  <span className="material-symbols-outlined text-[20px]">
                    badge
                  </span>
                </span>
                <Controller
                  name="license_number"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="e.g. LIC-123456"
                      className="w-full h-14 bg-gray-50 text-gray-900 border border-gray-200 rounded-full pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder:text-gray-400"
                    />
                  )}
                />
              </div>
              {errors.license_number && (
                <p className="text-red-600 text-sm pl-1">
                  {errors.license_number.message}
                </p>
              )}
            </label>

            {/* Issuing Country */}
            <label className="flex flex-col gap-2 group">
              <span className="text-gray-900 text-sm font-medium pl-1">
                Issuing Country
              </span>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none">
                  <span className="material-symbols-outlined text-[20px]">
                    public
                  </span>
                </span>
                <Controller
                  name="issuing_country"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="form-select w-full h-14 bg-gray-50 text-gray-900 border border-gray-200 rounded-full pl-12 pr-4 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      style={{
                        backgroundImage:
                          "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236B7280%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpolyline points=%226 9 12 15 18 9%22%3E%3C/polyline%3E%3C/svg%3E')",
                        backgroundPosition: "right 1rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.5em 1.5em",
                      }}
                    >
                      <option value="">Select issuing country</option>
                      <option value="us">United States</option>
                      <option value="ca">Canada</option>
                      <option value="uk">United Kingdom</option>
                      <option value="au">Australia</option>
                      <option value="pk">Pakistan</option>
                      <option value="in">India</option>
                      <option value="other">Other</option>
                    </select>
                  )}
                />
              </div>
              {errors.issuing_country && (
                <p className="text-red-600 text-sm pl-1">
                  {errors.issuing_country.message}
                </p>
              )}
            </label>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 mt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => router.push("/onboarding/professional-info")}
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
