export interface FeatureItem {
  glyph: string;
  title: string;
  body: string;
  span?: string;
}

export interface StepItem {
  title: string;
  body: string;
}

export interface DemoFrame {
  fen: string;
  san: string;
  from: string;
  to: string;
}
