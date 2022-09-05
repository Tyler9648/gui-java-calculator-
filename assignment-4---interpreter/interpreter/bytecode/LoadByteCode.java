package interpreter.bytecode;

import interpreter.VirtualMachine;

public class LoadByteCode extends ByteCode {
    private String byteCode, arg2;
    private int arg1;

    @Override
    public void init(String[] args){
        this.byteCode = args[0];
        this.arg1 = Integer.parseInt(args[1]);
        if(args.length == 3){
            arg2 = args[2];
        }
    }

    @Override
    public String getString(){
        return byteCode + " " + arg1 + " " + arg2 + "\t\t\t<load " + arg2 + ">";
    }

    @Override
    public String getByteCode(){
        return byteCode;
    }



    @Override
    public void execute(VirtualMachine vm){
        vm.RSload(arg1);
    }


}