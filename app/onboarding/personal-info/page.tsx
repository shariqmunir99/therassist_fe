"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

const personalInfoSchema = z.object({
  name: z.string().min(1, { message: "Name should not be empty" }),
  gender: z.string().min(1, { message: "Gender should not be empty" }),
  country: z.string().min(1, { message: "Country should not be empty" }),
  city: z.string().min(1, { message: "City should not be empty" }),
  phone: z.string().min(1, { message: "Phone should not be empty" }),
});

type PersonalInfoFormValues = z.infer<typeof personalInfoSchema>;

export default function PersonalInfoPage() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalInfoFormValues>({
    resolver: zodResolver(personalInfoSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      gender: "",
      country: "",
      city: "",
      phone: "",
    },
  });

  const onSubmit = async (data: PersonalInfoFormValues) => {
    // TODO: Save data to state management or context
    console.log("Personal Info:", data);
    router.push("/onboarding/professional-info");
  };

  const handleSkip = () => {
    router.push("/onboarding/professional-info");
  };

  return (
    <div className="relative min-h-screen w-full bg-[#F8F9FB] overflow-x-hidden">
      {/* Ambient Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]"
          aria-hidden="true"
        />
      </div>

      <div className="px-6 md:px-20 lg:px-40 flex flex-1 justify-center py-10">
        <div className="flex flex-col max-w-[800px] w-full">
          {/* Progress Section */}
          <div className="flex flex-col gap-3 px-4 mb-8">
            <div className="flex gap-6 justify-between">
              <p className="text-slate-900 text-sm font-bold uppercase tracking-wider">
                STEP 1 OF 4
              </p>
              <span className="text-slate-500 text-sm">Personal Info</span>
            </div>
            <div className="rounded-full bg-slate-200 overflow-hidden h-2">
              <div
                className="h-full rounded-full bg-blue-500 transition-all duration-300"
                style={{ width: "25%" }}
              />
            </div>
          </div>

          {/* Header */}
          <div className="flex flex-wrap justify-between gap-3 px-4 mb-8">
            <div className="flex min-w-72 flex-col gap-3">
              <h1 className="text-slate-900 text-4xl font-black leading-tight tracking-[-0.033em]">
                Let's get started
              </h1>
              <p className="text-slate-500 text-base font-normal leading-normal">
                We need a few details to personalize your experience.
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6 px-4"
          >
            {/* Gender and Country Row */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col flex-1 gap-2">
                <label
                  className="text-slate-900 text-base font-medium leading-normal"
                  htmlFor="gender"
                >
                  Gender
                </label>
                <div className="relative">
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        id="gender"
                        className="form-select w-full rounded-full border border-slate-300 bg-white text-slate-900 h-14 px-5 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors text-base font-normal leading-normal"
                        style={{
                          backgroundImage:
                            "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236B7280%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpolyline points=%226 9 12 15 18 9%22%3E%3C/polyline%3E%3C/svg%3E')",
                          backgroundPosition: "right 1rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                        }}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="prefer-not-say">
                          Prefer not to say
                        </option>
                      </select>
                    )}
                  />
                </div>
                {errors.gender && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col flex-1 gap-2">
                <label
                  className="text-slate-900 text-base font-medium leading-normal"
                  htmlFor="country"
                >
                  Country
                </label>
                <div className="relative">
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        id="country"
                        className="form-select w-full rounded-full border border-slate-300 bg-white text-slate-900 h-14 px-5 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors text-base font-normal leading-normal"
                        style={{
                          backgroundImage:
                            "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%236B7280%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpolyline points=%226 9 12 15 18 9%22%3E%3C/polyline%3E%3C/svg%3E')",
                          backgroundPosition: "right 1rem center",
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "1.5em 1.5em",
                        }}
                      >
                        <option value="">Select country</option>
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
                {errors.country && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>

            {/* City */}
            <div className="flex flex-col gap-2">
              <label
                className="text-slate-900 text-base font-medium leading-normal"
                htmlFor="city"
              >
                City
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-5 text-slate-500 pointer-events-none">
                  <span className="material-symbols-outlined text-xl leading-none">
                    location_city
                  </span>
                </span>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="city"
                      type="text"
                      placeholder="e.g. New York"
                      className="w-full rounded-full border border-slate-300 bg-white text-slate-900 h-14 pl-12 pr-5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors text-base font-normal leading-normal placeholder:text-slate-400"
                    />
                  )}
                />
              </div>
              {errors.city && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
              <label
                className="text-slate-900 text-base font-medium leading-normal"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-5 text-slate-500 pointer-events-none">
                  <span className="material-symbols-outlined text-xl leading-none">
                    call
                  </span>
                </span>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-full border border-slate-300 bg-white text-slate-900 h-14 pl-12 pr-5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors text-base font-normal leading-normal placeholder:text-slate-400"
                    />
                  )}
                />
              </div>
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 mt-8 pt-4">
              <button
                type="button"
                onClick={handleSkip}
                className="w-full md:w-auto px-8 h-12 rounded-full border border-transparent text-slate-500 hover:text-slate-900 font-bold text-base transition-colors focus:outline-none focus:underline"
              >
                Skip for now
              </button>
              <button
                type="submit"
                className="w-full md:w-auto px-10 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg shadow-[0_4px_14px_0_rgba(59,130,246,0.3)] transition-all hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-500/30 flex items-center justify-center gap-2"
              >
                Continue
                <span className="material-symbols-outlined text-xl">
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
