"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (id: string) => void;
  children: (activeTab: string) => React.ReactNode;
  className?: string;
}

export function Tabs({ tabs, defaultTab, onChange, children, className }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);

  const handleChange = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  return (
    <div className={className}>
      <div className="border-b border-slate-200 flex gap-0 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleChange(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
              active === tab.id
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="animate-fade-in">{children(active)}</div>
    </div>
  );
}
