import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CaptchaComponent } from './pages/captcha/captcha.component';
import { ResultComponent } from './pages/result/result.component';
import { ResultsGuard } from './core/guards/results.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'captcha', component: CaptchaComponent },
  { path: 'results', component: ResultComponent, canActivate: [ResultsGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }