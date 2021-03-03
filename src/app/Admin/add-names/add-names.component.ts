import { Names } from './../../Model/names';
import { Component, OnInit } from '@angular/core';

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
  constructor() {
    this.options = this.listOfData;
    this.filteredOptions = this.options;
    console.log(this.editCache.edit);
    this.updateEditCache();
  }

  ngOnInit(): void {}
  listOfData: Names[] = [
    {
      id: '1',
      name: 'John Brown',
      nepali: 'subash',
      gender: 'male',
      description: 'New York No. 1 Lake Park',
    },

    {
      id: '2',
      name: 'subash',
      nepali: 'thapa',
      gender: 'male',
      description:
        'New York No. 1 Lake Park fasjd aksdjf asdjl afjsldfjalsjdlfakjsld',
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
    this.isVisibleTop = false;
  }

  handleCancelAdd(): void {
    console.log('Button cancel clicked!');
    this.isVisibleTop = false;
  }
  startEdit(id: string): void {
    this.editCache[id].edit = true;
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
}
