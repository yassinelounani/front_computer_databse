import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss']
})
export class ScrollComponent implements OnInit {
  private hidden: boolean;
  private url: string;
  constructor(private router: Router) { }
  ngOnInit() {
    this.url = this.router.url + '#haut';
    this.hidden = true;
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= 1.5 * document.body.offsetHeight) {
      this.hidden = false;
    } else {
      this.hidden = true;
    }
  }
}
