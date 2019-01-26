import { Component, OnInit, ViewChild } from '@angular/core';
import { KeycodeService } from './keycode.service';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(MatRipple) ripple: MatRipple;


  title = 'Ford KeyCode Assistant';
  currentNumber: string[] = ['', '', '', '', ''];
  matches: string[][] = [];

  constructor(private keycodeService: KeycodeService) {
    this.keycodeService = keycodeService;
    this.keycodeService.getNumber()
      .subscribe(currentNumber => this.currentNumber = currentNumber);
  }

  launchRipple() {
    const rippleRef = this.ripple.launch({
      color: 'mat-accent',
      persistent: true,
      centered: true
    });

    // Fade out the ripple later.
    rippleRef.fadeOut();
  }

  ngOnInit() {
    this.keycodeService.reset();
  }

  getCurrentNumber(): void {
  }

  onNextNumber(): void {
    this.keycodeService.nextNumber();
    this.launchRipple();
  }

  onMatched(): void {
    this.matches.push(this.currentNumber);
    this.keycodeService.matched();
  }

  onStartOver(): void {
    this.keycodeService.reset();
  }

  onClearMatches(): void {
    this.matches = [];
  }
}
