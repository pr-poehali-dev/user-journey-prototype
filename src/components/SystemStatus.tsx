import Icon from "@/components/ui/icon";

interface StatusData {
  label: string;
  value: string;
  status: "online" | "offline" | "warning";
  icon: string;
}

const statusData: StatusData[] = [
  {
    label: "Modbus TCP",
    value: "5 подключений",
    status: "online",
    icon: "Ethernet",
  },
  { label: "OPC UA", value: "2 сервера", status: "online", icon: "Server" },
  { label: "Profinet", value: "Нет связи", status: "offline", icon: "Zap" },
  { label: "MQTT", value: "12 топиков", status: "warning", icon: "Wifi" },
];

const SystemStatus = () => {
  return (
    <div className="scada-panel">
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        Статус протоколов
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statusData.map((item, index) => (
          <div
            key={index}
            className="bg-secondary/50 rounded-lg p-4 border border-border"
          >
            <div className="flex items-center justify-between mb-2">
              <Icon
                name={item.icon}
                size={20}
                className="text-muted-foreground"
              />
              <div className={`status-indicator status-${item.status}`}></div>
            </div>

            <h4 className="font-medium text-foreground mb-1">{item.label}</h4>
            <p className="text-sm text-muted-foreground">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemStatus;
