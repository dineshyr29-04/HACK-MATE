import { useState, useEffect } from 'react';
import { HeroWave } from "@/components/ui/ai-input-hero";
import { ProjectSetup } from "./components/ProjectSetup";
import { StageSelection } from "./components/StageSelection";
import { StageDetail } from "./components/StageDetail";
import { AntigravityGuide } from "./components/AntigravityGuide";
import { store } from "./lib/store";

type AppStage = 'landing' | 'setup' | 'selection' | 'detail' | 'guide' | 'how-it-works' | 'features' | 'faq' | 'resources' | 'case-studies';

import { HowItWorks } from "./components/HowItWorks";
import { Features } from "./components/Features";
import { FAQ } from "./components/FAQ";
import { Resources } from "./components/Resources";
import { CaseStudies } from "./components/CaseStudies";

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
            timeLeft: project.timeLeft,
            type: project.type || 'Online Hackathon',
            prizeCategory: project.prizeCategory || 'AI/ML Track',
            judgingFocus: project.judgingFocus || ['Innovation', 'Technical Complexity'],
            teamSize: project.teamSize || '2-3 people',
            isTeam: project.isTeam ?? true
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
    timeLeft: '48',
    type: 'Online Hackathon',
    prizeCategory: 'AI/ML Track',
    judgingFocus: ['Innovation', 'Technical Complexity'],
    teamSize: '2-3 people',
    isTeam: true
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
      timeLeft: project.timeLeft,
      type: project.type || 'Online Hackathon',
      prizeCategory: project.prizeCategory || 'AI/ML Track',
      judgingFocus: project.judgingFocus || ['Innovation', 'Technical Complexity'],
      teamSize: project.teamSize || '2-3 people',
      isTeam: project.isTeam ?? true
    });
    setStage('selection');
  };

  const handleSetupComplete = (data: {
    name: string;
    problem: string;
    timeLeft: string;
    type: string;
    prizeCategory: string;
    judgingFocus: string[];
    teamSize: string;
    isTeam: boolean;
  }) => {
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
          onOpenGuide={() => setStage('guide')}
          onOpenFeatures={() => setStage('features')}
          onOpenHowItWorks={() => setStage('how-it-works')}
          onOpenFAQ={() => setStage('faq')}
          onOpenResources={() => setStage('resources')}
          onOpenCaseStudies={() => setStage('case-studies')}
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
          onOpenResources={() => setStage('resources')}
          projectId={projectId || ''}
        />
      )}

      {stage === 'detail' && selectedStageId && (
        <StageDetail
          stageId={selectedStageId}
          onBack={() => setStage('selection')}
          onOpenResources={() => setStage('resources')}
          project={store.getProjects().find(p => p.id === projectId) || {
            id: projectId || 'temp',
            ...projectData,
            createdAt: Date.now(),
            lastModified: Date.now()
          }}
        />
      )}

      {stage === 'guide' && (
        <AntigravityGuide
          onBack={() => setStage('landing')}
        />
      )}

      {stage === 'how-it-works' && (
        <HowItWorks
          onBack={() => setStage('landing')}
        />
      )}

      {stage === 'features' && (
        <Features
          onBack={() => setStage('landing')}
        />
      )}

      {stage === 'faq' && (
        <FAQ
          onBack={() => setStage('landing')}
        />
      )}

      {stage === 'resources' && (
        <Resources
          onBack={() => setStage('landing')}
        />
      )}

      {stage === 'case-studies' && (
        <CaseStudies
          onBack={() => setStage('landing')}
        />
      )}
    </div>
  );
}

export default App;
