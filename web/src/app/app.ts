import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IconComponent, IconName } from './shared/icon';
import { ThemeService } from './shared/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly themeService = inject(ThemeService);
  protected readonly menuOpen = signal(false);
  protected readonly tabs: { path: string; label: string; icon: IconName }[] = [
    { path: 'introduction', label: 'Introduction', icon: 'sparkles' },
    { path: 'journey', label: 'Journey', icon: 'compass' },
    { path: 'installation', label: 'Installation', icon: 'download' },
    { path: 'skills', label: 'Skills', icon: 'puzzle' },
    { path: 'docs', label: 'Docs', icon: 'book' },
    { path: 'get-started', label: 'Get Started', icon: 'rocket' },
  ];
  protected readonly year = new Date().getFullYear();
}
