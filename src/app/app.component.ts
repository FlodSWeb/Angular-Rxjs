import { Component, OnDestroy, OnInit } from '@angular/core';
import { elementAt, filter, from, interval, map, Observable, of, Subscription, take, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  // private subscription: Subscription[] = [];
  // OU
  private subscription: Subscription = new Subscription();

  ngOnInit() {

    function multiplier(item: number): number {
      return 2 * item;
    }

    // from([1, 2, 12, 13, 14, 15])
    from([1, 2, 0, 12, undefined, 13, 0, 14, 15]) // cas pour le filter()
      .pipe(
        // tap(elem => console.log(elem)
        // ),
        // // map(multiplier) passage de la fonction multiplier() en paramètre
        // // map((elem: number) => elem * 2) le résultat est le mm que la fonction multiplier()
        // map((elem: number) => {
        //   if (elem == 0) {
        //     throw new Error('zero erreur') // le map va s'arrêter si 0 est une valeur du from
        //   }
        //   return elem * 2;
        // }),
        // map(item => item - 2),
        // take(2)
        filter(elem => elem !== undefined && elem !== 0)
      )
      .subscribe(
        (item: number | undefined) => console.log(`ma valeur ${item}`),
        (err: unknown) => console.error(err),
        () => console.log('Finitto')
      );
  }

  public start(): void {
    this.subscription.add(interval(1000).subscribe( // METHODE RXJS
      value => console.log('ma valeur: ', value),
      error => console.error(error),
      () => console.log('terminé')
    ))

    this.subscription.add(interval(1000).subscribe(
      value => console.warn('***ma valeur***: ', value),
      error => console.error(error),
      () => console.warn('***terminé***')
    ))
  }

  public stop(): void {
    this.subscription.unsubscribe();
    alert("STOP");
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
