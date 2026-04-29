import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IonButtons, IonHeader, IonIcon, IonSearchbar, IonToolbar } from "@ionic/angular/standalone";
import { RouterLink } from "@angular/router";
import { addIcons } from "ionicons";
import { arrowBackOutline, personCircle } from "ionicons/icons";

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
export class HeaderComponent implements OnInit {
  @Input() mostrarFlecha: boolean = true;

  // Emisor para notificar a la HomePage cuando el usuario escribe
  @Output() search = new EventEmitter<string>();

  constructor() {
    addIcons({ arrowBackOutline, personCircle });
  }

  ngOnInit() {}

  // Captura el evento del searchbar y emite el valor
  onSearch(event: any) {
    const searchTerm = event.detail.value || '';
    this.search.emit(searchTerm);
  }
}
