import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent {
  starWidth: number;
  @Input() rating: number;
  // whenever you set the @Output thing it always should be the event

  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnChanges(): void {
    this.starWidth = (this.rating * 75) / 5;
  }

  onClick(): void {
   this.ratingClicked.emit(`The rating ${this.rating} was clicked`);
  }
}
