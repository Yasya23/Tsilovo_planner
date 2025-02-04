type BaseButton = 'primary' | 'accent';

type ButtonsStyle =
  | BaseButton
  | `outline-${BaseButton}`
  | `${BaseButton}-hover-gradient`;

export type ButtonsType = 'button' | 'reset' | 'submit';
