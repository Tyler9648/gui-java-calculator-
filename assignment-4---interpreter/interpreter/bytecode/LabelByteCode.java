package interpreter.bytecode;

import interpreter.VirtualMachine;

public class LabelByteCode extends ByteCode {
    private int lineNo;
    private String byteCode;
    private String arg;

    @Override
    public void init(String[] args){
        this.byteCode = args[0];
        this.arg = args[1];
    }
    @Override
    public void setAddress(int n){
        this.lineNo = n;
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
    public String getArg(){
        return arg;
    }

    @Override
    public void execute(VirtualMachine vm){
    }


}