import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit {
  place: Place
  constructor(private route: ActivatedRoute, private navController: NavController,
    private serviceObject: PlacesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        if (!params.get("placeId")) {
          this.navController.navigateBack("/places/tabs/offers")
          return
        }
        this.serviceObject.findPlaceById(params.get("placeId")).subscribe(place => {
          this.place = place;
        })
      }
    )
  }

}
