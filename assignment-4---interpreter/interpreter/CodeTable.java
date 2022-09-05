package interpreter;

import java.util.*;

public class CodeTable {

  private static HashMap<String, String> byteMap = new HashMap<>();

  public static void init () { //initialize HashMap for byteCode names to their class name
    byteMap.put("ARGS", "ArgsByteCode");
    byteMap.put("BOP", "BopByteCode");
    byteMap.put("CALL", "CallByteCode");
    byteMap.put("DUMP", "DumpByteCode");
    byteMap.put("FALSEBRANCH", "FalseBranchByteCode");
    byteMap.put("GOTO", "GoToByteCode");
    byteMap.put("HALT", "HaltByteCode");
    byteMap.put("LABEL", "LabelByteCode");
    byteMap.put("LIT", "LitByteCode");
    byteMap.put("LOAD", "LoadByteCode");
    byteMap.put("POP", "PopByteCode");
    byteMap.put("READ", "ReadByteCode");
    byteMap.put("RETURN", "ReturnByteCode");
    byteMap.put("STORE", "StoreByteCode");
    byteMap.put("WRITE", "WriteByteCode");
  }

  public static String get(String code) {
    return byteMap.get(code);
  }
}