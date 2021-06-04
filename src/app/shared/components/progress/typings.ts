export type ProgressGapPositionType = 'top' | 'bottom' | 'left' | 'right';

export type ProgressStatusType = 'success' | 'exception' | 'active' | 'normal';

export type ProgressTypeType = 'line' | 'circle' | 'dashboard';

export type ProgressStrokeLinecapType = 'round' | 'square';

export interface ProgressGradientProgress {
  [percent: string]: string;
}

export interface ProgressGradientFromTo {
  from: string;
  to: string;
}

export type ProgressColorGradient = { direction?: string } & (ProgressGradientProgress | ProgressGradientFromTo);

export type ProgressStrokeColorType = string | ProgressColorGradient;

export type ProgressFormatter = (percent: number) => string;

export interface ProgressCirclePath {
  stroke: string | null;
  strokePathStyle: {[key: string]: any};
}

export interface ProgressStepItem {
  backgroundColor: string;
  width: string;
  height: string;
}
