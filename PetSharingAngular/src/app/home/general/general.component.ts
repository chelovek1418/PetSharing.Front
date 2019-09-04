import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styles: ['.my-hover:hover{transform: scale(1.05); background-color: #e3f2fd; transition-duration: 300ms;}']
})
export class GeneralComponent implements OnInit {
  @Input() userDetails;
  state = false;
  constructor() { }

  ngOnInit() {
  }

}
