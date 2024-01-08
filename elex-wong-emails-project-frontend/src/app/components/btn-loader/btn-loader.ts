import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'btn-loader',
  templateUrl: './btn-loader.html',
  styleUrls: ['./btn-loader.scss']
})
export class ButtonLoaderComponent {
  @Input()
  public title: string = "";

  @Input()
  public busy = false;

  @Input()
  public disabled = false;

  @Input()
  public mode: "default" | "delete" = "default";

  @Output()
  public clicked = new EventEmitter<void>();

  constructor() {
  }

  public onClick() {
    if (this.busy || this.disabled)
      return;

    this.clicked.emit();
  }
}
