import { useState } from "react";
import SCADANavigation from "@/components/SCADANavigation";
import SystemStatus from "@/components/SystemStatus";
import DataVariables from "@/components/DataVariables";
import SystemSettings from "@/components/SystemSettings";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [activeSection, setActiveSection] = useState("connections");

  const renderContent = () => {
    switch (activeSection) {
      case "connections":
        return <SystemStatus />;
      case "variables":
        return <DataVariables />;
      case "settings":
        return <SystemSettings />;
      default:
        return (
          <div className="scada-panel text-center py-12">
            <Icon
              name="Construction"
              size={48}
              className="mx-auto mb-4 text-muted-foreground"
            />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Раздел в разработке
            </h3>
            <p className="text-muted-foreground">
              Модуль "{activeSection}" находится в стадии разработки
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="scada-panel mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Cpu" size={32} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  SCADA Система
                </h1>
                <p className="text-sm text-muted-foreground">
                  Управление промышленными протоколами
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="status-indicator status-online"></div>
                <span className="text-sm font-mono text-foreground">
                  {new Date().toLocaleString("ru-RU")}
                </span>
              </div>

              <button className="tech-button">
                <Icon name="Bell" size={16} />
              </button>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <SCADANavigation
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Main Content */}
        <main>{renderContent()}</main>
      </div>
    </div>
  );
};

export default Index;
