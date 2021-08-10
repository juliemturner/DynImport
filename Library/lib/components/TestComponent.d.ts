import * as React from "react";
export interface ITestComponentProps {
    testProperty: string;
}
export interface ITestComponentState {
}
export declare class TestComponentState implements ITestComponentState {
    constructor();
}
export default class TestComponent extends React.Component<ITestComponentProps, ITestComponentState> {
    private LOG_SOURCE;
    constructor(props: ITestComponentProps);
    shouldComponentUpdate(nextProps: Readonly<ITestComponentProps>, nextState: Readonly<ITestComponentState>): boolean;
    render(): React.ReactElement<ITestComponentProps>;
}
