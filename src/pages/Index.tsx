import { CodeDisplay } from '@/components/CodeDisplay';
import { TestingInterface } from '@/components/TestingInterface';
import { TestCoverageSidebar } from '@/components/TestCoverageSidebar';
import { Bot, Github } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center glow-primary">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">Thoughtful Automation</h1>
              <p className="text-xs text-muted-foreground">Package Sorting System</p>
            </div>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Main Area */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Rules Card */}
            <div className="bg-card rounded-xl border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Sorting Rules</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                  <div className="text-success font-bold text-lg mb-2">STANDARD</div>
                  <p className="text-sm text-muted-foreground">
                    Normal packages that are neither bulky nor heavy. Handled automatically.
                  </p>
                </div>
                <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
                  <div className="text-warning font-bold text-lg mb-2">SPECIAL</div>
                  <p className="text-sm text-muted-foreground">
                    Packages that are either bulky OR heavy. Requires special handling.
                  </p>
                </div>
                <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                  <div className="text-destructive font-bold text-lg mb-2">REJECTED</div>
                  <p className="text-sm text-muted-foreground">
                    Packages that are BOTH bulky AND heavy. Cannot be processed.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Bulky:</span>
                  <span className="ml-2 text-foreground">Volume ≥ 1,000,000 cm³ OR any dimension ≥ 150 cm</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Heavy:</span>
                  <span className="ml-2 text-foreground">Mass ≥ 20 kg</span>
                </div>
              </div>
            </div>

            {/* Code Display */}
            <div className="bg-card rounded-xl border border-border p-6 min-h-[400px]">
              <CodeDisplay />
            </div>

            {/* Testing Interface */}
            <div className="bg-card rounded-xl border border-border p-6">
              <TestingInterface />
            </div>
          </div>
        </main>

        {/* Sidebar */}
        <aside className="w-80 flex-shrink-0 hidden lg:block">
          <TestCoverageSidebar />
        </aside>
      </div>
    </div>
  );
};

export default Index;
