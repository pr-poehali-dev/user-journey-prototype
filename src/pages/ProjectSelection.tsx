import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  status: "active" | "inactive";
  connectionsCount: number;
}

const projects: Project[] = [
  {
    id: "1",
    name: "Нефтеперерабатывающий завод",
    description: "Система мониторинга технологических процессов НПЗ",
    lastModified: "2024-01-15 14:30",
    status: "active",
    connectionsCount: 12,
  },
  {
    id: "2",
    name: "Энергетический комплекс",
    description: "Управление распределительными сетями и генерацией",
    lastModified: "2024-01-14 09:15",
    status: "active",
    connectionsCount: 8,
  },
  {
    id: "3",
    name: "Водоочистная станция",
    description: "Контроль качества воды и технологических параметров",
    lastModified: "2024-01-10 16:45",
    status: "inactive",
    connectionsCount: 5,
  },
];

const ProjectSelection = () => {
  const [selectedProject, setSelectedProject] = useState<string>("");
  const navigate = useNavigate();

  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId);
    // Небольшая задержка для визуального эффекта
    setTimeout(() => {
      navigate("/editor");
    }, 300);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="scada-panel mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Cpu" size={32} className="text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Выбор проекта SCADA
                </h1>
                <p className="text-sm text-muted-foreground">
                  Выберите проект для работы
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={handleLogout}
              className="tech-button"
            >
              <Icon name="LogOut" size={16} className="mr-2" />
              Выход
            </Button>
          </div>
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectSelect(project.id)}
              className={`scada-panel cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-primary/10 ${
                selectedProject === project.id
                  ? "ring-2 ring-primary shadow-lg shadow-primary/20"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Icon name="FolderOpen" size={24} className="text-primary" />
                  <div
                    className={`status-indicator status-${project.status === "active" ? "online" : "offline"}`}
                  ></div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Cable" size={14} />
                  <span>{project.connectionsCount}</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {project.name}
              </h3>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Изменен: {project.lastModified}</span>
                <span className="capitalize">
                  {project.status === "active" ? "Активен" : "Неактивен"}
                </span>
              </div>

              {selectedProject === project.id && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center justify-center gap-2 text-sm text-primary">
                    <Icon name="Loader2" size={16} className="animate-spin" />
                    <span>Загрузка проекта...</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" className="tech-button">
            <Icon name="Plus" size={16} className="mr-2" />
            Создать проект
          </Button>

          <Button variant="outline" className="tech-button">
            <Icon name="Upload" size={16} className="mr-2" />
            Импортировать
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectSelection;
