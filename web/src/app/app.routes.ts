import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'introduction' },
  { path: 'introduction', title: 'Introduction | AIDLC Playbook', loadComponent: () => import('./pages/introduction').then((m) => m.IntroductionPage) },
  { path: 'journey', title: 'Journey | AIDLC Playbook', loadComponent: () => import('./pages/journey').then((m) => m.JourneyPage) },
  { path: 'installation', title: 'Installation | AIDLC Playbook', loadComponent: () => import('./pages/installation').then((m) => m.InstallationPage) },
  { path: 'skills', title: 'Skills | AIDLC Playbook', loadComponent: () => import('./pages/skills').then((m) => m.SkillsPage) },
  { path: 'docs', title: 'Docs | AIDLC Playbook', loadComponent: () => import('./pages/docs').then((m) => m.DocsPage) },
  { path: 'get-started', title: 'Get Started | AIDLC Playbook', loadComponent: () => import('./pages/get-started').then((m) => m.GetStartedPage) },
  { path: '**', redirectTo: 'introduction' },
];
