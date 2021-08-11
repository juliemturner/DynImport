import * as React from "react";
import { Logger, LogLevel } from "@pnp/logging";
import isEqual from "lodash/isEqual";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";

export interface ITestContProps {
  context: ApplicationCustomizerContext;
  closeTest: () => void;
}

export interface ITestContState {
  show: boolean;
}

export class TestContState implements ITestContState {
  constructor(
    public show: boolean = false
  ) { }
}

export interface IAppScript {
  id: string;
  src: string;
  state: string;
  priority: number;
  async?: boolean;
  defer?: boolean;
  integrity?: string;
  crossOrigin?: string;
  scriptText?: string;
}

export default class TestCont extends React.Component<ITestContProps, ITestContState> {
  private LOG_SOURCE: string = "🔶TestCont";
  private _divElement: React.RefObject<HTMLDivElement>;

  private _scripts: IAppScript[] = [
    { id: 'react', src: undefined, state: "", priority: 0, async: false, defer: false },
    { id: 'react-dom', src: undefined, state: "", priority: 1, async: false, defer: false },
    { id: 'ReactFormLibrary', src: "https://jmtstorage.blob.core.windows.net/jt-cdn/dynamicImport/testLibrary", state: "", priority: 2, async: false, defer: false },
  ];

  constructor(props: ITestContProps) {
    super(props);
    this._divElement = React.createRef();
    this.state = new TestContState();
  }

  public async componentDidMount() {
    // @ts-ignore: Unreachable code error
    //const app = await import(/* webpackIgnore: true */ 'https://jmtstorage.blob.core.windows.net/jt-cdn/dynamicImport/testLibrary.js');

    const app = await this.loadTestRequire();
    const launcher = new app.Launcher({ domElement: this._divElement.current, libraryProperties: "Binding Library" });
  }

  private loadTestRequire(): Promise<any> {
    return new Promise((resolve) => {
      let config = {};
      let modules = [];
      this._scripts.forEach((s) => {
        modules.push(s.id);
        if (s.src != undefined) {
          config[s.id] = s.src;
        }
      });

      (window as any).require.config({
        paths: config
      });

      (window as any).define('react', () => { return (window as any).React; });
      (window as any).define('react-dom', () => { return (window as any).ReactDOM; });
      (window as any).requirejs(modules,
        // tslint:disable-next-line:no-function-expression
        function () {
          const app = arguments[arguments.length - 1];
          resolve(app);
        });
    });
  }

  public shouldComponentUpdate(nextProps: Readonly<ITestContProps>, nextState: Readonly<ITestContState>) {
    if ((isEqual(nextState, this.state) && isEqual(nextProps, this.props)))
      return false;
    return true;
  }

  public render(): React.ReactElement<ITestContProps> {
    try {
      return (
        <div data-component={this.LOG_SOURCE}>
          <div ref={this._divElement}></div>
        </div>
      );
    } catch (err) {
      Logger.write(`${this.LOG_SOURCE} (render) - ${err}`, LogLevel.Error);
      return null;
    }
  }
}