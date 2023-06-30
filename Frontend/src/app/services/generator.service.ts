import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {

    public generate( count: number ):Observable<number> {

        return new Observable( (observer: Observer<number> ) => {

            const timerId = window.setInterval(()=>{

                try {

                    const num = Math.floor( Math.random() * 100 ) + 1;
                    observer.next(num)
                    console.log(num);
                    
    
                    count--
    
                    if(count === 0 ){
                        window.clearInterval(timerId);
                        observer.complete();
                    }

                } catch (error) {
                    window.clearInterval(timerId);
                    observer.error(error)
                }

            }, 500 )

        })

    }

  
}
