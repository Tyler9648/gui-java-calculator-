package interpreter.bytecode;

import interpreter.VirtualMachine;

public class LitByteCode extends ByteCode {
    private int lineNo;
    private String byteCode;
    private int arg1;
    private String arg2;

    @Override
    public void init(String[] args){
        this.byteCode = args[0];
        this.arg1 = Integer.parseInt(args[1]);
        if(args.length == 3){
            arg2 = args[2];
        }
    }
    @Override
    public void setAddress(int n){
        this.lineNo = n;
    }

    @Override
    public String getString(){
        if(arg2 != null){
        return byteCode + " " + arg1 + " " + arg2 + "\t\t\t\tint" + arg2;
        } else {
            return byteCode + " " + arg1;
        }

    }

    @Override
    public String getByteCode(){
        return byteCode;
    }


    @Override
    public void execute(VirtualMachine vm){
        vm.RSpush(arg1);
    }


}