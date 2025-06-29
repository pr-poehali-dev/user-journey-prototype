import { useState } from "react";
import Icon from "@/components/ui/icon";

interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

const navigationItems: NavigationItem[] = [
  {
    id: "connections",
    label: "Подключения",
    icon: "Cable",
    path: "/connections",
  },
  {
    id: "variables",
    label: "Переменные",
    icon: "Database",
    path: "/variables",
  },
  {
    id: "converters",
    label: "Конвекторы",
    icon: "Workflow",
    path: "/converters",
  },
  { id: "projects", label: "Проекты", icon: "FolderOpen", path: "/projects" },
  { id: "signals", label: "Сигналы", icon: "Radio", path: "/signals" },
  { id: "settings", label: "Настройки", icon: "Settings", path: "/settings" },
];

interface SCADANavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const SCADANavigation = ({
  activeSection,
  onSectionChange,
}: SCADANavigationProps) => {
  return (
    <nav className="scada-panel mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">
          Навигация системы
        </h2>
        <div className="flex items-center gap-2">
          <div className="status-indicator status-online"></div>
          <span className="text-sm text-muted-foreground">Система активна</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`tech-button flex flex-col items-center p-4 space-y-2 ${
              activeSection === item.id
                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/25"
                : ""
            }`}
          >
            <Icon name={item.icon} size={24} />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default SCADANavigation;
