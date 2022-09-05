package ast;

import visitor.*;

public class CaseTree extends AST {

    public CaseTree() {
    }

    public Object accept(ASTVisitor v) {
        return v.visitCaseTree(this);
    }
}

