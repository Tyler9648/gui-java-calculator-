package interpreter.bytecode;

import interpreter.VirtualMachine;

public class FalseBranchByteCode extends ByteCode {
    private int lineNo;
    private String byteCode;
    private String arg;

    @Override
    public void init(String[] args){
        this.byteCode = args[0];
        this.arg = args[1];
    }

    @Override
    public String getString(){
        return byteCode + " " + arg;
    }

    @Override
    public String getArg(){
        return arg;
    }

    @Override
    public String getByteCode(){
        return byteCode;
    }

    @Override
    public void setAddress(int n){
        this.lineNo = n;
    }

    @Override
    public void execute(VirtualMachine vm){
        if(vm.RSpop() == 0){
            vm.pcSet(lineNo);
        }
    }


}