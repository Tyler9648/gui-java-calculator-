
class MultiplicationOperator extends Operator {

    public Operand execute( Operand op1, Operand op2 ){ //Returns op1 * op2
        int num = op1.getValue() * op2.getValue();
        Operand op3 = new Operand( num );
        return op3;
    }

    public int priority(){
        return 3;
    } //Returns priority












}