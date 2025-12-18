import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaptchaStateService } from '../../core/services/captcha-state.service';
import { CaptchaResult } from '../../core/models/captcha-result.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  results: CaptchaResult | null = null;
  Math = Math;

  constructor(
    private captchaService: CaptchaStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.results = this.captchaService.getResults();
    if (!this.results) {
      this.router.navigate(['/']);
    }
  }

  restartChallenge(): void {
    this.captchaService.resetChallenge();
    this.router.navigate(['/']);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  getPerformanceMessage(): string {
    if (!this.results) return '';
    
    if (this.results.passed) {
      if (this.results.accuracy === 100) {
        return 'Perfect! You completed all challenges correctly!';
      }
      return 'Great job! You passed the CAPTCHA challenge!';
    }
    return 'Challenge incomplete. Please try again.';
  }

  getPerformanceClass(): string {
    if (!this.results) return '';
    
    if (this.results.passed) {
      return this.results.accuracy === 100 ? 'perfect' : 'passed';
    }
    return 'failed';
  }
}