import {Component, Input, OnInit} from '@angular/core';
import {IonButtons, IonHeader, IonIcon, IonSearchbar, IonToolbar} from "@ionic/angular/standalone";
import {RouterLink} from "@angular/router";
import {addIcons} from "ionicons";
import {arrowBackOutline, personCircle} from "ionicons/icons";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonHeader,
    IonIcon,
    IonSearchbar,
    IonToolbar,
    RouterLink
  ]
})
export class HeaderComponent  implements OnInit {
  @Input() mostrarFlecha: boolean = true;

  constructor() {
    addIcons({ arrowBackOutline, personCircle });
  }
  ngOnInit() {}

}
