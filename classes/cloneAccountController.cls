public with sharing class cloneAccountController {
    
    @AuraEnabled
    public static Account getAccount(String recordId){
        try {
           return [select id ,Name ,Type,BillingCity,BillingState from Account where id=:recordId limit 1]; 

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
