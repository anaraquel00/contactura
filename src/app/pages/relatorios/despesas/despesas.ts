import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTab } from "@angular/material/tabs";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { CdkTableDataSourceInput } from '@angular/cdk/table';

@Component({
  selector: 'app-despesas',
  imports: [CommonModule, MatTableModule, MatIconModule, MatTab, MatSlideToggleModule],
  templateUrl: './despesas.html',
  styleUrl: './despesas.scss'
})
export class DespesaRelatorio {
colunasExibidas: any;
dataSourceDespesas: CdkTableDataSourceInput<any> = [];
}
