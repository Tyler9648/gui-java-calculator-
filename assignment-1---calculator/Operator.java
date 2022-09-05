import java.util.HashMap;
interface opInterface{
    static final HashMap operators = new HashMap();
    //HashMap declared in interface
}
public abstract class Operator implements opInterface {

    //HashMap of all Operator subclasses intitialized
    static HashMap<String, Operator> operators = new HashMap<String, Operator>();
      static{
          operators.put("+", new AdditionOperator() );
      operators.put("-", new SubstractionOperator() );
      operators.put("*", new MultiplicationOperator() );
      operators.put("/", new DivisionOperator() );
      operators.put("^", new PowerOperator() );
      operators.put("(", new OpenCurlyOperator() );
      operators.put(")", new ClosedCurlyOperator() );
      }


    //Abstract methods
  public abstract int priority();
  public abstract Operand execute( Operand op1, Operand op2 );

    //Checks if token is an operator
  public static boolean check( String token ) {
     return operators.containsKey(token);
  }
    //Returns operator subclass object from HashMap
  public static Operator getOp(String token) {
      return (Operator) operators.get(token);
  }


}
