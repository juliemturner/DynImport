import React from "react";
import ReactDOM from "react-dom";

import TestComponent, { ITestComponentProps } from "../components/TestComponent";

export interface ILauncherProps {
  domElement: HTMLDivElement; //dom element to bind nav
  libraryProperties: string; //Example property needed by library
}

export interface ILauncher { }

export class Launcher implements ILauncher {
  private _props: ILauncherProps;

  constructor(props: ILauncherProps) {
    this._props = props;
    var container = document.createElement("DIV");
    this._props.domElement.appendChild(container);

    const testComponentProps: ITestComponentProps = {
      testProperty: this._props.libraryProperties
    }
    const element = React.createElement(TestComponent, testComponentProps, null);

    //render
    ReactDOM.render(element, container);
  }

}
