package interpreter.bytecode;

import interpreter.VirtualMachine;

public class BopByteCode extends ByteCode {
    private String byteCode;
    private String operator;

    @Override
    public void init(String[] args){
        this.byteCode = args[0];
        this.operator = args[1];
    }

    @Override
    public String getString(){
        return byteCode + " " + operator;
    }

    @Override
    public String getByteCode(){
        return byteCode;
    }
    @Override
    public void execute(VirtualMachine vm){
        int upper = vm.RSpop();
        int lower = vm.RSpop();
        switch(this.operator){
            case "+":
                vm.RSpush(upper + lower);
                break;
            case "-":
                vm.RSpush(lower - upper);
                break;
            case "*":
                vm.RSpush(lower * upper);
                break;
            case "/":
                vm.RSpush(lower / upper);
                break;
            case "==":
                if(upper == lower){
                    vm.RSpush(1);
                } else {
                    vm.RSpush(0);
                }
                break;
            case "!=":
                if(upper == lower){
                    vm.RSpush(0);
                } else {
                    vm.RSpush(1);
                }
                break;
            case "<":
                if(upper < lower){
                    vm.RSpush(1);
                } else {
                    vm.RSpush(0);
                }
                break;
            case ">":
                if(upper > lower){
                    vm.RSpush(1);
                } else {
                    vm.RSpush(0);
                }
                break;
            case "<=":
                if(upper <= lower){
                    vm.RSpush(1);
                } else {
                    vm.RSpush(0);
                }
                break;
            case ">=":
                if(upper >= lower){
                    vm.RSpush(1);
                } else {
                    vm.RSpush(0);
                }
                break;
            case "|":
                if(upper == 1 || lower == 1){
                    vm.RSpush(1);
                } else {
                    vm.RSpush(0);
                }
                break;
            case "&":
                if(upper == 1 && lower == 1){
                    vm.RSpush(1);
                } else {
                    vm.RSpush(0);
                }
                break;
        }
    }


}