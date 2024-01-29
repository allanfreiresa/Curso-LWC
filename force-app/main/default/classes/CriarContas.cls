public with sharing class CriarContas {

    @AuraEnabled
    public static void criarConta(Account conta){
        
        Account acc = new Account();
        acc.Name = (String) conta.get('Name');
        acc.Phone = (String) conta.get('phone');
        acc.NumberOfEmployees = Integer.valueOf(conta.get('numberOfEmployees'));
        insert acc;
    }

    @AuraEnabled
    public static void criarContas(List<Account> contas){
        List<Account> lstContas = new List<Account>();

        for(Account c : contas){
            Account acc = new Account();
            acc.Name = (String) c.get('name');
            acc.Idade__c = (Decimal) c.get('Idade__c');
            lstContas.add(acc);
        }
        insert lstContas;
    }
}