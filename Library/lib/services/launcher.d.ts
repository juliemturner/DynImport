export interface ILauncherProps {
    domElement: HTMLDivElement;
    libraryProperties: string;
}
export interface ILauncher {
}
export declare class Launcher implements ILauncher {
    private _props;
    constructor(props: ILauncherProps);
}
