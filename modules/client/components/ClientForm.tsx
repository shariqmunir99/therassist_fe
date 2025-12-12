"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ClientFormData,
  AGE_GROUPS,
  RISK_LEVELS,
  GENDERS,
} from "../models/Client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

const clientFormSchema = z.object({
  // email: z
  //   .string()
  //   .min(1, "Email is required")
  //   .email("Please enter a valid email address"),
  alias: z
    .string()
    .min(1, "Alias is required")
    .min(2, "Alias must be at least 2 characters")
    .max(50, "Alias must be less than 50 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Alias can only contain letters, numbers, hyphens, and underscores"
    ),
  ageGroup: z.enum(["10-17", "18-25", "26-40", "40-60", "60+"], {
    message: "Please select an age group",
  }),
  gender: z
    .enum(["male", "female", "non-binary", "prefer-not-to-say"])
    .optional(),
  riskLevel: z.enum(["low", "medium", "high"]).optional(),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

interface ClientFormProps {
  defaultValues?: Partial<ClientFormData>;
  onSubmit: (data: ClientFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
}

export function ClientForm({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading = false,
  submitLabel = "Save",
}: ClientFormProps) {
  const [tagInput, setTagInput] = useState("");

  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: defaultValues || {
      // email: "",
      alias: "",
      ageGroup: undefined,
      gender: undefined,
      riskLevel: undefined,
      tags: [],
      notes: "",
    },
  });

  const tags = form.watch("tags") || [];

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      form.setValue("tags", [...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    form.setValue(
      "tags",
      tags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Email - Full Width - TEMPORARILY HIDDEN */}
        {/* <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Email*</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter client email"
                  {...field}
                  disabled={isLoading}
                  className="h-12 w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2">
          {/* Alias/Code */}
          <FormField
            control={form.control}
            name="alias"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-medium">
                  Alias/Code*
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a unique alias or code"
                    {...field}
                    disabled={isLoading}
                    className="h-12 w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Risk Level */}
          <FormField
            control={form.control}
            name="riskLevel"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-medium">
                  Risk Level (optional)
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 w-full">
                      <SelectValue placeholder="Select risk level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {RISK_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Age Group */}
          <FormField
            control={form.control}
            name="ageGroup"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-medium">
                  Age Group*
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 w-full">
                      <SelectValue placeholder="Select age group" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {AGE_GROUPS.map((group) => (
                      <SelectItem key={group.value} value={group.value}>
                        {group.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-sm font-medium">
                  Gender (optional)
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {GENDERS.map((gender) => (
                      <SelectItem key={gender.value} value={gender.value}>
                        {gender.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Tags/Labels - Full Width */}
        <FormField
          control={form.control}
          name="tags"
          render={() => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Tags/Labels (optional)
              </FormLabel>
              <FormControl>
                <div className="flex min-h-[48px] max-h-[120px] w-full flex-wrap items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 overflow-y-auto">
                  {tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex h-7 shrink-0 items-center justify-center gap-x-1.5 rounded-md bg-gray-100 pl-2 pr-1"
                    >
                      <p className="text-xs font-medium text-gray-800">{tag}</p>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="flex items-center justify-center text-gray-500 hover:text-gray-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagInputKeyDown}
                    onBlur={handleAddTag}
                    placeholder={tags.length === 0 ? "Add tag..." : ""}
                    className="flex-1 min-w-[100px] border-none bg-transparent p-0 text-sm text-gray-900 placeholder-gray-400 focus:ring-0 outline-none"
                    disabled={isLoading}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Background Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Background Notes (optional)
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any relevant background information here..."
                  rows={4}
                  {...field}
                  disabled={isLoading}
                  className="resize-none w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col-reverse items-center justify-end gap-3 border-t pt-6 sm:flex-row">
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isLoading}
              className="h-11 w-full sm:w-auto"
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={isLoading}
            className="h-11 w-full gap-2 sm:w-auto"
          >
            {isLoading ? (
              "Saving..."
            ) : (
              <>
                <Plus className="h-4 w-4" />
                {submitLabel}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
