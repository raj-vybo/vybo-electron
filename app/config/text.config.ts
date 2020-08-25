import { Subject } from 'rxjs';

type KeyOfConfig = Exclude<keyof TextConfigProps, 'changes'>;

type TextConfigProps = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  fontSize: number;
  fontFamily: string;
  changes: Subject<{
    change: KeyOfConfig;
    value: string | number;
  }>;
};

let CONFIG: TextConfigProps = {
  bold: false,
  italic: false,
  underline: false,
  fontSize: 25,
  fontFamily: 'Railway',
  changes: new Subject(),
};

type PickOne<T> = {
  [P in keyof T]: Record<P, T[P]> &
    Partial<Record<Exclude<keyof T, P>, undefined>>;
}[keyof T];

const textConfig$ = {
  isBold: () => CONFIG.bold,
  isItalic: () => CONFIG.italic,
  isUnderline: () => CONFIG.underline,
  getFontSize: () => CONFIG.fontSize,
  getFontFamily: () => CONFIG.fontFamily,

  changeConfig: (change: PickOne<TextConfigProps>) => {
    const savedChanges = CONFIG.changes;
    CONFIG = { ...CONFIG, ...change };
    CONFIG.changes = savedChanges;
  },
};

const textConfig = Object.freeze(textConfig$);

export default textConfig;
