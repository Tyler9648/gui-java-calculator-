package ast;

import visitor.*;

public class SwitchBlockTree extends AST {

    public SwitchBlockTree() {
    }

    public Object accept(ASTVisitor v) {
        return v.visitSwitchBlockTree(this);
    }

}

