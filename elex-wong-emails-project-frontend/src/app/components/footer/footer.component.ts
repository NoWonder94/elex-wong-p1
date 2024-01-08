import { Component } from '@angular/core';
import { NetworksService } from 'src/app/services/networks.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'bottom-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class AppFooterComponent {
  constructor(
    private networksService: NetworksService,
    private web3Service: Web3Service
  ) {
    void this.web3Service.init();
    void this.networksService.init();
  }
}
