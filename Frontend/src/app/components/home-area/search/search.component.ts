import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

    public titleForString: string = 'The title of the label!';

    public textForSerach: string;
    
    public doSearch( args: Event ):void{
        alert('Searching: ' + this.textForSerach );
        this.textForSerach = '';
        this.titleForString = 'Update!'
    }
    
}
