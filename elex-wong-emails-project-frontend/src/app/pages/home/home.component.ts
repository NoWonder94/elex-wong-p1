import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NetworksService } from 'src/app/services/networks.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public networkSupported = false;

  constructor(private router: Router,
    private web3Service: Web3Service,
    private zone: NgZone,
    private networksService: NetworksService) {
  }

  async ngOnInit() {
    this.web3Service.chainIdEvent.subscribe(chainId => {
      this.zone.run(() => {
        this.networkSupported = this.networksService.isActiveNetworkSupported();
      });
    });
  }

  /* public play() {
    this.r outer.navigate(['play/' + this.web3Service.chainIdEvent.value]);
  }*/
}
