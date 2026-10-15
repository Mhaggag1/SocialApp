import { Component, computed, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '../../../../node_modules/@angular/router/types/_router_module-chunk';
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
