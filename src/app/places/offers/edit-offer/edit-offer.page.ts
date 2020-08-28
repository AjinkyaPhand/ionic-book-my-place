import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlacesService } from '../../places.service';
import { NavController } from '@ionic/angular';
import { Place } from '../../place.model';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.page.html',
  styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit {
  place: Place;
  myForm: FormGroup;
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
          this.myForm = new FormGroup({
            title: new FormControl(this.place.title, Validators.required),
            description: new FormControl(this.place.description, Validators.required)
          })
        })
      }
    )
  }

  onEditOffer() {
    if (this.myForm.invalid) {
      return;
    }
    console.log(this.myForm.value);
  }

}
