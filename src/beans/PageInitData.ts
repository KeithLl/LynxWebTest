import type { InitData } from "@lynx-js/react";

export class PageInitData implements InitData {

  constructor(
    public pageName: string,
    public url: string,
    public params: string,
    public commonParams: string,
    public method: string
  ) {
  }
}
