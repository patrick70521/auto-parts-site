"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  partCategoryOptions,
  vehicleMakes,
  vehicleModels,
  vehicleYears,
} from "@/data/categories";

type PartFinderProps = {
  variant?: "hero" | "compact";
  onSearchComplete?: () => void;
};

export default function PartFinder({
  variant = "compact",
  onSearchComplete,
}: PartFinderProps) {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [part, setPart] = useState("");
  const [message, setMessage] = useState("");

  const availableModels = useMemo(() => {
    if (!make) return [];
    return vehicleModels[make] ?? [];
  }, [make]);

  function handleClear() {
    setYear("");
    setMake("");
    setModel("");
    setPart("");
    setMessage("");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!year || !make || !model || !part) {
      setMessage("Please select year, make, model, and part category.");
      return;
    }

    const partLabel =
      partCategoryOptions.find((option) => option.value === part)?.label ?? part;

    setMessage(
      `Looking for ${partLabel} for your ${year} ${make} ${model}? Contact us for availability and pricing.`,
    );
    onSearchComplete?.();
  }

  const isCompact = variant === "compact";

  const headerRow = (
    <div
      className={
        isCompact
          ? "mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
          : "mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
      }
    >
      <h2
        className={
          isCompact
            ? "text-lg font-bold text-foreground"
            : "text-xl font-bold text-foreground"
        }
      >
        Find Your Part
      </h2>
      <button type="button" className="btn-secondary w-fit text-xs" onClick={handleClear}>
        Clear Selection
      </button>
    </div>
  );

  const formFields = (
    <form
      onSubmit={handleSubmit}
      className={
        isCompact
          ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:items-end"
          : "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      }
    >
      <label className="flex flex-col gap-1 text-sm">
        {!isCompact && <span className="font-medium text-foreground">Select Year</span>}
        <select
          value={year}
          onChange={(event) => setYear(event.target.value)}
          className="select-field"
          aria-label="Select Year"
        >
          <option value="">Select Year</option>
          {vehicleYears.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm">
        {!isCompact && <span className="font-medium text-foreground">Select Make</span>}
        <select
          value={make}
          onChange={(event) => {
            setMake(event.target.value);
            setModel("");
          }}
          className="select-field"
          aria-label="Select Make"
        >
          <option value="">Select Make</option>
          {vehicleMakes.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm">
        {!isCompact && <span className="font-medium text-foreground">Select Model</span>}
        <select
          value={model}
          onChange={(event) => setModel(event.target.value)}
          disabled={!make}
          className="select-field disabled:cursor-not-allowed disabled:bg-background-alt"
          aria-label="Select Model"
        >
          <option value="">Select Model</option>
          {availableModels.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm">
        {!isCompact && <span className="font-medium text-foreground">Select Parts</span>}
        <select
          value={part}
          onChange={(event) => setPart(event.target.value)}
          className="select-field"
          aria-label="Select Parts"
        >
          <option value="">Select Parts</option>
          {partCategoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <div className={isCompact ? "" : "sm:col-span-2 lg:col-span-4"}>
        <button type="submit" className="btn-primary w-full">
          Search Parts
        </button>
      </div>
    </form>
  );

  const messageBlock = message && (
    <div
      className="mt-4 border border-border bg-white px-4 py-3 text-sm text-foreground"
      role="status"
    >
      <p>{message}</p>
      <Link
        href="/contact"
        className="mt-2 inline-block font-semibold text-primary hover:underline"
      >
        Contact us for availability
      </Link>
    </div>
  );

  if (isCompact) {
    return (
      <div className="container-page py-5">
        {headerRow}
        {formFields}
        {messageBlock}
      </div>
    );
  }

  return (
    <div className="card-surface p-6 sm:p-8">
      {headerRow}
      {formFields}
      {messageBlock}
    </div>
  );
}
