package ast;

import visitor.*;

public class TimestampTypeTree extends AST {

    public TimestampTypeTree() {
    }

    public Object accept(ASTVisitor v) {
        return v.visitTimestampTypeTree(this);
    }

}

