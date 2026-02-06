import { useState, useEffect } from 'react';
import { HeroWave } from "@/components/ui/ai-input-hero";
import { ProjectSetup } from "./components/ProjectSetup";
import { StageSelection } from "./components/StageSelection";
import { StageDetail } from "./components/StageDetail";
import { store } from "./lib/store";

type AppStage = 'landing' | 'setup' | 'selection' | 'detail';

function App() {
  const [stage, setStage] = useState<AppStage>('landing');

  // Handle Shared Link Import
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shareCode = params.get('share');
    if (shareCode) {
      const importedId = store.importProject(shareCode);
      if (importedId) {
        const projects = store.getProjects();
        const project = projects.find(p => p.id === importedId);
        if (project) {
          setProjectId(importedId);
          setProjectData({
            name: project.name,
            problem: project.problem,
            timeLeft: project.timeLeft
          });
          setStage('selection');
          // Cleanup URL
          window.history.replaceState({}, '', window.location.pathname);
        }
      }
    }
  }, []);

  // Project Data
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projectData, setProjectData] = useState({
    name: '',
    problem: '',
    timeLeft: '24'
  });

  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);

  // Handlers
  const handlePromptSubmit = (value: string) => {
    setProjectData(prev => ({ ...prev, problem: value }));
    setStage('setup');
  };

  const handleResumeProject = (project: any) => {
    setProjectId(project.id);
    setProjectData({
      name: project.name,
      problem: project.problem,
      timeLeft: project.timeLeft
    });
    setStage('selection');
  };

  const handleSetupComplete = (data: { name: string; problem: string; timeLeft: string }) => {
    const newId = crypto.randomUUID();
    store.saveProject({
      id: newId,
      ...data,
      createdAt: Date.now(),
      lastModified: Date.now()
    });
    setProjectId(newId);
    setProjectData(data);
    setStage('selection');
  };

  const handleSelectStage = (id: string) => {
    setSelectedStageId(id);
    setStage('detail');
  };

  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-50 min-h-screen">
      {stage === 'landing' && (
        <HeroWave
          onPromptSubmit={handlePromptSubmit}
          onResumeProject={handleResumeProject}
        />
      )}

      {stage === 'setup' && (
        <ProjectSetup
          initialProblem={projectData.problem}
          onComplete={handleSetupComplete}
          onBack={() => setStage('landing')}
        />
      )}

      {stage === 'selection' && (
        <StageSelection
          projectName={projectData.name || "Your Project"}
          onSelectStage={handleSelectStage}
          onHome={() => setStage('landing')}
          projectId={projectId || ''}
        />
      )}

      {stage === 'detail' && selectedStageId && (
        <StageDetail
          stageId={selectedStageId}
          onBack={() => setStage('selection')}
          problemStatement={projectData.problem}
          projectId={projectId || 'temp'}
        />
      )}
    </div>
  );
}

export default App;
