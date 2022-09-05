package lexer;
import java.util.*;

/**
 *  The Lexer class is responsible for scanning the source file
 *  which is a stream of characters and returning a stream of
 *  tokens; each token object will contain the string (or access
 *  to the string) that describes the token along with an
 *  indication of its location in the source program to be used
 *  for error reporting; we are tracking line numbers; white spaces
 *  are space, tab, newlines
 */
public class Lexer {
  public boolean atEOF = false;
  // next character to process
  private char ch;
  private SourceReader source;

  // positions in line of current token
  private int startPosition, endPosition;

  /**
   *  Lexer constructor
   * @param sourceFile is the name of the File to read the program source from
   */
  public Lexer( String sourceFile ) throws Exception {
    // init token table
    new TokenType();
    source = new SourceReader( sourceFile );
    ch = source.read();
  }

  public Vector<String> getProgramVector(){
    return source.program;
  }

  public boolean utfLitCheck(String utfString){
    int currentIndex = utfString.length() - 1;
    int choice = currentIndex % 6;
    if(choice >= 2){ choice = 2;}
    char currentChar = utfString.charAt(currentIndex);
    boolean result = false;

    switch(choice){
      case 0:
        if(currentChar == '\\'){
          result = true;
        } else { result = false; }
        break;
      case 1:
        if(currentChar == 'u'){
          result = true;
        } else { result = false; }
        break;
      case 2:
        if((String.valueOf(currentChar)).matches("[0-9a-fA-F]")){
          result = true;
        } else { result = false; }
        break;
    }
    return result;
  }

  public boolean timestampLitCheck(String timestampString){
    int choice = 0;
    int length = timestampString.length();
    char current = timestampString.charAt(length - 1);
    if(!Character.isDigit(current) && current != '~' && current != ':'){
      return false;
    }

    if(length == 5 || length == 8 || length == 11){ //if ~
      choice = 1;
    } else if(length == 6 || length == 9 || length == 12 || length == 15 || length == 18){ //if first digit of month/day/hour/min/second
      choice = 2;
    } else if(length == 7){                     //if second digit of month
      choice = 3;
    } else if(length == 10){                     //if second digit of days
      choice = 4;
    } else if(length == 13){                     //if second digit of hours
      choice = 5;
    } else if(length == 14 || length == 17){     //if " : " is present in proper locations
      choice = 6;
    } else if(length == 16 || length == 19){                     //if second digit of minutes and seconds
      choice = 7;
    }
    switch(choice){
      case 1:
        if(current == '~') {
          return true;
        }
        break;
      case 2:
        if(Character.isDigit(current)){
          return true; }
        break;
      case 3:
        if(  Integer.valueOf(timestampString.substring(length-2)) <= 12 &&  Integer.valueOf(timestampString.substring(length-2)) >= 1) {
          return true;
        }
        break;
      case 4:
        if(  Integer.valueOf(timestampString.substring(length-2)) <= 31 &&  Integer.valueOf(timestampString.substring(length-2)) >= 1) {
          return true;
        }
        break;

      case 5:
        if(  Integer.valueOf(timestampString.substring(length-2)) <= 23 &&  Integer.valueOf(timestampString.substring(length-2)) >= 0) {
          return true;
        }
        break;

      case 6:
        if(current == ':') {
          return true;
        }
        break;

      case 7:
        if(  Integer.valueOf(timestampString.substring(length-2)) <= 59 &&  Integer.valueOf(timestampString.substring(length-2)) >= 0) {
          return true;
        }
        break;


    }
    return false;
  }
  /**
   *  newIdTokens are either ids or reserved words; new id's will be inserted
   *  in the symbol table with an indication that they are id's
   *  @param id is the String just scanned - it's either an id or reserved word
   *  @param startPosition is the column in the source file where the token begins
   *  @param endPosition is the column in the source file where the token ends
   *  @return the Token; either an id or one for the reserved words
   */
  public Token newIdToken( String id, int startPosition, int endPosition) {
    return new Token(
      startPosition,
      endPosition,
      Symbol.symbol( id, Tokens.Identifier ),
      source.getLineno()
    );
  }

