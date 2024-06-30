import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-admin-top-bar',
  standalone: true,
  imports: [],
  templateUrl: './admin-top-bar.component.html',
  styleUrl: './admin-top-bar.component.css'
})
export class AdminTopBarComponent {
  // @Output() toggleSidebarEvent = new EventEmitter<void>();

  // toggleSidebar(): void {
  //   this.toggleSidebarEvent.emit();
  // }
}
