import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { GeneralsFacade } from '@thirty/core-state'
import { General, getDataSet, StarWarsDataSets } from '@thirty/api-interfaces';
import { SnackBarService } from '@thirty/material';
import { Animations } from '../animations';


@Component({
  selector: 'thirty-generals',
  templateUrl: './generals.component.html',
  styleUrls: ['./generals.component.scss'],
  animations: Animations,
})
export class GeneralsComponent implements OnInit {
  generals$: Observable<General[]> = this.generalFacade.allGenerals$;
  general$: Observable<General> = this.generalFacade.selectedGeneral$;
  count$: Observable<Number> = this.generalFacade.count$;
  dataSet$: Observable<String> = this.generalFacade.selectedDataSet$;
  dataSetFields;
  dataSetRoute;
  detailOpen = false;
  searchTerm;

  constructor(
    private generalFacade: GeneralsFacade,
    private router: Router,
    private route: ActivatedRoute,
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.route.url.subscribe(params => {
      this.dataSetRoute = params[1].path
      this.generalFacade.selectDataSet(this.dataSetRoute);
      this.dataSetFields = StarWarsDataSets[getDataSet(this.dataSetRoute)];
      this.generalFacade.loadGenerals();
    })
    
  }

  focusDetail(){
    this.detailOpen = true;
  }

  focusoutDetail(){
    this.detailOpen = false;
  }

  select(general: General): void{
    this.generalFacade.selectGeneral(general.id);
    this.generalFacade.loadGeneral(general.id);
    this.focusDetail();
  }

  cancel(): void{
    this.focusoutDetail();
    this.router.navigate(['/general', this.dataSetRoute]);
    this.generalFacade.resetSelectedGeneral();
  }

}
