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
      name: 'aani',
      nepali: 'आनी',
      gender: 'female',
      description:
        'She was literally a woman and a poetess in Qastaniniyah (उनी शाब्दिक महिला थिइन र कस्तानिनियाहमा एक कवि थिइन)',
    },

    {
      id: '2',
      name: '	subash',
      nepali: '	सुबाश',
      gender: 'male',
      description:
        'Gift of god (भगवान को उपहार); Fresh smell (ताजा गन्ध); Fragrance (सुगन्ध)',
    },
    {
      id: '3',
      name: 'shekhar',
      nepali: 'शेखर',
      gender: 'male',
      description:
        'Peak (चुचुरो); Mountain (पहाड); Ultimate (अन्तिम); Lord Shiva (भगवान शिव)',
    },
    {
      id: '3',
      name: 'chandrashekhar',
      nepali: 'चन्द्रशेखर',
      gender: 'male',
      description:
        'One who holds moons in his hair (जसले आफ्नो कपालमा चन्द्रमा लगाउँछ); Lord Shiva (भगवान शिव)',
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
}
