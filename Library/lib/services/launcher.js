import React from "react";
import ReactDOM from "react-dom";
import TestComponent from "../components/TestComponent";
export class Launcher {
    constructor(props) {
        this._props = props;
        var container = document.createElement("DIV");
        this._props.domElement.appendChild(container);
        const testComponentProps = {
            testProperty: this._props.libraryProperties
        };
        const element = React.createElement(TestComponent, testComponentProps, null);
        //render
        ReactDOM.render(element, container);
    }
}
