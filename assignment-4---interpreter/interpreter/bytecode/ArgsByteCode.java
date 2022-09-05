package interpreter.bytecode;

import interpreter.VirtualMachine;

public class ArgsByteCode extends ByteCode {
    private int count;
    private String byteCode;

    @Override
    public void init(String[] args){
        this.byteCode = args[0];
        this.count = Integer.parseInt(args[1]);
    }

    @Override
    public String getString(){
        return byteCode + " " + count;
    }

    @Override
    public String getByteCode(){
        return byteCode;
    }
    @Override
    public void execute(VirtualMachine vm){
        vm.RSnewFrame(count);
    }


}