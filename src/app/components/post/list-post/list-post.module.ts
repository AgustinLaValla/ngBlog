import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListPostRoutingModule } from './list-post-routing.module';
import { ListPostComponent } from './list-post.component';
import { MaterialModule } from 'src/app/material/material.module';
import { TableComponent } from '../../shared/table/table.component';
import { DomseguroPipe } from 'src/app/pipes/domseguro.pipe';
import { FormsModule } from '@angular/forms';
// import { EditDialogComponent } from '../../edit-dialog/edit-dialog.component';


@NgModule({
  declarations: [ListPostComponent, TableComponent, DomseguroPipe, /*EditDialogComponent*/],
  imports: [
    CommonModule,
    ListPostRoutingModule,
    MaterialModule,
    FormsModule,
  ],
  // entryComponents:[EditDialogComponent]
})
export class ListPostModule { }
