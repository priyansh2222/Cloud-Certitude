import { LightningElement, track } from 'lwc';

export default class WeatherTask extends LightningElement {
    @track city;
    @track isData =false;
    @track wdata;
    @track url;
    @track sam="facebbok";
    @track weather;
    @track imgsrc;
    cityHandler(event){
        this.city = event.target.value;
        this.isData =false;
    }
    fetchDetails(event){
       this.url = 'https://api.openweathermap.org/data/2.5/weather?q='+this.city+'&APPID=bd17cc4cf44c75b56c3701174826b579';
        fetch(this.url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            this.wdata = data;
            this.isData = true;
            console.log(this.wdata);
            this.weather = this.wdata.weather[0].description;
            this.imgsrc = "http://openweathermap.org/img/w/" + this.wdata.weather[0].icon + ".png";
            console.log(this.wdata.main.temp);
            this.wdata.main.temp = parseInt(this.wdata.main.temp)-272;
        });
        console.log(this.city);
    }
}