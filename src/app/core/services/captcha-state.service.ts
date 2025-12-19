import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CaptchaStage, CaptchaProgress } from '../models/captcha-stage.model';
import { CaptchaResult } from '../models/captcha-result.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CaptchaStateService {
  private progressSubject = new BehaviorSubject<CaptchaProgress | null>(null);
  public progress$ = this.progressSubject.asObservable();

  private readonly stages: CaptchaStage[] = [
    {
      id: 1,
      type: 'image-select',
      title: 'Image Selection',
      instruction: 'Select all images that contain cats',
      data: {
        images: [
          { id: 1, src: 'assets/images/cats/cat1.jpg', hasCat: true },
          { id: 2, src: 'assets/images/dogs/dog1.jpg', hasCat: false },
          { id: 3, src: 'assets/images/cats/cat2.jpg', hasCat: true },
          { id: 4, src: 'assets/images/dogs/dog2.jpg', hasCat: false }
        ]
      },
      completed: false,
      correctAnswer: [1, 3]
    },
    {
      id: 2,
      type: 'puzzle',
      title: 'Math Puzzle',
      instruction: 'Solve: What is 15 + 27?',
      data: { question: '15 + 27 = ?' },
      completed: false,
      correctAnswer: 42
    },
    {
      id: 3,
      type: 'text-verify',
      title: 'Text Verification',
      instruction: 'Enter the text shown in the image',
      data: { text: 'VERIFY123', imageUrl: 'assets/images/captcha-text.png' },
      completed: false,
      correctAnswer: 'VERIFY123'
    }
  ];

  constructor(private storageService: StorageService) {
    this.loadProgress();
  }

  startNewChallenge(): void {
    const progress: CaptchaProgress = {
      currentStage: 0,
      stages: this.stages.map(stage => ({ ...stage, completed: false, userAnswer: undefined })),
      startTime: new Date()
    };
    this.saveProgress(progress);
  }

  getCurrentProgress(): CaptchaProgress | null {
    return this.progressSubject.value;
  }

  getCurrentStage(): CaptchaStage | null {
    const progress = this.getCurrentProgress();
    return progress ? progress.stages[progress.currentStage] : null;
  }

  submitAnswer(answer: any): boolean {
    const progress = this.getCurrentProgress();
    if (!progress) return false;

    const currentStage = progress.stages[progress.currentStage];
    currentStage.userAnswer = answer;
    
    const isCorrect = this.validateAnswer(currentStage, answer);
    currentStage.completed = isCorrect;

    this.saveProgress(progress);
    return isCorrect;
  }

  nextStage(): boolean {
    const progress = this.getCurrentProgress();
    if (!progress) return false;

    if (progress.currentStage < progress.stages.length - 1) {
      progress.currentStage++;
      this.saveProgress(progress);
      return true;
    }
    return false;
  }

  previousStage(): boolean {
    const progress = this.getCurrentProgress();
    if (!progress) return false;

    if (progress.currentStage > 0) {
      progress.currentStage--;
      this.saveProgress(progress);
      return true;
    }
    return false;
  }

  isCompleted(): boolean {
    const progress = this.getCurrentProgress();
    return progress ? progress.stages.every(stage => stage.completed) : false;
  }

  getResults(): CaptchaResult | null {
    const progress = this.getCurrentProgress();
    if (!progress) return null;

    const completedStages = progress.stages.filter(stage => stage.completed).length;
    const correctAnswers = progress.stages.filter(stage => 
      stage.completed && this.validateAnswer(stage, stage.userAnswer)
    ).length;

    const totalTime = progress.completedAt 
      ? new Date(progress.completedAt).getTime() - new Date(progress.startTime).getTime()
      : 0;

    return {
      totalStages: progress.stages.length,
      completedStages,
      correctAnswers,
      totalTime: Math.round(totalTime / 1000),
      accuracy: Math.round((correctAnswers / progress.stages.length) * 100),
      passed: correctAnswers === progress.stages.length
    };
  }

  completeChallenge(): void {
    const progress = this.getCurrentProgress();
    if (progress) {
      progress.completedAt = new Date();
      this.saveProgress(progress);
    }
  }

  resetChallenge(): void {
    this.storageService.clear();
    this.progressSubject.next(null);
  }

  private validateAnswer(stage: CaptchaStage, answer: any): boolean {
    switch (stage.type) {
      case 'image-select':
        return JSON.stringify(answer?.sort()) === JSON.stringify(stage.correctAnswer.sort());
      case 'puzzle':
      case 'text-verify':
        return answer === stage.correctAnswer;
      default:
        return false;
    }
  }

  private saveProgress(progress: CaptchaProgress): void {
    this.storageService.setItem('progress', progress);
    this.progressSubject.next(progress);
  }

  private loadProgress(): void {
    const saved = this.storageService.getItem<CaptchaProgress>('progress');
    if (saved) {
      this.progressSubject.next(saved);
    }
  }
}