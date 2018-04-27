import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {HomePage} from "../home/home";
import {storageSettingLocationKey, storageSettingPropertiesKey} from "../../app/constants";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  city: string;
  state: string;

  isDiplayCelsiusData: boolean;
  isDiplayFahrenheitData: boolean;
  isDisplayCoordinates: boolean;
  isDisplayWindData: boolean;
  isDisplayLocalTime: boolean;
  isDisplayDewpoint: boolean;
  isDisplayVisibility: boolean;
  isDisplayHeatIndex: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage) {
  }

  ionViewWillEnter() {
    this.readLocation();
    this.readProperties();
  }

  saveSettings() {
    this.saveLocation();
    this.saveProperties();
    this.navCtrl.push(HomePage);
  }

  saveLocation() {
    let location = {
      city: this.city,
      state: this.state
    };
    this.storage.set(storageSettingLocationKey, JSON.stringify(location));
  }

  saveProperties() {
    let properties = {
      celsius: this.isDiplayCelsiusData,
      fahrenheit: this.isDiplayFahrenheitData,
      coordinates: this.isDisplayCoordinates,
      wind: this.isDisplayWindData,
      localtime: this.isDisplayLocalTime,
      dewpoint: this.isDisplayDewpoint,
      visibility: this.isDisplayVisibility,
      heatIndex: this.isDisplayHeatIndex
    };
    this.storage.set(storageSettingPropertiesKey, JSON.stringify(properties));
  }

  readLocation() {
    this.storage.get(storageSettingLocationKey).then(value => {
      if (value) {
        let location = JSON.parse(value);
        this.state = location.state;
        this.city = location.city;
      } else {

      }
    });
  }

  readProperties() {
    this.storage.get(storageSettingPropertiesKey).then(value => {
      if (value) {
        let properties = JSON.parse(value);
        this.isDiplayCelsiusData = properties.celsius;
        this.isDiplayFahrenheitData = properties.fahrenheit;
        this.isDisplayCoordinates = properties.coordinates;
        this.isDisplayWindData = properties.wind;
        this.isDisplayLocalTime = properties.localtime;
        this.isDisplayDewpoint = properties.dewpoint;
        this.isDisplayVisibility = properties.visibility;
        this.isDisplayHeatIndex = properties.heatIndex;
      } else {
        this.isDiplayCelsiusData = true;
        this.isDiplayFahrenheitData = false;
        this.isDisplayCoordinates = false;
        this.isDisplayWindData = false;
        this.isDisplayLocalTime = false;
        this.isDisplayDewpoint = false;
        this.isDisplayVisibility = false;
        this.isDisplayHeatIndex = false;
      }
    })
  }

}
