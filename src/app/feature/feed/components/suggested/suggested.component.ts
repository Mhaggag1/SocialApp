import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { SuggestedService } from './suggested.service';
import { Isuggested } from './isuggested.interface';
import { FiltrationPipe } from '../../../../shared/pipes/filtration-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-suggested',
  imports: [FiltrationPipe, FormsModule],
  templateUrl: './suggested.component.html',
  styleUrl: './suggested.component.css',
})
export class SuggestedComponent implements OnInit {
  private readonly suggestedService = inject(SuggestedService);
  suggeseted: WritableSignal<Isuggested[]> = signal([]);
  searchText = signal('');

  ngOnInit(): void {
    this.getSuggested();
  }
  getSuggested() {
    this.suggestedService.getSuggested().subscribe({
      next: (res) => {
        console.log(res.data.suggestions);
        this.suggeseted.set(res.data.suggestions);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
