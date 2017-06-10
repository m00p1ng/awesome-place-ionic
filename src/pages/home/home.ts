import { ModalController } from 'ionic-angular';
import { PlacesService } from './../../services/places';
import { AddPlacePage } from './../add-place/add-place';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Place } from "../../models/place";
import { PlacePage } from "../place/place";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  addPlacePage = AddPlacePage;
  places: Place[] = [];

  constructor(public navCtrl: NavController,
              private placesService: PlacesService,
              private modalCtrl: ModalController) {

  }

  ngOnInit() {
    this.placesService.fetPlaces()
      .then(
        (places: Place[]) => {
          this.places = places;
        }
      );
  }

  ionViewWillEnter() {
    this.places = this.placesService.loadPlaces();
  }

  onOpenPlace(place: Place, index: number) {
    const modal = this.modalCtrl.create(PlacePage, {place: place, index: index});
    modal.present();
    modal.onDidDismiss(
      () => {
        this.places = this.placesService.loadPlaces();
      }
    );
  }
}
