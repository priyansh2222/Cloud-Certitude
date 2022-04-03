import { LightningElement, track } from 'lwc';
import getQA from '@salesforce/apex/chatBotController.getQA';
export default class ChatBot extends LightningElement {
    @track newMessage;
    changeHandler(event){
        this.newMessage = event.target.value;
    }
    //@track questions =[["Hey","Hello","Hi"],["hru","How are you","How r u"],["What are you doing",]];
    //@track answers =["Hello this is priyansh yours new Assistant","I am fine and you ?","Answering your questions"];
    @track chat=[];
    @track QA;
    connectedCallback(){
        getQA()
        .then(result=>{
            console.log(result);
            this.QA = result;
        })
    }
   /* onclickHandler(event){
        console.log(this.newMessage);
        for(var i=0;i<this.questions.length;i++){
            for(var j=0;j<this.questions[i].length;j++){
                
                console.log(this.questions[i][j]);
                if(this.newMessage === this.questions[i][j]){
                    console.log("true");
                    this.chat.push({question:this.newMessage,answer:this.answers[i]});
                }
            }
        }
        console.log(this.chat);
    }*/
    onclickHandler(event){
        console.log(this.newMessage);
        for(var i=0;i<this.QA.length;i++){
            for(var j=0;j<this.QA[i].questions.length;j++){               
                console.log(this.QA[i].questions[j]);
                if(this.newMessage === this.QA[i].questions[j]){
                    console.log("true");
                    this.chat.push({question:this.newMessage,answer:this.QA[i].answers});
                }
            }
        }
        console.log(this.chat);
    }
}