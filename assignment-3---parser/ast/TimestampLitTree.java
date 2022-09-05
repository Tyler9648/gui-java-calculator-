package ast;

import lexer.Symbol;
import lexer.Token;
import visitor.*;

public class TimestampLitTree extends AST {
    private Symbol symbol;

    public TimestampLitTree(Token tok) { this.symbol = tok.getSymbol();
    }

    public Object accept(ASTVisitor v) {
        return v.visitTimestampLitTree(this);
    }

    public Symbol getSymbol() {
        return symbol;
    }

}

