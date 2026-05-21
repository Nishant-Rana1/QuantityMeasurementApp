import React from "react";
import Button from "./Button.jsx";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-background p-6">
          <div className="glass-card max-w-lg rounded-xl p-8 text-center">
            <h1 className="text-2xl font-black text-primary">Something went wrong</h1>
            <p className="mt-2 text-on-muted">Refresh the app and try again. The backend data remains safe.</p>
            <Button className="mt-6" onClick={() => window.location.reload()}>Reload application</Button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
