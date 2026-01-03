import { useState } from 'react';
import { sort, Stack } from '@/lib/sort';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Package, ArrowRight, RotateCcw } from 'lucide-react';

interface ManualTestResult {
  width: number;
  height: number;
  length: number;
  mass: number;
  result: Stack;
}

export function TestingInterface() {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [length, setLength] = useState('');
  const [mass, setMass] = useState('');
  const [result, setResult] = useState<ManualTestResult | null>(null);

  const handleTest = () => {
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    const l = parseFloat(length) || 0;
    const m = parseFloat(mass) || 0;

    const stackResult = sort(w, h, l, m);
    setResult({ width: w, height: h, length: l, mass: m, result: stackResult });
  };

  const handleReset = () => {
    setWidth('');
    setHeight('');
    setLength('');
    setMass('');
    setResult(null);
  };

  const getResultColor = (stack: Stack) => {
    switch (stack) {
      case 'STANDARD':
        return 'text-success glow-success';
      case 'SPECIAL':
        return 'text-warning glow-warning';
      case 'REJECTED':
        return 'text-destructive glow-destructive';
    }
  };

  const getResultBg = (stack: Stack) => {
    switch (stack) {
      case 'STANDARD':
        return 'bg-success/10 border-success/30';
      case 'SPECIAL':
        return 'bg-warning/10 border-warning/30';
      case 'REJECTED':
        return 'bg-destructive/10 border-destructive/30';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <Package className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Test Package</h2>
          <p className="text-sm text-muted-foreground">Enter dimensions and mass to classify</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="width" className="text-muted-foreground text-sm">
            Width (cm)
          </Label>
          <Input
            id="width"
            type="number"
            placeholder="0"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="height" className="text-muted-foreground text-sm">
            Height (cm)
          </Label>
          <Input
            id="height"
            type="number"
            placeholder="0"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="length" className="text-muted-foreground text-sm">
            Length (cm)
          </Label>
          <Input
            id="length"
            type="number"
            placeholder="0"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="mass" className="text-muted-foreground text-sm">
            Mass (kg)
          </Label>
          <Input
            id="mass"
            type="number"
            placeholder="0"
            value={mass}
            onChange={(e) => setMass(e.target.value)}
            className="bg-muted/50 border-border focus:border-primary focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleTest}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
        >
          <ArrowRight className="w-4 h-4 mr-2" />
          Dispatch Package
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {result && (
        <div
          className={`p-6 rounded-lg border-2 transition-all animate-slide-in ${getResultBg(result.result)}`}
        >
          <div className="text-sm text-muted-foreground mb-2">Dispatch Result</div>
          <div className={`text-3xl font-bold font-mono ${getResultColor(result.result)}`}>
            {result.result}
          </div>
          <div className="mt-4 text-sm text-muted-foreground space-y-1">
            <div>
              Volume: <span className="text-foreground font-mono">{(result.width * result.height * result.length).toLocaleString()} cm³</span>
              {result.width * result.height * result.length >= 1_000_000 && (
                <span className="ml-2 text-warning">(Bulky)</span>
              )}
            </div>
            <div>
              Max Dimension: <span className="text-foreground font-mono">{Math.max(result.width, result.height, result.length)} cm</span>
              {Math.max(result.width, result.height, result.length) >= 150 && (
                <span className="ml-2 text-warning">(Bulky)</span>
              )}
            </div>
            <div>
              Mass: <span className="text-foreground font-mono">{result.mass} kg</span>
              {result.mass >= 20 && (
                <span className="ml-2 text-warning">(Heavy)</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
