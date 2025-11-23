
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-6 font-mono">
          <div className="w-16 h-16 rounded-full bg-red-900/20 border border-red-500 flex items-center justify-center mb-6 animate-pulse">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          
          <h1 className="text-4xl text-white font-display mb-4 tracking-widest">SYSTEM FAILURE</h1>
          <p className="text-neutral-500 max-w-md mb-8 text-sm">
            A critical rendering error has occurred within the digital construct.
          </p>
          
          <div className="p-4 bg-neutral-900 border border-neutral-800 rounded text-xs text-red-400 mb-8 max-w-lg overflow-auto">
            {this.state.error?.toString()}
          </div>

          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-amber-500 transition-colors"
          >
            <RefreshCcw className="w-4 h-4" />
            Reboot System
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
