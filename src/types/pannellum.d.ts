type PannellumViewer = {
  destroy(): void;
  mouseEventToCoords(event: MouseEvent): [number, number];
  on(event: string, callback: (eventOrArg: any) => void): PannellumViewer;
  getYaw(): number;
  getPitch(): number;
  getHfov(): number;
  setYaw(yaw: number, animated?: boolean | number, callback?: Function, callbackArgs?: any): PannellumViewer;
  setPitch(pitch: number, animated?: boolean | number, callback?: Function, callbackArgs?: any): PannellumViewer;
  setHfov(hfov: number, animated?: boolean | number, callback?: Function, callbackArgs?: any): PannellumViewer;
  getScene(): string;
  loadScene(sceneId: string, pitch?: number, yaw?: number, hfov?: number): void;
  getPanorama(): string;
  getConfig(): any;
};

type Window = {
  pannellum: {
    viewer(container: HTMLElement | string, config: any): PannellumViewer;
  };
};