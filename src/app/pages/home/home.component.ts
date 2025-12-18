import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CaptchaStateService } from '../../core/services/captcha-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  hasExistingProgress = false;

  constructor(
    private captchaService: CaptchaStateService,
    private router: Router
  ) {
    this.hasExistingProgress = !!this.captchaService.getCurrentProgress();
  }

  startChallenge(): void {
    this.captchaService.startNewChallenge();
    this.router.navigate(['/captcha']);
  }

  continueChallenge(): void {
    this.router.navigate(['/captcha']);
  }

  resetProgress(): void {
    this.captchaService.resetChallenge();
    this.hasExistingProgress = false;
  }
}