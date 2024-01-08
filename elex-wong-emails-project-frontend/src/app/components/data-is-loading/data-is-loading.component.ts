import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'data-is-loading',
  templateUrl: './data-is-loading.component.html',
  styleUrls: ['./data-is-loading.component.scss']
})
export class DataIsLoadingComponent implements OnInit {
  public lottieOptions: AnimationOptions = {
    path: '/assets/animations/23718-card-view-loader.json'
  }

  constructor() { }

  async ngOnInit() {
  }
}
