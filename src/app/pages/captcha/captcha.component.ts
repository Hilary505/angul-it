import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CaptchaStateService } from '../../core/services/captcha-state.service';
import { CaptchaStage } from '../../core/models/captcha-stage.model';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss']
})
export class CaptchaComponent implements OnInit {
  currentStage: CaptchaStage | null = null;
  captchaForm: FormGroup;
  selectedImages: number[] = [];
  errorMessage = '';
  isSubmitting = false;

  constructor(
    private captchaService: CaptchaStateService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.captchaForm = this.fb.group({
      textAnswer: ['', Validators.required],
      mathAnswer: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  ngOnInit(): void {
    const progress = this.captchaService.getCurrentProgress();
    if (!progress) {
      this.router.navigate(['/']);
      return;
    }
    this.loadCurrentStage();
  }

  loadCurrentStage(): void {
    this.currentStage = this.captchaService.getCurrentStage();
    this.errorMessage = '';
    this.selectedImages = [];
    this.captchaForm.reset();
  }

  onImageSelect(imageId: number): void {
    const index = this.selectedImages.indexOf(imageId);
    if (index > -1) {
      this.selectedImages.splice(index, 1);
    } else {
      this.selectedImages.push(imageId);
    }
  }

  isImageSelected(imageId: number): boolean {
    return this.selectedImages.includes(imageId);
  }

  submitAnswer(): void {
    if (this.isSubmitting || !this.currentStage) return;

    this.isSubmitting = true;
    this.errorMessage = '';

    let answer: any;
    
    switch (this.currentStage.type) {
      case 'image-select':
        answer = this.selectedImages;
        if (answer.length === 0) {
          this.errorMessage = 'Please select at least one image';
          this.isSubmitting = false;
          return;
        }
        break;
      case 'puzzle':
        answer = parseInt(this.captchaForm.get('mathAnswer')?.value);
        if (!this.captchaForm.get('mathAnswer')?.valid) {
          this.errorMessage = 'Please enter a valid number';
          this.isSubmitting = false;
          return;
        }
        break;
      case 'text-verify':
        answer = this.captchaForm.get('textAnswer')?.value;
        if (!this.captchaForm.get('textAnswer')?.valid) {
          this.errorMessage = 'Please enter the verification text';
          this.isSubmitting = false;
          return;
        }
        break;
    }

    const isCorrect = this.captchaService.submitAnswer(answer);
    
    if (isCorrect) {
      setTimeout(() => {
        if (this.captchaService.isCompleted()) {
          this.captchaService.completeChallenge();
          this.router.navigate(['/results']);
        } else {
          this.captchaService.nextStage();
          this.loadCurrentStage();
        }
        this.isSubmitting = false;
      }, 1000);
    } else {
      this.errorMessage = 'Incorrect answer. Please try again.';
      this.isSubmitting = false;
    }
  }

  goToPrevious(): void {
    if (this.captchaService.previousStage()) {
      this.loadCurrentStage();
    }
  }

  goToNext(): void {
    if (this.captchaService.nextStage()) {
      this.loadCurrentStage();
    }
  }

  getProgress(): number {
    const progress = this.captchaService.getCurrentProgress();
    if (!progress) return 0;
    return Math.round(((progress.currentStage + 1) / progress.stages.length) * 100);
  }

  canGoNext(): boolean {
    const progress = this.captchaService.getCurrentProgress();
    return progress ? progress.currentStage < progress.stages.length - 1 : false;
  }

  canGoPrevious(): boolean {
    const progress = this.captchaService.getCurrentProgress();
    return progress ? progress.currentStage > 0 : false;
  }
}