  public Token newUtfToken(String id, int startPosition, int endPosition){
    return new Token(
      startPosition,
      endPosition,
      Symbol.symbol( id, Tokens.Utf16StringLit ),
      source.getLineno()
    );
  }

  public Token newUtfTokenType(String id, int startPosition, int endPosition){
    return new Token(
            startPosition,
            endPosition,
            Symbol.symbol( id, Tokens.Utf16String ),
            source.getLineno()
    );
  }

  public Token newTimestampToken(String id, int startPosition, int endPosition){
    return new Token(
            startPosition,
            endPosition,
            Symbol.symbol( id, Tokens.TimestampLit ),
            source.getLineno()
    );
  }
  /**
   *  number tokens are inserted in the symbol table; we don't convert the
   *  numeric strings to numbers until we load the bytecodes for interpreting;
   *  this ensures that any machine numeric dependencies are deferred
   *  until we actually run the program; i.e. the numeric constraints of the
   *  hardware used to compile the source program are not used
   *  @param number is the int String just scanned
   *  @param startPosition is the column in the source file where the int begins
   *  @param endPosition is the column in the source file where the int ends
   *  @return the int Token
   */
  public Token newNumberToken( String number, int startPosition, int endPosition) {
    return new Token(
      startPosition,
      endPosition,
      Symbol.symbol( number, Tokens.INTeger ),
      source.getLineno()
    );
  }

  /**
   *  build the token for operators (+ -) or separators (parens, braces)
   *  filter out comments which begin with two slashes
   *  @param s is the String representing the token
   *  @param startPosition is the column in the source file where the token begins
   *  @param endPosition is the column in the source file where the token ends
   *  @return the Token just found
   */
  public Token makeToken( String s, int startPosition, int endPosition ) {
    // filter comments
    if( s.equals("//") ) {
      try {
        int oldLine = source.getLineno();

        do {
          ch = source.read();
        } while( oldLine == source.getLineno() );
      } catch (Exception e) {
        atEOF = true;
      }

      return nextToken();
    }

    // ensure it's a valid token
    Symbol sym = Symbol.symbol( s, Tokens.BogusToken );

    if( sym == null ) {
      System.out.println( "******** illegal character: " + s.charAt(s.length()-1) );
      atEOF = true;
      return nextToken();
    }

    return new Token( startPosition, endPosition, sym, source.getLineno());
  }

