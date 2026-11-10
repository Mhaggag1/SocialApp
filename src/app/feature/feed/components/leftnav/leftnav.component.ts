import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-leftnav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './leftnav.component.html',
  styleUrl: './leftnav.component.css',
})
export class LeftnavComponent {}
