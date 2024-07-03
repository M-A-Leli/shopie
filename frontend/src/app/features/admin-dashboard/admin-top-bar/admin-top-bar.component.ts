import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin-top-bar',
  standalone: true,
  imports: [],
  templateUrl: './admin-top-bar.component.html',
  styleUrl: './admin-top-bar.component.css'
})
export class AdminTopBarComponent implements OnInit {
  // @Output() toggleSidebarEvent = new EventEmitter<void>();

  // toggleSidebar(): void {
  //   this.toggleSidebarEvent.emit();
  // }

  title: string = 'Dashboard'


  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let route = this.activatedRoute.firstChild;
        while (route?.firstChild) {
          route = route.firstChild;
        }
        route?.data.subscribe(data => {
          this.title = data['title'] || '';
        });
      }
    });
  }
}
