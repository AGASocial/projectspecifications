import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProjectsOverview } from '@/pages/ProjectsOverview';
import { CreateProject } from '@/pages/CreateProject';
import { ProjectDetails } from '@/pages/ProjectDetails';

function App() {
  return (
    <div className="min-h-screen w-full bg-background">
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Routes>
            <Route path="/" element={<ProjectsOverview />} />
            <Route path="/create" element={<CreateProject />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;