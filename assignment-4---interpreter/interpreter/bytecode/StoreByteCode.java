package interpreter.bytecode;

import interpreter.VirtualMachine;

public class StoreByteCode extends ByteCode {
    private int val, val2;
    private String byteCode, arg1, arg2;


    @Override
    public void init(String[] args){
        this.byteCode = args[0];
        this.arg1 = args[1];
        this.val = Integer.parseInt(this.arg1);
        if(args.length == 3){
            this.arg2 = args[2];
        }
    }

    @Override
    public String getString(){
        return byteCode + " " + arg1 + " " + arg2 + "\t\t\t\t" + arg2 + " = " + val2;
    }

    @Override
    public String getByteCode(){
        return byteCode;
    }

    @Override
    public void setAddress(int n){ val2 = n; }

    @Override
    public void execute(VirtualMachine vm){
        vm.RSstore(val);
    }


}