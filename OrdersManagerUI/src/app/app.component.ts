import { Component } from '@angular/core';
import '@cds/core/icon/register';
import { ClarityIcons, cogIcon, userIcon } from '@cds/core/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
	  ClarityIcons.addIcons(cogIcon, userIcon);
  }
}
