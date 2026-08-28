import { Component, type ReactNode } from 'react';

interface SceneErrorBoundaryProps {
  readonly children: ReactNode;
  readonly onError: () => void;
}

interface SceneErrorBoundaryState {
  readonly hasError: boolean;
}

export class SceneErrorBoundary extends Component<
  SceneErrorBoundaryProps,
  SceneErrorBoundaryState
> {
  public state: SceneErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(): void {
    this.props.onError();
  }

  public render(): ReactNode {
    return this.state.hasError ? null : this.props.children;
  }
}
