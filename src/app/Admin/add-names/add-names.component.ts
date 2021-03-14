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
  options: Names[] = [];
  newData: Names[] = [];
  filteredOptions: Names[] = [];
  isVisibleEdit = false;
  isVisibleTop = false;
  editCache: { [key: string]: { edit: boolean; data: Names } } = {};
  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    // this.filteredOptions = this.options;
    // this.getNames();

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
        if (this.listOfData.map((nam) => nam.name_EN).includes(control.value)) {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  ngOnInit(): void {
    this.authService.names().subscribe((data: Names[]) => {
      this.options = data['items'];
      this.filteredOptions = data['items'];
      console.log(this.filteredOptions);
    });
    this.updateEditCache();
    // this.filteredOptions = this.options;
  }
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
      compare: (a: Names, b: Names) => a.modified - b.modified,
      priority: 3,
    },
    { title: 'Action' },
  ];
  listOfData: Names[] = [
    {
      id: '0',
      name_EN: 'chandrashekhar',
      name_NP: 'चन्द्रशेखर',
      gender: 'male',
      meaning:
        'One who holds moons in his hair (जसले आफ्नो कपालमा चन्द्रमा लगाउँछ); Lord Shiva (भगवान शिव)',
      origin: '',
      slug: '',
      postStatus: '',
      modified: '',
    },

    {
      id: '1',
      name_EN: 'chandrashekhar',
      name_NP: 'चन्द्रशेखर',
      gender: 'male',
      meaning:
        'One who holds moons in his hair (जसले आफ्नो कपालमा चन्द्रमा लगाउँछ); Lord Shiva (भगवान शिव)',
      origin: '',
      slug: '',
      postStatus: '',
      modified: '',
    },
    {
      id: '2',
      name_EN: 'chandrashekhar',
      name_NP: 'चन्द्रशेखर',
      gender: 'male',
      meaning:
        'One who holds moons in his hair (जसले आफ्नो कपालमा चन्द्रमा लगाउँछ); Lord Shiva (भगवान शिव)',
      origin: '',
      slug: '',
      postStatus: '',
      modified: '',
    },
    {
      id: '3',
      name_EN: 'chandrashekhar',
      name_NP: 'चन्द्रशेखर',
      gender: 'male',
      meaning:
        'One who holds moons in his hair (जसले आफ्नो कपालमा चन्द्रमा लगाउँछ); Lord Shiva (भगवान शिव)',
      origin: '',
      slug: '',
      postStatus: '',
      modified: '',
    },
  ];
  onChange(value: string): void {
    console.log(this.filteredOptions);
    // this.options = this.listOfData.map((name) => name.name);
    this.filteredOptions = this.options.filter(
      (option) =>
        option.name_EN.toLowerCase().indexOf(value.toLowerCase()) !== -1
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
    const index = this.options.findIndex((item) => item.id === id);
    console.log('i am clicked');
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false,
    };
  }
  cancelEdit(id: string): void {
    const index = this.options.findIndex((item) => item.id === id);
    console.log('i am clicked');
    this.editCache[id] = {
      data: { ...this.options[index] },
      edit: false,
    };
  }
  saveEdit(id: string): void {
    const index = this.options.findIndex((item) => item.id === id);

    const dat = Object.assign(this.options[index], this.editCache[id].data);
    //call the serivce api to update the data;
    console.log(dat);
    this.editCache[id].edit = false;
  }
  updateEditCache(): void {
    this.options.forEach((item) => {
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
    this.authService.names().subscribe((data) => {
      this.options = data['items'];
    });
    // console.log(this.authService.names().subscribe((data) => data));
  }
}
