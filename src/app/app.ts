import { Time } from '@angular/common';
import id from '@angular/common/locales/extra/id';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { StopWatch } from './stop-watch/stop-watch';


@Component({
  selector: 'app-root',
  imports: [StopWatch],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
 

  
}