  /**
   *  @return the next Token found in the source file
   */
  public Token nextToken() {
    // ch is always the next char to process
    if( atEOF ) {
      if( source != null ) {
        source.close();
        source = null;
      }

      return null;
    }

    try {
      // scan past whitespace
      while( Character.isWhitespace( ch )) {
        ch = source.read();
      }
    } catch( Exception e ) {
      atEOF = true;
      return nextToken();
    }

    startPosition = source.getPosition();
    endPosition = startPosition - 1;

    if( Character.isJavaIdentifierStart( ch )) {
      // return tokens for ids and reserved words
      String id = "";

      try {
        do {
          endPosition++;
          id += ch;
          ch = source.read();
        } while( Character.isJavaIdentifierPart( ch ));
      } catch( Exception e ) {
        atEOF = true;
      }


      if(id.equalsIgnoreCase("utf16string")){
       return newUtfTokenType(id, startPosition, endPosition);
      } else {


      return newIdToken( id, startPosition, endPosition );
      }
    }

    if( Character.isDigit( ch )) {
      // return number tokens
      String number = "";

      try {
        do {
          endPosition++;
          number += ch;
          ch = source.read();
        } while( Character.isDigit( ch ));
      } catch( Exception e ) {
        atEOF = true;
      }

      if(number.length() == 4 && ch == '~'){ //checks for timestamp
        try {
          do {
            endPosition++;
            number += ch;
            ch = source.read();
          } while( timestampLitCheck( number ) && number.length() < 19);
        } catch( Exception e ) {
          atEOF = true;
        }

        if(number.length() == 19 && timestampLitCheck(number)){
          return newTimestampToken(number, startPosition, endPosition);
        }

      }
      try {
        int d = Integer.parseInt(number);
      } catch (NumberFormatException nfe) {
        return makeToken(number, startPosition, endPosition);
      }
      return newNumberToken( number, startPosition, endPosition );


    }


    if( ch == '\\') {
      // return utf tokens
      String utfLit = "";
      String utfNoSpace = utfLit;
      try {
        do {
          endPosition++;

          utfLit += ch;
          if(ch != ' '){
            utfNoSpace += ch;
          }
          ch = source.read();
          //System.out.println(utfLitCheck(utfNoSpace) + " " + utfNoSpace.charAt(utfNoSpace.length()-1));
          //utfLit = utfLit.replaceAll(" ", "");
        } while( utfLitCheck(utfNoSpace) && (utfNoSpace.length() <= 23)); } catch( Exception e ) {
        atEOF = true;
      }

      if(utfNoSpace.length() == 24){

        if((utfNoSpace.substring(0, 11)).equalsIgnoreCase(utfNoSpace.substring(12, 23))){

          return newUtfToken( utfLit, startPosition, endPosition );  //Valid UTF lit string
        }} else {

        System.out.println("******** illegal character: " + utfLit.charAt(utfLit.length() - 1));
        atEOF = true;
        return nextToken(); //Invalid UTF lit string
      }






    }





    // At this point the only tokens to check for are one or two
    // characters; we must also check for comments that begin with
    // 2 slashes
    String charOld = "" + ch;
    String op = charOld;
    Symbol sym;
    try {
      endPosition++;
      ch = source.read();
      op += ch;

      // check if valid 2 char operator; if it's not in the symbol
      // table then don't insert it since we really have a one char
      // token
      sym = Symbol.symbol( op, Tokens.BogusToken );
      if (sym == null) {
        // it must be a one char token
        return makeToken( charOld, startPosition, endPosition );
      }

      endPosition++;
      ch = source.read();

      return makeToken( op, startPosition, endPosition );
    } catch( Exception e ) { /* no-op */ }

    atEOF = true;
    if( startPosition == endPosition ) {
      op = charOld;
    }

    return makeToken( op, startPosition, endPosition );
  }

/*
   public static void main(String args[]) {
    Token token;

    if (args.length != 1) {
      System.out.println("usage: java lexer.Lexer filename.x");

    } else {

      Vector<String> printCode = new Vector<String>();

      try {
        Lexer lex = new Lexer(args[0]);


        while (!lex.atEOF) {

          token = lex.nextToken();
          String p = "";
          String part1;
          String part2;
          String part3 = "";
          String part4;
          String part5 = "";
          String part6;
          String part7 = "";
          String part8 = "";


          if ((token.getKind() == Tokens.Identifier) || (token.getKind() == Tokens.INTeger) ||
                  (token.getKind() == Tokens.Utf16StringLit) || (token.getKind() == Tokens.TimestampLit)) {
            p += token.toString();
            part1 = token.toString();
          } else {
            p += TokenType.tokens.get(token.getKind()).toString();
            part1 = token.toString();
          }
          part2 = "Left: ";
          part3 += token.getLeftPosition();
          part4 = " Right: ";
          part5 += token.getRightPosition();
          part6 = " Line: ";
          part7 += lex.source.getLineno() + " ";
          part8 += token.getKind();

          p += " Left: " + token.getLeftPosition() +
                  " Right: " + token.getRightPosition() +
                  " Line: " + lex.source.getLineno() + "   " +
                  //TokenType.tokens.get(token.getKind()) + " ";
                  token.getKind() + " ";


          printCode = lex.source.program;
          //System.out.println(p);
          System.out.printf("%-11s %-8s %-2s %-8s %-2s %-8s %-2s %-8s %n", part1, part2, part3, part4, part5, part6, part7, part8);
          //lex.source.printProgram();

        }

      } catch (Exception e) {
        System.out.println("\n");
        for (int i = 0; i < printCode.size(); i++) {  //prints out file contents
        System.out.println(printCode.get(i));
        }

      }
    }
  } */
}