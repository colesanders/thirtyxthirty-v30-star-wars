import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { General } from '@thirty/api-interfaces';
import { GeneralsFacade } from '@thirty/core-state';
import { SnackBarService } from '@thirty/material';


@Component({
  selector: 'thirty-generals-detail',
  templateUrl: './generals-detail.component.html',
  styleUrls: ['./generals-detail.component.scss']
})
export class GeneralsDetailComponent implements OnInit{
  @Input() general: General;
  @Input() dataSet;
  @Input() dataSetRoute;
  @Output() cancelled = new EventEmitter();


  constructor(
    private generalsFacade: GeneralsFacade,
    private snackBarService: SnackBarService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if(this.general){
      this.generalsFacade.loadGeneral(this.general.id)
    }
  }

}
