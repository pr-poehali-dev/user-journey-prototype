import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

interface SettingGroup {
  title: string;
  icon: string;
  settings: Setting[];
}

interface Setting {
  id: string;
  label: string;
  value: string | number | boolean;
  type: "text" | "number" | "boolean" | "select";
  options?: string[];
}

const settingsGroups: SettingGroup[] = [
  {
    title: "Сетевые подключения",
    icon: "Network",
    settings: [
      {
        id: "modbus_port",
        label: "Modbus TCP порт",
        value: 502,
        type: "number",
      },
      {
        id: "opcua_endpoint",
        label: "OPC UA endpoint",
        value: "opc.tcp://localhost:4840",
        type: "text",
      },
      {
        id: "mqtt_broker",
        label: "MQTT брокер",
        value: "localhost:1883",
        type: "text",
      },
    ],
  },
  {
    title: "Система мониторинга",
    icon: "Monitor",
    settings: [
      {
        id: "scan_rate",
        label: "Частота опроса (мс)",
        value: 1000,
        type: "number",
      },
      {
        id: "log_level",
        label: "Уровень логирования",
        value: "INFO",
        type: "select",
        options: ["DEBUG", "INFO", "WARN", "ERROR"],
      },
      {
        id: "auto_reconnect",
        label: "Автоподключение",
        value: true,
        type: "boolean",
      },
    ],
  },
];

const SystemSettings = () => {
  const [settings, setSettings] = useState(settingsGroups);

  const updateSetting = (
    groupIndex: number,
    settingId: string,
    newValue: any,
  ) => {
    setSettings((prevSettings) =>
      prevSettings.map((group, gIndex) =>
        gIndex === groupIndex
          ? {
              ...group,
              settings: group.settings.map((setting) =>
                setting.id === settingId
                  ? { ...setting, value: newValue }
                  : setting,
              ),
            }
          : group,
      ),
    );
  };

  const renderSettingInput = (setting: Setting, groupIndex: number) => {
    switch (setting.type) {
      case "boolean":
        return (
          <button
            onClick={() =>
              updateSetting(groupIndex, setting.id, !setting.value)
            }
            className={`w-12 h-6 rounded-full transition-colors ${
              setting.value ? "bg-primary" : "bg-secondary"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full transition-transform ${
                setting.value ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        );
      case "select":
        return (
          <select
            value={setting.value as string}
            onChange={(e) =>
              updateSetting(groupIndex, setting.id, e.target.value)
            }
            className="tech-input w-32"
          >
            {setting.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case "number":
        return (
          <input
            type="number"
            value={setting.value}
            onChange={(e) =>
              updateSetting(groupIndex, setting.id, Number(e.target.value))
            }
            className="tech-input w-32 font-mono"
          />
        );
      default:
        return (
          <input
            type="text"
            value={setting.value as string}
            onChange={(e) =>
              updateSetting(groupIndex, setting.id, e.target.value)
            }
            className="tech-input w-64 font-mono"
          />
        );
    }
  };

  return (
    <div className="scada-panel">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">
          Настройки системы
        </h3>
        <Button className="tech-button">
          <Icon name="Save" size={16} className="mr-2" />
          Сохранить
        </Button>
      </div>

      <div className="space-y-6">
        {settings.map((group, groupIndex) => (
          <div
            key={group.title}
            className="bg-secondary/30 rounded-lg p-4 border border-border"
          >
            <div className="flex items-center gap-2 mb-4">
              <Icon name={group.icon} size={20} className="text-primary" />
              <h4 className="font-medium text-foreground">{group.title}</h4>
            </div>

            <div className="space-y-3">
              {group.settings.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between py-2"
                >
                  <label className="text-sm text-foreground">
                    {setting.label}
                  </label>
                  {renderSettingInput(setting, groupIndex)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemSettings;
