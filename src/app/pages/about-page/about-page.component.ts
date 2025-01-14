import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  imports: [],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true
})
export default class AboutPageComponent { }
