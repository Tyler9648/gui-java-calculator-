

import java.util.*;


public class Evaluator  {
  private Stack<Operand> operandStack;
  private Stack<Operator> operatorStack;

  private StringTokenizer tokenizer;
  private static final String DELIMITERS = "+-*^/() ";

  public Evaluator() {
    operandStack = new Stack<>();
    operatorStack = new Stack<>();
  }

  public int eval( String expression ) {
    String token;

    // The 3rd argument is true to indicate that the delimiters should be used
    // as tokens, too. But, we'll need to remember to filter out spaces.
    this.tokenizer = new StringTokenizer( expression, DELIMITERS, true );

    while ( this.tokenizer.hasMoreTokens() ) {
      // filter out spaces
      if ( !( token = this.tokenizer.nextToken() ).equals( " " )) {
        // check if token is an operand
        //System.out.println("Checking if Operand");
        if ( Operand.check( token )) {
          operandStack.push( new Operand( token ));
        }
        else {
          if ( ! Operator.check( token )) {          //if token isnt an operator, exit
            System.out.println( "*****invalid token******" );
            System.exit( 1 );
          }




          Operator newOperator = Operator.getOp(token);
          //create token

            if(operatorStack.isEmpty()){      //if there are no Operators, push Operator to stack
              operatorStack.push( newOperator );
            }

            else if(newOperator.priority() == 1){ //if newOperator is "(", push it
              operatorStack.push(newOperator);
            }

            else if(newOperator.priority() == -1){  //if newOperator is ")", process all Operators inside then pop remaining parenthesis
              while (operatorStack.peek().priority() != 1){
                evalExecute(operatorStack.pop());
              }
              operatorStack.pop();
            }

            else {
              while (operatorStack.peek().priority() >= newOperator.priority()) {
                // note that when we eval the expression 1 - 2 we will
                // push the 1 then the 2 and then do the subtraction operation
                // This means that the first number to be popped is the
                // second operand, not the first operand - see the following code
                evalExecute(operatorStack.pop());
              }
              operatorStack.push(newOperator); //push newOperator
            }


        }
      }
    }

//Processes operators until
//operator stack is empty

    while (!operatorStack.isEmpty()){
      evalExecute(operatorStack.pop());
    }



//Returns the final answer
    return operandStack.pop().getValue();
  }
  private void evalExecute(Operator oldOpr){ // Method that proccesses an operator each time it's called
    Operand op2 = operandStack.pop();
    Operand op1 = operandStack.pop();
    operandStack.push(oldOpr.execute(op1, op2));

  }
}
