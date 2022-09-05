package visitor;

import ast.*;
import java.util.*;

public class OffsetVisitor extends ASTVisitor {

    private int depth = 0;
    private int maxDepth = 100;
    private int[] nCount = new int[100];
    private int[] currentOffset = new int[100];


    private HashMap<AST, Integer> integerOffset = new HashMap<>();


    private void offset( AST t ) {

        if (depth > maxDepth) {
            maxDepth = depth;
        }
        integerOffset.put(t, currentOffset[depth]);
        currentOffset[depth] += 2; //horizontal offset is 2

        for( AST kid : t.getKids()){
        depth++;        //vertical offset is 1
        offset(kid);    //recursively gets offset
        depth--;
        }

        if(t.kidCount() != 0){
            AST leftChild = t.getKid(1);
            AST rightChild = t.getKid(t.kidCount());
            int parentOffset = (integerOffset.get(leftChild) + integerOffset.get(rightChild)
            ) /2;
            if (integerOffset.get(t) != null){
                if(parentOffset > integerOffset.get(t)){ //if kids mean offset > actual offset,
                    integerOffset.put(t, parentOffset);   //then set mean offset as actual offset
                    currentOffset[depth] = integerOffset.get(t) + 2; //increment horizontal offset of that depth by 2

                } else if (parentOffset < integerOffset.get(t)){ //if kids mean offset < actual offset,
                    int offsetDiff = integerOffset.get(t) - parentOffset;
                    adjust(t, offsetDiff); //increase offset of kids
                }
            }
        }
    }

    private void adjust(AST t, int offsetCount){ //adjusts kids by increasing offset
        if (t.kidCount() == 0){ return; }        //so parent offset is in the middle of kids
        if (integerOffset.get(t) != null){
            for( AST t1 : t.getKids()) {
            integerOffset.put(t1, integerOffset.get(t1) + offsetCount);
            }
            currentOffset[depth + 1] = integerOffset.get(t.getKid(t.kidCount())) + 2;

            for( AST kid : t.getKids()) { //recursively adjusts kids
                depth++;
                adjust(kid, offsetCount);
                depth--;
            }
        }
    }

    public HashMap<AST, Integer> getOffset() {
        return integerOffset;
    }

    public int maxOffset(){
        int max = 0;
        for(int i: currentOffset){
            if(i > max){
                max = i;
            }
        }
        return max;
    }


    public Object visitProgramTree(AST t) { offset(t); return null; }
    public Object visitBlockTree(AST t) { offset(t); return null; }
    public Object visitFunctionDeclTree(AST t) { offset(t); return null; }
    public Object visitCallTree(AST t) { offset(t) ; return null; }
    public Object visitDeclTree(AST t) { offset(t) ; return null; }
    public Object visitIntTypeTree(AST t) { offset(t) ; return null; }
    public Object visitNumberTypeTree(AST t) { offset(t) ; return null; }
    public Object visitScientificTypeTree(AST t) { offset(t) ; return null; }
    public Object visitFloatTypeTree(AST t) { offset(t) ; return null; }
    public Object visitVoidTypeTree(AST t) { offset(t) ; return null; }
    public Object visitBoolTypeTree(AST t) { offset(t) ; return null; }
    public Object visitFormalsTree(AST t) { offset(t) ; return null; }
    public Object visitActualArgsTree(AST t) { offset(t) ; return null; }
    public Object visitIfTree(AST t) { offset(t) ; return null; }
    public Object visitWhileTree(AST t) { offset(t) ; return null; }
    public Object visitForTree(AST t) { offset(t) ; return null; }
    public Object visitReturnTree(AST t) { offset(t) ; return null; }
    public Object visitAssignTree(AST t) { offset(t) ; return null; }
    public Object visitIntTree(AST t) { offset(t) ; return null; }
    public Object visitNumberTree(AST t) { offset(t) ; return null; }
    public Object visitScientificTree(AST t) { offset(t) ; return null; }
    public Object visitFloatTree(AST t) { offset(t) ; return null; }
    public Object visitVoidTree(AST t) { offset(t) ; return null; }
    public Object visitIdTree(AST t) { offset(t) ; return null; }
    public Object visitRelOpTree(AST t) { offset(t) ; return null; }
    public Object visitAddOpTree(AST t) { offset(t) ; return null; }
    public Object visitMultOpTree(AST t) { offset(t) ; return null; }

    // new methods here
    public Object visitStringTypeTree(AST t) { offset(t) ; return null; }
    public Object visitCharTypeTree(AST t) { offset(t) ; return null; }
    public Object visitStringTree(AST t) { offset(t) ; return null; }
    public Object visitCharTree(AST t) { offset(t) ; return null; }
    public Object visitUnlessTree(AST t) { offset(t) ; return null; }
    public Object visitSwitchTree(AST t) { offset(t) ; return null; }
    public Object visitSwitchBlockTree(AST t) { offset(t) ; return null; }

    public Object visitCaseTree(AST t) { offset(t) ; return null; }
    public Object visitUtf16StringTree(AST t) { offset(t) ; return null; }
    public Object visitUtf16StringLitTree(AST t) { offset(t) ; return null; }
    public Object visitTimestampTypeTree(AST t) { offset(t) ; return null; }
    public Object visitTimestampLitTree(AST t) { offset(t) ; return null; }
    public Object visitDefaultTree(AST t) { offset(t) ; return null; }

}