import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamDashboardComponent } from './components/team-dashboard/team-dashboard.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

const routes: Routes = [
  { path: '', component: PortfolioComponent },
  { path: 'team', component: TeamDashboardComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
