import { useState, useEffect } from 'react';
import { HeroWave } from "@/components/ui/ai-input-hero";
import { ProjectSetup } from "./components/ProjectSetup";
import { StageSelection } from "./components/StageSelection";
import { StageDetail } from "./components/StageDetail";
import { AntigravityGuide } from "./components/AntigravityGuide";
import { store } from "./lib/store";

type AppStage = 'landing' | 'auth-required' | 'setup' | 'selection' | 'detail' | 'guide' | 'how-it-works' | 'features' | 'faq' | 'resources' | 'case-studies';

import { HowItWorks } from "./components/HowItWorks";
import { Features } from "./components/Features";
import { FAQ } from "./components/FAQ";
import { Resources } from "./components/Resources";
import { CaseStudies } from "./components/CaseStudies";
import { AuthStage } from "./components/AuthStage";
import { Footer } from "./components/Footer";

import { 
  auth, 
  onAuthStateChanged, 
  User, 
  signInWithPopup, 
  googleProvider, 
  signOut 
} from './lib/firebase';

function App() {
  const [stage, setStage] = useState<AppStage>('landing');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };



  const handleLogout = async () => {
    await signOut(auth);
  };

  // Handle Shared Link Import
  useEffect(() => {
    const handleImport = async () => {
      const params = new URLSearchParams(window.location.search);
      const shareCode = params.get('share');
      if (shareCode) {
        const importedId = await store.importProject(shareCode);
        if (importedId) {
          const projects = await store.getProjects();
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
    };
    handleImport();
  }, []);

  // Project Data
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projectData, setProjectData] = useState({
    name: '',
    problem: '',
    timeLeft: '24',
    type: 'Online Hackathon',
    prizeCategory: 'AI/ML Track',
    judgingFocus: ['Innovation', 'Technical Complexity'],
    teamSize: '2-3 people',
    isTeam: true
  });

  const [selectedStageId, setSelectedStageId] = useState<string | null>(null);

  const [pendingAction, setPendingAction] = useState<{ stage: AppStage; data?: any } | null>(null);

  // Handlers
  const handlePromptSubmit = (value: string) => {
    if (!user) {
      setPendingAction({ stage: 'setup', data: value });
      setStage('auth-required');
      return;
    }
    setProjectData(prev => ({ ...prev, problem: value }));
    setStage('setup');
  };

  const handleResumeProject = (project: any) => {
    if (!user) {
      setPendingAction({ stage: 'selection', data: project });
      setStage('auth-required');
      return;
    }
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

  const handleSetupComplete = async (data: {
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
    await store.saveProject({
      id: newId,
      ...data,
      createdAt: Date.now(),
      lastModified: Date.now()
    });
    setProjectId(newId);
    setProjectData(data);
    setStage('selection');
  };

  useEffect(() => {
    if (user && pendingAction) {
       const action = pendingAction;
       setPendingAction(null);
       if (action.stage === 'setup') {
          handlePromptSubmit(action.data);
       } else if (action.stage === 'selection') {
          handleResumeProject(action.data);
       } else {
          setStage(action.stage);
       }
    }
  }, [user, pendingAction]);

  const handleSelectStage = (id: string) => {
    setSelectedStageId(id);
    setStage('detail');
  };

  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-50 min-h-screen">
      {stage === 'landing' && (
        <>
          <HeroWave
            onPromptSubmit={handlePromptSubmit}
            onResumeProject={handleResumeProject}
            onOpenGuide={() => {
              if (!user) { setPendingAction({ stage: 'guide' }); setStage('auth-required'); return; }
              setStage('guide');
            }}
            onOpenFeatures={() => {
              if (!user) { setPendingAction({ stage: 'features' }); setStage('auth-required'); return; }
              setStage('features');
            }}
            onOpenHowItWorks={() => {
              if (!user) { setPendingAction({ stage: 'how-it-works' }); setStage('auth-required'); return; }
              setStage('how-it-works');
            }}
            onOpenFAQ={() => {
              if (!user) { setPendingAction({ stage: 'faq' }); setStage('auth-required'); return; }
              setStage('faq');
            }}
            onOpenResources={() => {
              if (!user) { setPendingAction({ stage: 'resources' }); setStage('auth-required'); return; }
              setStage('resources');
            }}
            onOpenCaseStudies={() => {
              if (!user) { setPendingAction({ stage: 'case-studies' }); setStage('auth-required'); return; }
              setStage('case-studies');
            }}
            user={user}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
          <Footer />
        </>
      )}

      {stage === 'auth-required' && (
        <AuthStage
          onLogin={handleLogin}
          onBack={() => {
            setPendingAction(null);
            setStage('landing');
          }}
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
          project={{
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
