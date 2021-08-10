import * as React from "react";
import { Logger, LogLevel } from "@pnp/logging";
import isEqual from "lodash/isEqual";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import TestCont from "./TestCont";

export interface IBannerProps {
  context: ApplicationCustomizerContext;
}

export interface IBannerState {
  showForm: boolean;
}

export class BannerState implements IBannerState {
  constructor(
    public showForm: boolean = false
  ) { }
}

export default class Banner extends React.Component<IBannerProps, IBannerState> {
  private LOG_SOURCE: string = "🔶Banner";

  constructor(props: IBannerProps) {
    super(props);
    this.state = new BannerState();
  }

  public shouldComponentUpdate(nextProps: Readonly<IBannerProps>, nextState: Readonly<IBannerState>) {
    if ((isEqual(nextState, this.state) && isEqual(nextProps, this.props)))
      return false;
    return true;
  }

  private _showButton = async () => {
    this.setState({ showForm: true });
  }

  private _hideForm = () => {
    this.setState({ showForm: false });
  }

  public render(): React.ReactElement<IBannerProps> {
    try {
      return (
        <div data-component={this.LOG_SOURCE}>
          <button onClick={this._showButton}>Show</button>
          {this.state.showForm &&
            <TestCont context={this.props.context} closeTest={this._hideForm} />
          }
        </div>
      );
    } catch (err) {
      Logger.write(`${this.LOG_SOURCE} (render) - ${err}`, LogLevel.Error);
      return null;
    }
  }
}