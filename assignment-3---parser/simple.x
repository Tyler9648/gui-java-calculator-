program { int i int j
   i = i + j + 7
   j = write(i)
 switch( i ){

 case [1]# :
 j = i

 case [2, 3]# :
 i = 3

 default # :
 i = 6

 }

}