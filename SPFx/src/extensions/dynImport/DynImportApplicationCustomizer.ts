import * as React from 'react';
import * as ReactDom from 'react-dom';
import { override } from '@microsoft/decorators';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import Banner from './component/Banner';

import * as strings from 'DynImportApplicationCustomizerStrings';

const LOG_SOURCE: string = 'DynImportApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IDynImportApplicationCustomizerProperties {
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class DynImportApplicationCustomizer
  extends BaseApplicationCustomizer<IDynImportApplicationCustomizerProperties> {

  private LOG_SOURCE: string = 'DynImportApplicationCustomizer';
  private _topPlaceholder: PlaceholderContent | undefined;
  private _elementId: string = "DynImport";

  @override
  public async onInit(): Promise<void> {
    try {
      //alert("Hello World");
      this.context.application.navigatedEvent.add(this, this.render);
    } catch (err) {
      console.log("Error onInit");
    }
    return;
  }

  @override
  public onDispose(): Promise<void> {
    this.context.application.navigatedEvent.remove(this, this.render);

    if (this._topPlaceholder && this._topPlaceholder.domElement) {
      this._topPlaceholder.domElement.innerHTML = "";
    }

    return Promise.resolve();
  }

  private render = () => {
    try {
      if (!this._topPlaceholder) {
        this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top, { onDispose: this.onDispose });
      }
      //if a placeholder was retrieved, then we can work with that
      if (this._topPlaceholder != undefined) {
        var bannerContainer = document.getElementById(this._elementId);

        //if the bannerContainer was not found, go and create, then append to spfx top placeholder
        if (bannerContainer == undefined) {
          //create nav div
          bannerContainer = document.createElement("DIV");
          bannerContainer.setAttribute("id", this._elementId);

          //bind to top placeholder
          this._topPlaceholder.domElement.appendChild(bannerContainer);
        }

        var elements = [];

        const bannerProps = {
          context: this.context
        };

        let element = React.createElement(Banner, bannerProps);
        elements.push(element);
        ReactDom.render(elements, bannerContainer);
      }
      else {
        console.error(this.LOG_SOURCE + " (render) Top Placeholder not available!");
      }
    }
    catch (err) {
      console.error(this.LOG_SOURCE + " (render): " + err);
    }

    return;
  }
}
