import { sortSourceCode } from '@/lib/sort';
import { Code2 } from 'lucide-react';

export function CodeDisplay() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Code2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Sorting Algorithm</h2>
          <p className="text-sm text-muted-foreground">Package dispatch logic implementation</p>
        </div>
      </div>
      
      <div className="code-block rounded-lg p-6 overflow-auto flex-1">
        <pre className="font-mono text-sm leading-relaxed">
          <code>
            {sortSourceCode.split('\n').map((line, index) => (
              <div key={index} className="flex">
                <span className="w-8 text-muted-foreground/50 select-none text-right pr-4">
                  {index + 1}
                </span>
                <span className="flex-1">
                  {highlightSyntax(line)}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

function highlightSyntax(line: string): React.ReactNode {
  // Simple syntax highlighting
  const patterns: [RegExp, string][] = [
    [/(export|type|function|const|if|return)/g, 'text-primary'],
    [/('STANDARD'|'SPECIAL'|'REJECTED')/g, 'text-success'],
    [/(Stack|number|string|boolean)/g, 'text-warning'],
    [/(\d+(?:_\d+)*)/g, 'text-accent'],
    [/(\/\/.*$)/g, 'text-muted-foreground italic'],
    [/(true|false)/g, 'text-accent'],
  ];

  let result = line;
  const segments: { start: number; end: number; className: string }[] = [];

  patterns.forEach(([pattern, className]) => {
    let match;
    const regex = new RegExp(pattern);
    while ((match = regex.exec(line)) !== null) {
      segments.push({
        start: match.index,
        end: match.index + match[0].length,
        className,
      });
    }
  });

  if (segments.length === 0) {
    return <span className="text-foreground">{line}</span>;
  }

  // Sort segments by start position
  segments.sort((a, b) => a.start - b.start);

  const elements: React.ReactNode[] = [];
  let lastEnd = 0;

  segments.forEach((segment, i) => {
    if (segment.start > lastEnd) {
      elements.push(
        <span key={`text-${i}`} className="text-foreground">
          {line.slice(lastEnd, segment.start)}
        </span>
      );
    }
    elements.push(
      <span key={`hl-${i}`} className={segment.className}>
        {line.slice(segment.start, segment.end)}
      </span>
    );
    lastEnd = segment.end;
  });

  if (lastEnd < line.length) {
    elements.push(
      <span key="text-end" className="text-foreground">
        {line.slice(lastEnd)}
      </span>
    );
  }

  return <>{elements}</>;
}
