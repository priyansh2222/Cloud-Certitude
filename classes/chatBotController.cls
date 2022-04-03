public with sharing class chatBotController {
   @AuraEnabled(cacheable=true)
   public static list<wrap> getQA(){
       try {
        list<wrap> objList = new list<wrap>();
           list<Chatbot__c> chats = [select id , Question__c,Answer__c from Chatbot__c];
           for(chatbot__c c :chats){
                wrap a = new wrap();
                a.questions = c.question__c.split(',');
                a.answers = c.answer__c;
            objList.add(a);           }
            return objlist;
       } catch (Exception e) {
           throw new AuraHandledException(e.getMessage());
       }
   }
   class wrap{
    @AuraEnabled
    public list<String> questions;
    @AuraEnabled
   public String answers;
   }
}
