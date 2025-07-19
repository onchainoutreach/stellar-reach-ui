
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Landing  from '@/pages/Landing';
import Dashboard from '@/pages/Dashboard';
import AddProject from '@/pages/AddProject';
import ImportLead from '@/pages/ImportLead';
import NotFound from '@/pages/NotFound';
import { AddTeamMember } from '@/components/dashboard/AddTeamMember';
import { EditTeamMember } from '@/components/dashboard/EditTeamMember';
import { PlaybookArticle } from '@/components/dashboard/PlaybookArticle';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/sales-team/add" element={<AddTeamMember />} />
            <Route path="/dashboard/sales-team/edit/:id" element={<EditTeamMember />} />
            <Route path="/dashboard/playbook/:id" element={<PlaybookArticle />} />
            <Route path="/add-project" element={<AddProject />} />
            <Route path="/import-lead" element={<ImportLead />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
