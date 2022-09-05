package interpreter.bytecode;

import java.util.Scanner;
import interpreter.VirtualMachine;

public class ReadByteCode extends ByteCode {
    private String byteCode;
    @Override
    public void init(String[] args){
        this.byteCode = args[0];
    }

    @Override
    public String getString(){
        return byteCode;
    }

    @Override
    public String getByteCode(){
        return byteCode;
    }


    @Override
    public void execute(VirtualMachine vm){
        System.out.println("Enter an int: ");
        Scanner scnr = new Scanner(System.in);
        int n = scnr.nextInt();
        vm.RSpush(n);
    }


}