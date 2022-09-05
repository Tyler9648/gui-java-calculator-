package interpreter.bytecode;

import interpreter.VirtualMachine;

public class PopByteCode extends ByteCode {
    private int lineNo = 0;
    private String byteCode;
    private String arg;

    @Override
    public void init(String[] args){
        this.byteCode = args[0];
        this.arg = args[1];
        this.lineNo = Integer.parseInt(this.arg);
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
        for(int i = 0; i < this.lineNo; i++){
            vm.RSpop();
        }
    }


}