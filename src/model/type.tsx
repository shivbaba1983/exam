export type Option = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  type: 'single' | 'multiple' | 'boolean' | 'sequence';
  question: string;
  options?: Option[];
  correctAnswer: string | string[];
  explanation: string;
};
