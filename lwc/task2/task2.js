import { LightningElement, track } from 'lwc';
import getObjectNames from '@salesforce/apex/task2Controller.getObjectNames';
import getObjectField from '@salesforce/apex/task2Controller.getObjectField';
import getData from '@salesforce/apex/task2Controller.getData';
export default class Task2 extends LightningElement {
    @track selectedObject ;
    @track listOfObjNames;
    @track listOfFields;
    @track selected=[];
    @track cols=[];
    @track option;
    @track data=[];
    @track selectedObj;
    @track startDate;
    @track endDate;
    connectedCallback(){
        getObjectNames()
        .then(result =>{            
            this.listOfObjNames=result;           
        })
    }
    onchangeClick(event){
        this.selectedObj = event.target.value;
        getObjectField({objectName:event.target.value})
        .then(result =>{            
            this.listOfFields=result;           
        })
    }
    handleChange(event){
        console.log(event.target.value);   
        
        this.selected =[];
        this.cols=[];       
            for (this.option of this.template.querySelectorAll('select')[1].options)
            {
                if (this.option.selected) {
                    this.selected.push(this.option.value);
                    this.cols.push({label:this.option.dataset.item,fieldName:this.option.value});
                }
            } 
        }
        startDateHandler(event){
            this.startDate = event.target.value;
        }
        endDataHandler(event){
            this.endDate = event.target.value;
        }
        handleSearch(event){
            console.log(this.startDate , this.endDate);
          
            getData({obj:this.selectedObj,listOfFields:this.selected,startDate:JSON.stringify(this.startDate),endDate:JSON.stringify(this.endDate)})
            .then(result =>{
                console.log(result);
                this.data = result;
            })
        }
        convertListToCSV (event){
            console.log("function entered");
            if (this.data == null || this.data.length == 0) {
                return null; // 
            }
    
            // CSV file parameters.
            var columnEnd = ',';
            var lineEnd =  '\n';
    
            // Get the CSV header from the list.
            var keys = new Set();
            this.data.forEach(function (record) {
                Object.keys(record).forEach(function (key) {
                    keys.add(key);
                });
            });
    
            // 
            keys = Array.from(keys);
    
            var csvString = '';
            csvString += keys.join(columnEnd);
            csvString += lineEnd;
    
            for(var i=0; i < this.data.length; i++){
                var counter = 0;
    
                for(var sTempkey in keys) {
                    var skey = keys[sTempkey] ;
    
                    // add , after every value except the first.
                    if(counter > 0){
                        csvString += columnEnd;
                    }
    
                    // If the column is undefined, leave it as blank in the CSV file.
                    var value = this.data[i][skey] === undefined ? '' : this.data[i][skey];
                    csvString += '"'+ value +'"';
                    counter++;
                }
    
                csvString += lineEnd;
            }
                console.log("function called");
            return csvString;
        }
        downloadCsv(event){
          
    
            // call the helper function which returns the CSV data as a String
            var csv = this.convertListToCSV( );
            if (csv == null){return;}
    
            // Create a temporal <a> html tag to download the CSV file
            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            hiddenElement.target = '_self';
            hiddenElement.download = "data.csv";
            document.body.appendChild(hiddenElement); //Required for FireFox browser
            hiddenElement.click(); // using click() js function to download csv file
        }
    }
    
   
