import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { GeneralsFacade } from '@thirty/core-state';
import { General } from '@thirty/api-interfaces';
@Component({
  selector: 'thirty-stats-overview',
  templateUrl: './generals-overview.component.html',
  styleUrls: ['./generals-overview.component.scss']
})
export class GeneralsOverviewComponent implements OnInit {
  general$: Observable<General> = this.generalsFacade.selectedGeneral$;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private generalsFacade: GeneralsFacade,
  ) { }

  ngOnInit(): void {
    this.get()
  }

  get(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.generalsFacade.selectGeneral(id);
  }

  close(){
    this.router.navigate(['/general']);
  }

}
