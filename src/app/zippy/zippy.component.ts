import {Component, Input} from '@angular/core';

@Component({
  selector: 'jo-zippy',
  templateUrl: './zippy.component.html',
  styleUrls: ['./zippy.component.scss']
})
export class ZippyComponent {

  @Input('title') title: string;

  isExpanded = false;

  onToggle() {
    this.isExpanded = !this.isExpanded;
  }
}
