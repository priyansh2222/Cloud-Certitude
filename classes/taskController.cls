public with sharing class taskController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String name){
        try {
            name='%'+name+'%';
            if(Account.sObjectType.getDescribe().isAccessible()){
                return [select Id,Name from Account where name like:name];
            }
            return new list<Account>();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(Id idValue){
        try {
           
            if(Contact.sObjectType.getDescribe().isAccessible()){
                return [select Id,FirstName from Contact where AccountId =:idValue];
            }
            return new list<Contact>();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
