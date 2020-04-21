import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PostI } from 'src/app/shared/model/post.interface';
import { MatSort } from '@angular/material/sort'
import Swal from 'sweetalert2';
import { EditDialogComponent } from '../../../components/edit-dialog/edit-dialog.component';
import { Store } from '@ngrx/store';
import { AppState, getAllPosts, getOperationFailed } from 'src/app/app.reducer';
import { loadAllPosts, loadDeletePost } from '../../post/post.actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnInit {

  public displayedColumns: string[] = [ 'imagePost' ,'titlePost', 'tagsPost', 'actions'];
  public dataSource = new MatTableDataSource<PostI>();
  public posts_subscription$ = new Subscription();
  public operationFailedSubscription = new Subscription();


  @ViewChild(MatPaginator, {static: true}) public paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort

  constructor( private dialog:MatDialog,
               private store:Store<AppState>) { 
    this.posts_subscription$ = this.store.select(getAllPosts).subscribe((posts:PostI[]) => this.dataSource.data = posts)
   this.operationFailedSubscription = this.store.select(getOperationFailed).subscribe((error:any) => {
     if(error){ 
       this.onError(error)
     }
  });
  }

  ngOnInit() {
    this.store.dispatch(new loadAllPosts)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  //ADD POST
  addNewPost() { 
    this.onEditOrAdd();
  }
  
  //EDIT POST
  edit(post:PostI) { 
    this.onEditOrAdd(post);

  }

  //DELETE POST
  delete(post:PostI) { 
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Los datos borrados no se pdorán recuperar`,
      icon: 'warning',
      confirmButtonColor:  '#ff8811',
      confirmButtonText: 'Borrar!',
      showCancelButton: true,
      cancelButtonText: '¡Cancelar!',
      cancelButtonColor: '#451e89',
      // reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.store.dispatch(new loadDeletePost(post))
          Swal.fire(
            'Borrado',
            'Los datos del post han sido eliminados',
            'success'
          )
      } 
    })
  }

  onEditOrAdd(post?:PostI):void { 

    const dialogRef = this.dialog.open(EditDialogComponent,{
      width: '500px',
      height:'500px',
      data:{message: (post) ? 'Edit Post' : 'New Post', 
           content:post
      },
      
    });
    dialogRef.afterClosed().subscribe(console.log)
  }

  onError(error:any) { 
    Swal.fire('Error!', error.message, 'error');
  }

  ngOnDestroy(): void {
    this.posts_subscription$.unsubscribe();
    this.operationFailedSubscription.unsubscribe();
  }

}

