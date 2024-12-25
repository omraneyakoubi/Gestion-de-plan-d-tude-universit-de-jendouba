import { Component, OnInit } from '@angular/core';
import { Diplome, DiplomeService } from 'src/app/services/diplome.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-diplome',
  templateUrl: './diplome.component.html',
  styleUrls: ['./diplome.component.css']
})
export class DiplomeComponent implements OnInit {

  dataarray: Diplome[] = [];
  constructor(private diplome: DiplomeService) { }



ngOnInit(): void {
  this.diplome.getalldiplomes().subscribe(
    (response: any) => {
      if (response.status === 1 && Array.isArray(response.data)) {
        this.dataarray = response.data;
        console.log("diploms:", this.dataarray);
      } else {
        console.error("Error: Invalid response format");
      }
    },
    (error: any) => {
      console.error("Error fetching diplomes:", error);
    }
  );}
adddiplome: string|any[]|null|undefined;


deleteDiplome(diplome: Diplome): void {
  Swal.fire({
    title: 'Are you sure?',
    text: 'You want to delete this entry?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.diplome.delete(diplome.id).subscribe(
        (response: any) => {
          if (response.status === 1) {
            // Remove the deleted entry from the array
            this.dataarray = this.dataarray.filter(item => item.id !== diplome.id);
            Swal.fire('Deleted!', 'Entry has been deleted.', 'success');
          } else {
            Swal.fire('Deleted', 'Failed to delete entry', 'success');
            Swal.fire({
              title: 'Deleted!',
              text: 'User has been deleted.',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              window.location.reload();
            });
          }
        },
        error => {
          console.error('Error deleting entry:', error);
          Swal.fire('Error', 'Failed to delete entry', 'error');
        }
      );
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelled', 'Entry deletion was cancelled', 'info');
    }
  });
}




}
