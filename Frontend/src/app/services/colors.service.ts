import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ColorsService{

    public getColor():string {
        const r = Math.floor( Math.random() * 256 );
        const g = Math.floor( Math.random() * 256 );
        const b = Math.floor( Math.random() * 256 );
        return `rgb(${r}, ${g}, ${b})`
    }
}
