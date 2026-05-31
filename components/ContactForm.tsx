"use client";

import { useState } from "react";
import { site } from "@/data/site";

type FormState = {
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  vehicle: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Name, email, and message are required.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const subject = encodeURIComponent(`${site.name} inquiry from ${form.name}`);
    const body = encodeURIComponent(
      [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone || "Not provided"}`,
        `Vehicle: ${form.vehicle || "Not provided"}`,
        "",
        form.message,
      ].join("\n"),
    );

    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setForm(initialState);
  }

  if (submitted) {
    return (
      <div className="card-surface p-6">
        <h3 className="text-lg font-semibold text-foreground">Message ready to send</h3>
        <p className="mt-2 text-sm text-muted">
          Your email client should open with your message pre-filled. If it did not
          open, email us directly at{" "}
          <a href={`mailto:${site.email}`} className="font-medium text-primary hover:underline">
            {site.email}
          </a>
          .
        </p>
        <button
          type="button"
          className="btn-secondary mt-4"
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface space-y-4 p-6">
      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">Name *</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="rounded-md border border-border px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            required
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">Email *</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="rounded-md border border-border px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            required
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">Phone</span>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="rounded-md border border-border px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium">Vehicle (Year / Make / Model)</span>
          <input
            type="text"
            name="vehicle"
            value={form.vehicle}
            onChange={handleChange}
            placeholder="e.g. 2018 Honda Accord"
            className="rounded-md border border-border px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium">Message *</span>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          className="rounded-md border border-border px-3 py-2.5 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          required
        />
      </label>

      <button type="submit" className="btn-primary">
        Send Message
      </button>
    </form>
  );
}
