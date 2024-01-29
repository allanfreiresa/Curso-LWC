public with sharing class ComponentePaiController {

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccount(){
        return new List<Account>([SELECT Id, Name FROM Account LIMIT 2]);
    }

    @AuraEnabled(cacheable=true)
    public static List<Dados> getDadosEmpresas(){
        List<Dados> lstDados = new List<Dados>();

        for(Integer i=1; i<4; i++){

            Dados dado = new Dados();
            dado.id = String.valueOf(i);
            dado.empresa = 'Empresa ' + String.valueOf(i);
            dado.produtos = new List<Produtos>();
            dado.distribuidoras = new List<Distribuidoras>();
            dado.lojas = new List<Lojas>();

            for(Integer j=1; j<3; j++){
                Produtos p = new Produtos();
                p.id = String.valueOf(j);
                p.nome = 'Produto ' + String.valueOf(j);
                dado.produtos.add(p);
            }

            for(Integer j=1; j<3; j++){
                Distribuidoras d = new Distribuidoras();
                d.id = String.valueOf(j);
                d.nome = 'Distribuidoras ' + String.valueOf(j);
                dado.distribuidoras.add(d);
            }

            for(Integer j=1; j<4; j++){
                lojas l = new lojas();
                l.id = String.valueOf(j);
                l.nome = 'Loja ' + String.valueOf(j);
                dado.lojas.add(l);
            }
            lstDados.add(dado);
        }

        return lstDados;
    }

    public class Dados{
        @AuraEnabled public String id;
        @AuraEnabled public String empresa;
        @AuraEnabled public List<Produtos> produtos;
        @AuraEnabled public List<Distribuidoras> distribuidoras;
        @AuraEnabled public List<Lojas> lojas;
    }

    public class Produtos{
        @AuraEnabled public String id;
        @AuraEnabled public String nome;
    }

    public class Distribuidoras{
        @AuraEnabled public String id;
        @AuraEnabled public String nome;
    }

    public class Lojas{
        @AuraEnabled public String id;
        @AuraEnabled public String nome;
    }

}