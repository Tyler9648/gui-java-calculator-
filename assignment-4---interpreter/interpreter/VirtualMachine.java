/**
 * DO NOT provide a method that returns components contained WITHIN the VM (this 
 * is the exact situation that will break encapsulation) - you should request 
 * that the VM performs operations on its components. This implies that the VM 
 * owns the components and is free to change them, as needed, without breaking 
 * clients' code (e.g., suppose I decide to change the name of the variable that 
 * holds my runtime stack - if your code had referenced that variable then your 
 * code would break. This is not an unusual situation - you can consider the 
 * names of methods in the Java libraries that have been deprecated).
 * 
 * Consider that the VM calls the individual ByteCodes' execute method and 
 * passes itself as a parameter. For the ByteCode to execute, it must invoke 
 * one or more methods in the runStack. It can do this by executing 
 * VM.runStack.pop(); however, this does break encapsulation. To avoid this, 
 * you'll need to have a corresponding set of methods within the VM that do 
 * nothing more than pass the call to the runStack. e.g., you would want to 
 * define a VM method:
 *     public int popRunStack() {
 *       return runStack.pop();
 *     }
 * called by, e.g.,
 *     int temp = VM.popRunStack();
 */
package interpreter;

import java.util.Stack;
import interpreter.bytecode.*;

public class VirtualMachine {

  private int pc;
  private RunTimeStack runTimeStack = new RunTimeStack();
  // This may not be the right parameterized type!!
  private Stack<Integer> returnAddresses;  //return addresses
  private boolean isRunning; // if program is still running
  private Program program;
  private boolean dump = false;

  public VirtualMachine(Program program) {
    this.program = program;
  }

  public void executeProgram() {  //execute code from Program instance
    pc = 0;
    returnAddresses = new Stack<Integer>();
    isRunning = true;

    while (isRunning) {
      ByteCode code = Program.getCode(pc);

      if( code.getByteCode() == "STORE"){
        code.setAddress(RSpeek());
      }
      code.execute(this);



      if (dump) {
        System.out.println(code.getString());
        System.out.println(runTimeStack.dump());
      }

      // runStack.dump(); // check that the operation is correct
      pc++;

      if (pc >= Program.getSize()-1) {
        isRunning = false;

      }
    }
  }
  public void setPC(int n){ pc = n; } //set program counter
  public void RSnewFrame(int n){ runTimeStack.newFrameAt(n);} //runstack new/push frame
  public int getReturnAddress(){return returnAddresses.pop();} //get top return address
  public void haltProgram(){isRunning = false;} //halt
   public void RSload(int n){runTimeStack.load(n); } //load value into n offset of runstack
  public void RSstore(int n){runTimeStack.store(n); } //store value into n offset of runstack
  public int RSpop(){return runTimeStack.pop();} //pop and return val of runstack
  public void RSpopFramePointers(){runTimeStack.popFrame();} //remove top frame
  public void RSpush(int n){runTimeStack.push(n);} //runstack push val
  public void RSpush(Integer n){runTimeStack.push(n);}//runstack push val for Integer
  public void pcSave(){returnAddresses.add(pc);} //add a return address
  public void setDump(boolean n){this.dump = n;} //DUMP ON or DUMP OFF
  public void pcSet(int n){pc = n;} //set program counter
  public int RSpeek(){return runTimeStack.peek();} //return top of runtime stack
}