import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface Variable {
  id: string;
  name: string;
  value: number;
  unit: string;
  quality: "good" | "bad" | "uncertain";
  timestamp: string;
}

const DataVariables = () => {
  const [variables, setVariables] = useState<Variable[]>([
    {
      id: "1",
      name: "Температура_1",
      value: 23.5,
      unit: "°C",
      quality: "good",
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: "2",
      name: "Давление_насос",
      value: 4.2,
      unit: "bar",
      quality: "good",
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: "3",
      name: "Скорость_мотор",
      value: 1450,
      unit: "об/мин",
      quality: "uncertain",
      timestamp: new Date().toLocaleTimeString(),
    },
    {
      id: "4",
      name: "Уровень_бак",
      value: 0,
      unit: "%",
      quality: "bad",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVariables((prev) =>
        prev.map((variable) => ({
          ...variable,
          value:
            variable.quality === "good"
              ? variable.value + (Math.random() - 0.5) * 2
              : variable.value,
          timestamp: new Date().toLocaleTimeString(),
        })),
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "good":
        return "text-green-400";
      case "bad":
        return "text-red-400";
      case "uncertain":
        return "text-yellow-400";
      default:
        return "text-muted-foreground";
    }
  };

  const getQualityIcon = (quality: string) => {
    switch (quality) {
      case "good":
        return "CheckCircle";
      case "bad":
        return "XCircle";
      case "uncertain":
        return "AlertTriangle";
      default:
        return "HelpCircle";
    }
  };

  return (
    <div className="scada-panel">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Переменные процесса
        </h3>
        <div className="flex items-center gap-2">
          <Icon name="Activity" size={16} className="text-primary" />
          <span className="text-sm text-muted-foreground">Обновление: 2с</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground">
                Переменная
              </th>
              <th className="text-right py-2 px-3 text-sm font-medium text-muted-foreground">
                Значение
              </th>
              <th className="text-center py-2 px-3 text-sm font-medium text-muted-foreground">
                Качество
              </th>
              <th className="text-right py-2 px-3 text-sm font-medium text-muted-foreground">
                Время
              </th>
            </tr>
          </thead>
          <tbody>
            {variables.map((variable) => (
              <tr
                key={variable.id}
                className="border-b border-border/50 hover:bg-secondary/20"
              >
                <td className="py-3 px-3">
                  <span className="font-mono text-sm text-foreground">
                    {variable.name}
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <span className="font-mono font-medium text-foreground">
                    {variable.value.toFixed(1)} {variable.unit}
                  </span>
                </td>
                <td className="py-3 px-3 text-center">
                  <div className="flex items-center justify-center">
                    <Icon
                      name={getQualityIcon(variable.quality)}
                      size={16}
                      className={getQualityColor(variable.quality)}
                    />
                  </div>
                </td>
                <td className="py-3 px-3 text-right">
                  <span className="font-mono text-xs text-muted-foreground">
                    {variable.timestamp}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataVariables;
