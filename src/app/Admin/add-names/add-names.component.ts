import { AuthService } from './../../Service/auth.service';
import { Names } from './../../Model/names';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-add-names',
  templateUrl: './add-names.component.html',
  styleUrls: ['./add-names.component.css'],
})
export class AddNamesComponent implements OnInit {
  inputValue?: string;
  options: any = [];
  filteredOptions: any = [];
  isVisibleEdit = false;
  isVisibleTop = false;
  editCache: { [key: string]: { edit: boolean; data: Names } } = {};
  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.options = this.listOfData;
    this.filteredOptions = this.options;

    this.updateEditCache();
    // initial forms status
    this.validateForm = this.fb.group({
      name: ['', [Validators.required], [this.userNameAsyncValidator]],
      nepali: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }
  submitForm1(value: {
    name: string;
    nepali: string;
    gender: string;
    description: string;
  }): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  //check username is initially exists or not
  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        //check the name exist or not
        if (this.listOfData.map((nam) => nam.name).includes(control.value)) {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  ngOnInit(): void {}
  listOfColumn = [
    {
      title: 'Name',

      priority: 3,
    },
    {
      title: 'Name in Nepali',
    },
    {
      title: 'Gender',
    },
    { title: 'Meaning' },
    {
      title: 'Approve',
      compare: (a: Names, b: Names) => a.update - b.update,
      priority: 3,
    },
    { title: 'Action' },
  ];
  listOfData: Names[] = [
    {
      id: '1',
      name: 'aani',
      nepali: 'आनी',
      gender: 'female',
      description:
        'She was literally a woman and a poetess in Qastaniniyah (उनी शाब्दिक महिला थिइन र कस्तानिनियाहमा एक कवि थिइन)',
      update: 324234,
    },

    {
      id: '2',
      name: 'subash',
      nepali: '	सुबाश',
      gender: 'male',
      description:
        'Gift of god (भगवान को उपहार); Fresh smell (ताजा गन्ध); Fragrance (सुगन्ध)',
      update: '',
    },
    {
      id: '3',
      name: 'shekhar',
      nepali: 'शेखर',
      gender: 'male',
      description:
        'Peak (चुचुरो); Mountain (पहाड); Ultimate (अन्तिम); Lord Shiva (भगवान शिव)',
      update: 2341234,
    },
    {
      id: '3',
      name: 'chandrashekhar',
      nepali: 'चन्द्रशेखर',
      gender: 'male',
      description:
        'One who holds moons in his hair (जसले आफ्नो कपालमा चन्द्रमा लगाउँछ); Lord Shiva (भगवान शिव)',
      update: 2341234,
    },
  ];
  onChange(value: string): void {
    // this.options = this.listOfData.map((name) => name.name);
    this.filteredOptions = this.listOfData.filter(
      (option) => option.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
    // const value = (event.target as HTMLInputElement).value;
  }

  showModalAdd(): void {
    this.isVisibleTop = true;
  }
  handleOkAdd(): void {
    console.log('Button ok clicked!');
    console.log(this.validateForm.value);
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    //check submit form is valid or not
    // if (this.validateForm.invalid) {
    //   this.isVisibleTop = true;
    // } else {
    //   this.isVisibleTop = false;
    //   this.validateForm.reset();
    // }
    this.isVisibleTop = false;
    this.validateForm.reset();
  }

  handleCancelAdd(): void {
    console.log('Button cancel clicked!');
    this.validateForm.reset();
    this.isVisibleTop = false;
  }
  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }
  deleteEdit(id: string): void {
    const index = this.listOfData.findIndex((item) => item.id === id);
    console.log('i am clicked');
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false,
    };
  }
  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex((item) => item.id === id);
    console.log('i am clicked');
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false,
    };
  }
  saveEdit(id: string): void {
    const index = this.listOfData.findIndex((item) => item.id === id);

    const dat = Object.assign(this.listOfData[index], this.editCache[id].data);
    //call the serivce api to update the data;
    console.log(dat);
    this.editCache[id].edit = false;
  }
  updateEditCache(): void {
    this.listOfData.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }
  //approve reuests
  approve(id: number) {
    console.log('i am approve name' + id);
  }
  getNames() {
    console.log(this.authService.names().subscribe((data) => data));
  }
}
