

public class Operand {
  private int OpValue;

  //If String with num value, then convert String to int and store
  public Operand( String token ) {
  OpValue = Integer.parseInt(token);
  }

  //Store int
  public Operand( int value ) {
  OpValue = value;
  }

  //Return value of operand
  public int getValue() {
  return OpValue;
  }

  public static boolean check( String token ) {
    try {

      int x = Integer.parseInt( token );

    } catch (NumberFormatException e) {
      return false; //String is not an Integer
    }
    return true; //String is an Integer
  }
}
