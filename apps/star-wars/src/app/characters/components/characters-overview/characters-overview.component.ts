import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CharactersFacade } from '@thirty/core-state';
import { Character } from '@thirty/api-interfaces';
@Component({
  selector: 'thirty-stats-overview',
  templateUrl: './characters-overview.component.html',
  styleUrls: ['./characters-overview.component.scss']
})
export class CharactersOverviewComponent implements OnInit {
  character$: Observable<Character> = this.charactersFacade.selectedCharacter$;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private charactersFacade: CharactersFacade,
  ) { }

  ngOnInit(): void {
    this.get()
  }

  get(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.charactersFacade.selectCharacter(id);
  }

  close(){
    this.router.navigate(['/characters']);
  }

}
