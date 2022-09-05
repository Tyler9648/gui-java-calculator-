package interpreter.bytecode;

import interpreter.VirtualMachine;

public class DumpByteCode extends ByteCode {
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
    public String getByteCode(){
        return byteCode;
    }

    @Override
    public void execute(VirtualMachine vm){
        switch(this.arg){
            case "ON":
                vm.setDump(true);
                break;
            case "OFF":
                vm.setDump(false);
                break;
        }
    }


}