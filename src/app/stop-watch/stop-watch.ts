
import { Component, signal, HostListener } from '@angular/core';

export class StopWatchModule {}

@Component({
  selector: 'app-stop-watch',
  imports: [],
  templateUrl: './stop-watch.html',
  styleUrl: './stop-watch.css',
})
export class StopWatch {


  elapsedTimeSignal = signal('00:00:00');
  startTime: number = 0;  
  elapsedTime: number = 0;
  timerInterval: ReturnType<typeof setInterval> | null = null;
  isRunning: boolean = false;
  solvedTimes: string[] = []; 
  convertedTime: string = '';
  averageTime = signal('00:00:00');
 
 

start(): void {      
   if (!this.isRunning) {
            this.startTime = performance.now();
            console.log(this.startTime);
            this.timerInterval = setInterval(() => {
                this.elapsedTime = performance.now() - this.startTime;  
                this.convertedTime = this.getFormattedTime(this.elapsedTime);              
                this.elapsedTimeSignal.set(this.convertedTime);
            }, 10); 
            this.isRunning = true;
        }
        }


  stop(): void {
        if (this.isRunning && this.timerInterval) {
            clearInterval(this.timerInterval);
            this.isRunning = false;
            const solvedTime = this.getFormattedTime(this.elapsedTime);
            this.elapsedTimeSignal.set(solvedTime);
            this.solvedTimes.push(solvedTime);
          
        }
} 

  @HostListener('window:keydown', ['$event'])
       onKeyDown(event: KeyboardEvent) {
    
          if(!this.isRunning){
            this.start();
          } else {this.stop();}
      
    }
  
    



resetTime(): void {
  
    this.stop();
    this.elapsedTime = 0;
    this.elapsedTimeSignal.set('00:00:00');
}


getFormattedTime(elpasedTime: number): string {
    const ms = Math.floor(elpasedTime % 1000);
        const seconds = Math.floor((elpasedTime / 1000) % 60);
        const minutes = Math.floor((elpasedTime / (1000 * 60)) % 60);
        const centiseconds = Math.floor(ms / 10);

        return [
            minutes.toString().padStart(2, '0'),
            seconds.toString().padStart(2, '0'),
            centiseconds.toString().padStart(2, '0')
        ].join(':');
      }

      clearHistory(): void {
        this.solvedTimes = [];
      }

      

calculateAverage(solvedTimes: string[]): void {
  let totalCentiseconds = 0;

  for (const solvedTime of solvedTimes) {
    const [minutes, seconds, centiseconds] = solvedTime.split(':').map(Number);

          totalCentiseconds +=
            minutes * 60 * 100 +
            seconds * 100 +
            centiseconds;
  }

  if (solvedTimes.length === 0) {
    this.averageTime.set('00:00:00');
    return;
  }

    const averageCentiseconds = totalCentiseconds / solvedTimes.length;
    const averageMilliseconds = averageCentiseconds * 10;

  this.averageTime.set(this.getFormattedTime(averageMilliseconds));
}
                
} 
      


function start(): string {
  throw new Error('Function not implemented.');
}

