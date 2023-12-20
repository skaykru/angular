import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FeedName } from '../../enums/feed-name.enum';

@Component({
  selector: 'app-feed-toggle',
  templateUrl: './feed-toggle.component.html',
  styleUrls: ['./feed-toggle.component.scss'],
})
export class FeedToggleComponent implements OnInit {
  @Input('activeFeed') activeFeed!: FeedName;
  @Input('activeTag') activeTag!: string;
  @Output() globalFeedClickEvent = new EventEmitter<null>();
  @Output() yourFeedClickEvent = new EventEmitter<null>();
  FeedName = FeedName;

  constructor(public authServ: AuthService) {}

  ngOnInit(): void {}

  globalFeedClickHandler(): void {
    this.globalFeedClickEvent.emit();
  }

  yourFeedClickHandler(): void {
    this.yourFeedClickEvent.emit();
  }
}
