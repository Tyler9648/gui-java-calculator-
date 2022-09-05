class ClosedCurlyOperator extends Operator {
    @Override
    public Operand execute( Operand op1, Operand op2 ){ //Does nothing when called
        return null;
    }
    @Override
    public int priority(){
        return -1;
    }//Returns priority, diff from OpenCurlyOperator












}