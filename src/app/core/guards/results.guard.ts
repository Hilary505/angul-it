import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CaptchaStateService } from '../services/captcha-state.service';

@Injectable({
  providedIn: 'root'
})
export class ResultsGuard implements CanActivate {
  constructor(
    private captchaService: CaptchaStateService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.captchaService.isCompleted()) {
      return true;
    }
    
    const progress = this.captchaService.getCurrentProgress();
    if (progress) {
      this.router.navigate(['/captcha']);
    } else {
      this.router.navigate(['/']);
    }
    return false;
  }
}