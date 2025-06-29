import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface Variable {
  id: string;
  name: string;
  value: number;
  unit: string;
  quality: "good" | "bad" | "uncertain";
  timestamp: string;
  visible: boolean;
  children?: Variable[];
}

interface Connection {
  id: string;
  name: string;
  status: "connected" | "disconnected";
  host: string;
  port: number;
}

const DataVariables = () => {
  const [connections] = useState<Connection[]>([
    {
      id: "1",
      name: "Modbus TCP #1",
      status: "connected",
      host: "192.168.1.100",
      port: 502,
    },
    {
      id: "2",
      name: "OPC UA Server",
      status: "connected",
      host: "192.168.1.101",
      port: 4840,
    },
    {
      id: "3",
      name: "Profinet Device",
      status: "disconnected",
      host: "192.168.1.102",
      port: 34962,
    },
  ]);

  const [variables, setVariables] = useState<Variable[]>([
    {
      id: "group1",
      name: "Температурные датчики",
      value: 0,
      unit: "",
      quality: "good",
      timestamp: "",
      visible: false,
      children: [
        {
          id: "1",
          name: "Температура_реактор_1",
          value: 145.2,
          unit: "°C",
          quality: "good",
          timestamp: new Date().toLocaleTimeString(),
          visible: true,
        },
        {
          id: "2",
          name: "Температура_реактор_2",
          value: 138.7,
          unit: "°C",
          quality: "good",
          timestamp: new Date().toLocaleTimeString(),
          visible: false,
        },
      ],
    },
    {
      id: "group2",
      name: "Давление и расход",
      value: 0,
      unit: "",
      quality: "good",
      timestamp: "",
      visible: false,
      children: [
        {
          id: "3",
          name: "Давление_насос_1",
          value: 4.2,
          unit: "bar",
          quality: "good",
          timestamp: new Date().toLocaleTimeString(),
          visible: true,
        },
        {
          id: "4",
          name: "Расход_линия_А",
          value: 125.8,
          unit: "л/мин",
          quality: "uncertain",
          timestamp: new Date().toLocaleTimeString(),
          visible: false,
        },
        {
          id: "5",
          name: "Давление_магистраль",
          value: 0,
          unit: "bar",
          quality: "bad",
          timestamp: new Date().toLocaleTimeString(),
          visible: false,
        },
      ],
    },
    {
      id: "group3",
      name: "Электропривод",
      value: 0,
      unit: "",
      quality: "good",
      timestamp: "",
      visible: false,
      children: [
        {
          id: "6",
          name: "Скорость_мотор_главный",
          value: 1450,
          unit: "об/мин",
          quality: "good",
          timestamp: new Date().toLocaleTimeString(),
          visible: true,
        },
        {
          id: "7",
          name: "Ток_статора",
          value: 24.5,
          unit: "А",
          quality: "good",
          timestamp: new Date().toLocaleTimeString(),
          visible: false,
        },
      ],
    },
  ]);

  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(["group1", "group2", "group3"]),
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVariables((prev) =>
        prev.map((group) => ({
          ...group,
          children: group.children?.map((variable) => ({
            ...variable,
            value:
              variable.quality === "good"
                ? variable.value +
                  (Math.random() - 0.5) * (variable.value * 0.05)
                : variable.value,
            timestamp: new Date().toLocaleTimeString(),
          })),
        })),
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  const toggleVariableVisibility = (groupId: string, variableId: string) => {
    setVariables((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              children: group.children?.map((variable) =>
                variable.id === variableId
                  ? { ...variable, visible: !variable.visible }
                  : variable,
              ),
            }
          : group,
      ),
    );
  };

  const loadVariables = async () => {
    setIsLoading(true);
    // Имитация загрузки переменных
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

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
    <div className="grid grid-cols-12 gap-6">
      {/* Левая панель - Дерево переменных */}
      <div className="col-span-4 scada-panel">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Дерево переменных
          </h3>
          <div className="flex items-center gap-2">
            <div className="status-indicator status-online"></div>
            <span className="text-xs text-muted-foreground">Активно</span>
          </div>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {variables.map((group) => (
            <div key={group.id} className="border border-border rounded-lg">
              <button
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center gap-2 p-3 hover:bg-secondary/20 rounded-t-lg"
              >
                <Icon
                  name={
                    expandedGroups.has(group.id)
                      ? "ChevronDown"
                      : "ChevronRight"
                  }
                  size={16}
                  className="text-muted-foreground"
                />
                <Icon name="Folder" size={16} className="text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {group.name}
                </span>
              </button>

              {expandedGroups.has(group.id) && group.children && (
                <div className="border-t border-border">
                  {group.children.map((variable) => (
                    <div
                      key={variable.id}
                      className="flex items-center gap-2 p-2 pl-8 hover:bg-secondary/10"
                    >
                      <Checkbox
                        id={`var-${variable.id}`}
                        checked={variable.visible}
                        onCheckedChange={() =>
                          toggleVariableVisibility(group.id, variable.id)
                        }
                      />
                      <Icon
                        name={variable.visible ? "Eye" : "EyeOff"}
                        size={14}
                        className={
                          variable.visible
                            ? "text-primary"
                            : "text-muted-foreground"
                        }
                      />
                      <span className="text-sm font-mono text-foreground flex-1">
                        {variable.name}
                      </span>
                      <Icon
                        name={getQualityIcon(variable.quality)}
                        size={12}
                        className={getQualityColor(variable.quality)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Средняя панель - Управление подключениями */}
      <div className="col-span-3 scada-panel">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Подключения</h3>
        </div>

        <div className="space-y-3 mb-4">
          {connections.map((conn) => (
            <div key={conn.id} className="bg-secondary/30 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Icon
                  name="Plug"
                  size={16}
                  className={
                    conn.status === "connected"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                />
                <span className="text-sm font-medium text-foreground">
                  {conn.name}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                {conn.host}:{conn.port}
              </div>
              <div
                className={`text-xs mt-1 ${conn.status === "connected" ? "text-green-400" : "text-red-400"}`}
              >
                {conn.status === "connected" ? "Подключено" : "Нет связи"}
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={loadVariables}
          disabled={isLoading}
          className="w-full tech-button"
        >
          {isLoading ? (
            <>
              <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
              Загрузка...
            </>
          ) : (
            <>
              <Icon name="Download" size={16} className="mr-2" />
              Загрузить переменные
            </>
          )}
        </Button>
      </div>

      {/* Правая панель - Данные переменных */}
      <div className="col-span-5 scada-panel">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Данные переменных
          </h3>
          <div className="flex items-center gap-2">
            <Icon name="Activity" size={16} className="text-primary" />
            <span className="text-sm text-muted-foreground">
              Обновление: 3с
            </span>
          </div>
        </div>

        <div className="overflow-x-auto max-h-96">
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
                  Статус
                </th>
              </tr>
            </thead>
            <tbody>
              {variables
                .flatMap((group) => group.children || [])
                .filter((variable) => variable.visible)
                .map((variable) => (
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
                      <Icon
                        name={getQualityIcon(variable.quality)}
                        size={16}
                        className={getQualityColor(variable.quality)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {variables
            .flatMap((group) => group.children || [])
            .filter((v) => v.visible).length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Icon
                name="Database"
                size={32}
                className="mx-auto mb-2 opacity-50"
              />
              <p>Выберите переменные для отображения</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataVariables;
