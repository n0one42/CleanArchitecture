import { Component } from "react";

// Define a type for the component's state
type CounterState = {
  currentCount: number;
};

export class Counter extends Component<Record<string, never>, CounterState> {
  static displayName = "Counter";

  constructor(props: Record<string, never>) {
    super(props);
    this.state = { currentCount: 0 };
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  incrementCounter() {
    this.setState({
      currentCount: this.state.currentCount + 1,
    });
  }

  render() {
    return (
      <div>
        <h1>Counter</h1>

        <p>This is a simple example of a React component.</p>

        <p aria-live="polite">
          Current count: <strong>{this.state.currentCount}</strong>
        </p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>
          Increment
        </button>
      </div>
    );
  }
}
