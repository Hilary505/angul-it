export interface CaptchaResult {
  totalStages: number;
  completedStages: number;
  correctAnswers: number;
  totalTime: number;
  accuracy: number;
  passed: boolean;
}