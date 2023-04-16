import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  activeTab: string = 'Presions Arterial';
  p: number = 1;

  constructor() { }

  ngOnInit() {

  }

  onTabClick(tab) {
    this.activeTab = tab;
  }

}
