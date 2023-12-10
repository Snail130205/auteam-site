import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./entities/components/header/header.component";
import {FooterComponent} from "./entities/components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _router: Router,
    private readonly _activeRoute: ActivatedRoute
              ) {}

  public ngOnInit(): void {
    if (this._router.url === '/') {
      this._router.navigate(['main']);
    }
  }
}
