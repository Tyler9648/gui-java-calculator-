package interpreter;

import interpreter.bytecode.*;
import java.io.IOException;
import java.io.File;
import java.util.*;
import java.lang.*;

public class ByteCodeLoader {
  private Scanner in; //input
  private HashMap<Integer, String[]> programMap = new HashMap<>();
  private int lineNo;

  public ByteCodeLoader(String byteCodeFile) throws IOException{
  File file = new File(byteCodeFile);
  in = new Scanner(file);
  }

  public Program loadCodes() {
    lineNo = 0;
    while(in.hasNext()){ //stores string array of each line in byteCodeFile into programMap
      lineNo++;          //with respective line number
      String nextLine = in.nextLine();
      String splitLine[] = nextLine.split("\\s+");
      programMap.put(lineNo, splitLine);
    }

    Program p = new Program();
    Program.init(programMap); //intialize Program class
    return p;
  }
}