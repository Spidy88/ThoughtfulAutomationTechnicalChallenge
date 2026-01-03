import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Clock, FlaskConical, ChevronDown, ChevronRight } from 'lucide-react';
import { sort } from '@/lib/sort';

interface TestCase {
  name: string;
  args: [number, number, number, number];
  expected: string;
}

interface TestSuite {
  name: string;
  tests: TestCase[];
}

const testSuites: TestSuite[] = [
  {
    name: 'STANDARD packages',
    tests: [
      { name: 'Small, light package', args: [10, 10, 10, 5], expected: 'STANDARD' },
      { name: 'Just under volume threshold', args: [99, 100, 100, 10], expected: 'STANDARD' },
      { name: 'Just under heavy threshold', args: [50, 50, 50, 19.9], expected: 'STANDARD' },
      { name: 'Max non-bulky, non-heavy', args: [149, 149, 44, 19], expected: 'STANDARD' },
    ],
  },
  {
    name: 'SPECIAL - Bulky only',
    tests: [
      { name: 'Volume exactly 1,000,000', args: [100, 100, 100, 10], expected: 'SPECIAL' },
      { name: 'Volume over 1,000,000', args: [200, 200, 200, 5], expected: 'SPECIAL' },
      { name: 'Width >= 150', args: [150, 10, 10, 5], expected: 'SPECIAL' },
      { name: 'Height >= 150', args: [10, 150, 10, 5], expected: 'SPECIAL' },
      { name: 'Length >= 150', args: [10, 10, 150, 5], expected: 'SPECIAL' },
    ],
  },
  {
    name: 'SPECIAL - Heavy only',
    tests: [
      { name: 'Mass exactly 20kg', args: [10, 10, 10, 20], expected: 'SPECIAL' },
      { name: 'Mass over 20kg', args: [10, 10, 10, 50], expected: 'SPECIAL' },
    ],
  },
  {
    name: 'REJECTED packages',
    tests: [
      { name: 'Large and heavy', args: [200, 200, 200, 30], expected: 'REJECTED' },
      { name: 'Dimension >= 150 and heavy', args: [150, 10, 10, 20], expected: 'REJECTED' },
      { name: 'At exact thresholds', args: [100, 100, 100, 20], expected: 'REJECTED' },
    ],
  },
  {
    name: 'Edge cases',
    tests: [
      { name: 'Zero dimensions', args: [0, 0, 0, 0], expected: 'STANDARD' },
      { name: 'Decimal values', args: [99.5, 100.5, 100, 19.5], expected: 'STANDARD' },
    ],
  },
];

export function TestCoverageSidebar() {
  const [results, setResults] = useState<Map<string, boolean>>(new Map());
  const [running, setRunning] = useState(false);
  const [expandedSuites, setExpandedSuites] = useState<Set<string>>(new Set(testSuites.map(s => s.name)));

  const runTests = async () => {
    setRunning(true);
    setResults(new Map());

    for (const suite of testSuites) {
      for (const test of suite.tests) {
        await new Promise((resolve) => setTimeout(resolve, 50)); // Simulate async
        const result = sort(...test.args);
        const passed = result === test.expected;
        setResults((prev) => new Map(prev).set(`${suite.name}-${test.name}`, passed));
      }
    }

    setRunning(false);
  };

  useEffect(() => {
    runTests();
  }, []);

  const totalTests = testSuites.reduce((acc, suite) => acc + suite.tests.length, 0);
  const passedTests = Array.from(results.values()).filter(Boolean).length;
  const failedTests = Array.from(results.values()).filter((v) => v === false).length;
  const pendingTests = totalTests - results.size;

  const toggleSuite = (suiteName: string) => {
    setExpandedSuites((prev) => {
      const next = new Set(prev);
      if (next.has(suiteName)) {
        next.delete(suiteName);
      } else {
        next.add(suiteName);
      }
      return next;
    });
  };

  const coveragePercent = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0;

  return (
    <div className="h-full flex flex-col bg-sidebar border-l border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <FlaskConical className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-sidebar-foreground">Test Coverage</h2>
            <p className="text-xs text-muted-foreground">Vitest test results</p>
          </div>
        </div>

        {/* Coverage Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Coverage</span>
            <span className={coveragePercent === 100 ? 'text-success' : 'text-warning'}>
              {coveragePercent}%
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                coveragePercent === 100 ? 'bg-success' : 'bg-warning'
              }`}
              style={{ width: `${coveragePercent}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-success/10 rounded-lg p-2">
            <div className="text-xl font-bold text-success">{passedTests}</div>
            <div className="text-xs text-muted-foreground">Passed</div>
          </div>
          <div className="bg-destructive/10 rounded-lg p-2">
            <div className="text-xl font-bold text-destructive">{failedTests}</div>
            <div className="text-xs text-muted-foreground">Failed</div>
          </div>
          <div className="bg-muted rounded-lg p-2">
            <div className="text-xl font-bold text-muted-foreground">{pendingTests}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
        </div>
      </div>

      {/* Test List */}
      <div className="flex-1 overflow-auto p-2">
        {testSuites.map((suite) => (
          <div key={suite.name} className="mb-2">
            <button
              onClick={() => toggleSuite(suite.name)}
              className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-sidebar-accent text-left transition-colors"
            >
              {expandedSuites.has(suite.name) ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
              <span className="text-sm font-medium text-sidebar-foreground flex-1">
                {suite.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {suite.tests.filter((t) => results.get(`${suite.name}-${t.name}`)).length}/
                {suite.tests.length}
              </span>
            </button>

            {expandedSuites.has(suite.name) && (
              <div className="ml-4 space-y-1 mt-1">
                {suite.tests.map((test) => {
                  const key = `${suite.name}-${test.name}`;
                  const passed = results.get(key);
                  const isPending = passed === undefined;

                  return (
                    <div
                      key={key}
                      className={`flex items-center gap-2 p-2 rounded text-sm transition-all ${
                        isPending
                          ? 'text-muted-foreground'
                          : passed
                          ? 'text-success/80'
                          : 'text-destructive/80 bg-destructive/5'
                      }`}
                    >
                      {isPending ? (
                        <Clock className="w-3.5 h-3.5 animate-pulse" />
                      ) : passed ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5" />
                      )}
                      <span className="truncate flex-1">{test.name}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Run Tests Button */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={runTests}
          disabled={running}
          className="w-full py-2 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {running ? 'Running Tests...' : 'Re-run Tests'}
        </button>
      </div>
    </div>
  );
}
