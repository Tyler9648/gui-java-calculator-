package interpreter;

import java.util.Stack;
import java.util.Vector;

public class RunTimeStack {

  private Stack<Integer> framePointers = new Stack<>();
  // This may not be the right parameterized type!!
  private Vector<Integer> runStack = new Vector<>();

  public RunTimeStack() {
  framePointers.push(0);
  }

  /**
   * The purpose of this function is to dump the RunTimeStack for the 
   * purpose of debugging.
   */
  @SuppressWarnings({"rawtypes","unchecked"})
  public String dump() {  //prints out executed code
   StringBuilder dumpS = new StringBuilder();
  Vector<Integer>[] dumpVec = new Vector[framePointers.size()];
  Vector<Integer> runStacktemp = new Vector<Integer>(runStack);

  for(int i = framePointers.size()-1; i >= 0 ; i--){
    dumpVec[i] = new Vector<>();
    int index = framePointers.get(i);
    for(int j = index; j < runStacktemp.size(); j++){
      dumpVec[i].add(runStacktemp.remove(index));
    }
  }
  for(int i = 0; i < framePointers.size(); i++){
    dumpS.append(dumpVec[i].toString());
    System.out.print(dumpVec[i].toString());
  }
return dumpS.toString();
  }

  /**
   * Returns the top item on the runtime stack.
   */
  public int peek() {
    return runStack.lastElement();
  }

  /**
   * Pops the top item from the runtime stack, returning the item.
   */
  public int pop() {
    int i = runStack.lastElement();
    runStack.remove(runStack.size() - 1);
    return i;
  }

  /**
   * Push an item on to the runtime stack, returning the item that was just 
   * pushed.
   */
  public int push(int item) {
    runStack.add(item);
    return item;
  }

  /**
   * This second form with an Integer parameter is used to load literals onto the
   * stack.
   */
  public void push(Integer i){
    runStack.add(i);
   // return i;
  }

  /**
   * Start a new frame, where the parameter offset is the number of slots
   * down from the top of the RunTimeStack for starting the new frame.
   */
  public void newFrameAt(int n) {
    framePointers.push(runStack.size() - n);
  }

  /**
   * We pop the top frame when we return from a function; before popping, the
   * functions’ return value is at the top of the stack so we’ll save the value,
   * pop the top frame, and then push the return value.
   */
  public void popFrame() {
   int returnVal = pop();
   for(int i = framePointers.pop(); i < runStack.size(); i++){
     runStack.remove(i);
   }
  }

  /**
   * Used to store into variables.
   */
  public void store(int n) {
    int temp = pop();

    runStack.add(framePointers.peek() + n, temp);
    if( (framePointers.peek() + n + 1) < runStack.size()){
    runStack.removeElementAt(framePointers.peek() + n + 1);}
  }

  /**
   * Used to load variables onto the stack.
   */
  public void load(int n) {
    if(framePointers.isEmpty()){
      runStack.add(n, runStack.get(n));

    } else {
      n += framePointers.lastElement();
      runStack.add(runStack.get(n));
    }

  }



}