"use client";

import { useState, useEffect, useRef } from "react";
import { COUNTRIES, OTHER_FACTOR, countryName, matchesCountry, type Country } from "@/lib/countries";

// Searchable country combobox shared by the calculator and the per-product
// sizing widget. value=null means "Other" / none. Behaviour: zh/en/ru fuzzy
// search, click select, keyboard (Arrow/Enter/Escape), click-outside close.
export default function CountryPicker({
  value,
  onChange,
  locale,
  dict,
  className,
}: {
  value: Country | null;
  onChange: (c: Country | null) => void;
  locale: string;
  dict: Record<string, string>; // needs at least countrySearchPlaceholder + countryOther
  className?: string;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement | null>(null);

  // Close the dropdown when clicking outside the combobox.
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const filtered = COUNTRIES.filter((c) => matchesCountry(c, query));

  function select(c: Country | null) {
    onChange(c);
    setQuery("");
    setOpen(false);
    setActive(0);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    // Total rows = filtered countries + the trailing "Other" option.
    const total = filtered.length + 1;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i + 1) % total);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i - 1 + total) % total);
    } else if (e.key === "Enter") {
      if (!open) return;
      e.preventDefault();
      if (active < filtered.length) select(filtered[active]);
      else select(null); // "Other"
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const selectCls = className ?? "w-full p-3 border border-gray-300 rounded bg-white";

  return (
    <div className="relative" ref={boxRef}>
      <input
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        autoComplete="off"
        value={open ? query : value ? countryName(value, locale) : ""}
        placeholder={dict.countrySearchPlaceholder}
        onFocus={() => {
          setOpen(true);
          setActive(0);
        }}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          setActive(0);
        }}
        onKeyDown={onKeyDown}
        className={selectCls}
      />
      {open && (
        <ul
          role="listbox"
          className="absolute z-20 left-0 right-0 mt-1 max-h-64 overflow-y-auto bg-white border border-gray-300 rounded shadow-lg"
        >
          {filtered.map((c, i) => (
            <li
              key={c.code}
              role="option"
              aria-selected={value?.code === c.code}
              onMouseDown={(e) => {
                e.preventDefault();
                select(c);
              }}
              onMouseEnter={() => setActive(i)}
              className={`flex justify-between items-center gap-3 px-3 py-2 cursor-pointer text-sm ${
                i === active ? "bg-[#FFF7ED]" : ""
              } ${value?.code === c.code ? "font-semibold" : ""}`}
            >
              <span>{countryName(c, locale)}</span>
              <span className="text-gray-400 text-xs whitespace-nowrap">×{c.factor.toFixed(2)}</span>
            </li>
          ))}
          <li
            role="option"
            aria-selected={value === null}
            onMouseDown={(e) => {
              e.preventDefault();
              select(null);
            }}
            onMouseEnter={() => setActive(filtered.length)}
            className={`flex justify-between items-center gap-3 px-3 py-2 cursor-pointer text-sm border-t border-gray-100 ${
              active === filtered.length ? "bg-[#FFF7ED]" : ""
            } ${value === null ? "font-semibold" : ""}`}
          >
            <span>{dict.countryOther}</span>
            <span className="text-gray-400 text-xs whitespace-nowrap">×{OTHER_FACTOR.toFixed(2)}</span>
          </li>
        </ul>
      )}
    </div>
  );
}
