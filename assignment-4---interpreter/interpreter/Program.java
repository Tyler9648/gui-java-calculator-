package interpreter;

import interpreter.bytecode.*;
import java.util.*;
import java.lang.*;

public class Program {
  private static HashMap<Integer, String[]> fileMap = new HashMap<>();
  private static Vector<ByteCode> bcVec = new Vector<>();
  private static HashMap<String, Integer> addressMap = new HashMap<>();

  public static void init(HashMap<Integer, String[]> programMap){ //intialize fileMap
    for(int i = 1; i <= programMap.size(); i++){

      String inByteCode = "interpreter.bytecode." + CodeTable.get(programMap.get(i)[0]);
      try {
        ByteCode code = (ByteCode) (Class.forName(inByteCode).getDeclaredConstructor().newInstance());

        bcVec.add(code);

        if(inByteCode.equals("interpreter.bytecode.LabelByteCode")){
          code.setAddress(i);



        }

      code.init(programMap.get(i));
      fileMap.put(i, programMap.get(i));


      } catch (Exception e){
        System.out.println("Error with " + inByteCode);
        e.printStackTrace();
      }
    }

    for(int i = 0; i < bcVec.size(); i++){  //update addressMap for Labels
      String bcString = bcVec.get(i).getByteCode(); //Label addresses must be put first before
                                                    //Falsebranch, Call, and GoTo addresses
      if(bcString.equals("LABEL")){
        addressMap.put(bcVec.get(i).getArg(), i);
      }

    }
    for(int i = 0; i < bcVec.size(); i++){  //setAddress of Call, FalseBranch, and GoTo bytecodes
      String bcString = bcVec.get(i).getByteCode(); //from addressMap HashMap


      if(bcString.equals("CALL") || bcString.equals("FALSEBRANCH") || bcString.equals("GOTO")){
        bcVec.get(i).setAddress( addressMap.get( bcVec.get(i).getArg() ) );
      }
    }

  }

  public static ByteCode getCode(int programCounter) {
    return bcVec.get(programCounter);
  } //return current line of code being read
  public static int getSize(){
    return bcVec.size();
  } //return num of byteCode objects

}