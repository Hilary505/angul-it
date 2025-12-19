export interface CaptchaStage {
  id: number;
  type: 'image-select' | 'puzzle' | 'text-verify';
  title: string;
  instruction: string;
  data: any;
  completed: boolean;
  userAnswer?: any;
  correctAnswer: any;
}

export interface CaptchaProgress {
  currentStage: number;
  stages: CaptchaStage[];
  startTime: Date;
  completedAt?: Date;
}