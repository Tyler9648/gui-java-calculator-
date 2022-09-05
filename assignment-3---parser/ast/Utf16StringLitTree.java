package ast;

import lexer.Symbol;
import lexer.Token;
import visitor.*;

public class Utf16StringLitTree extends AST {
    private Symbol symbol;

    public Utf16StringLitTree(Token tok) { this.symbol = tok.getSymbol();
    }

    public Object accept(ASTVisitor v) {
        return v.visitUtf16StringLitTree(this);
    }

    public Symbol getSymbol() {
        return symbol;
    }


}

