import * as React from "react";
import isEqual from "lodash/isEqual";

export interface ITestComponentProps {
  testProperty: string;
}

export interface ITestComponentState {
}

export class TestComponentState implements ITestComponentState {
  constructor() { }
}

export default class TestComponent extends React.Component<ITestComponentProps, ITestComponentState> {
  private LOG_SOURCE: string = "🔶TestComponent";

  constructor(props: ITestComponentProps) {
    super(props);
    this.state = new TestComponentState();
  }

  public shouldComponentUpdate(nextProps: Readonly<ITestComponentProps>, nextState: Readonly<ITestComponentState>) {
    if ((isEqual(nextState, this.state) && isEqual(nextProps, this.props)))
      return false;
    return true;
  }

  public render(): React.ReactElement<ITestComponentProps> {
    try {
      return (
        <div data-component={this.LOG_SOURCE}>
          This is my test property: {this.props.testProperty}
        </div>
      );
    } catch (err) {
      console.log(`${this.LOG_SOURCE} (render) - ${err}`);
      return null;
    }
  }
}