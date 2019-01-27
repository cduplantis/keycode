import { Component, OnInit, ViewChild } from '@angular/core';
import { KeycodeService } from './keycode.service';
import { MatRipple } from '@angular/material/core';

enum MatchType {
  Match = 'Match',
  Lockout = 'Lockout'
}

interface Match {
  numbers: string[];
  position: number;
  matchType: MatchType;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(MatRipple) ripple: MatRipple;


  title = 'Ford KeyCode Assistant';
  currentNumber: string[] = ['', '', '', '', ''];
  matches: Match[] = [];

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
    this.matches.push({numbers: this.currentNumber, matchType: MatchType.Match, position: this.keycodeService.getPosition()});
    this.keycodeService.matched();
  }

  onStartOver(): void {
    this.keycodeService.reset();
  }

  onClearMatches(): void {
    this.matches = [];
  }

  onLockout(): void {
    this.matches.push({numbers: this.currentNumber, matchType: MatchType.Lockout, position: this.keycodeService.getPosition()});
    this.keycodeService.lockedOut();
  }
}
