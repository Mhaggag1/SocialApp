import { Component } from '@angular/core';
import { LeftnavComponent } from './components/leftnav/leftnav.component';
import { MainfeedComponent } from './components/mainfeed/mainfeed.component';
import { SuggestedComponent } from './components/suggested/suggested.component';

@Component({
  selector: 'app-feed',
  imports: [LeftnavComponent, MainfeedComponent, SuggestedComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css',
})
export class FeedComponent {}
