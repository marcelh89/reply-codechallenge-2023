You must plan how to lay out the available S Snakes to cover as many highly relevant components as possible.
You can deploy each snake on the system, represented by a R × C matrix. Each snake is positioned by placing it on a cell and commanding it to slither to an adjacent cell either directly up, down, to the left, or to the right of the one just visited, until the snake reaches its total length. Snakes cannot overlap.

Thanks to the wonders of the metaverse, the boundaries of maps wrap around. For example, if a snake moves out from the grid by crossing the left border, it will magically reappear on the same row of the right border. Similarly, if a snake leaves the map from the upper border, it will reappear on the same column at the bottom border; and so on.
Some cells in the grid don’t represent components, but network switches. These are wormholes where a snake can enter and teleport to any other wormhole in the map. Passing through a wormhole counts as a single move. Multiple snakes can use the same wormhole for both entering and exiting, provided they don’t overlap their bodies before or after teleporting. Please, remember:
• Snakes cannot overlap with other Snakes or with themselves.
• Passing through a wormhole takes only one Snake segment.
• A Snake cannot start from, or end, in a wormhole.
• Multiple snakes can use the same wormhole, as long as they don’t overlap on adjacent non-wormhole cells.
• If the head of a Snake moves beyond the western boundary of the map, it will reappear on the eastern boundary in the same row.
• If the head of a Snake moves beyond the eastern boundary of the map, it will reappear on the western boundary in the same row.
• If the head of a Snake moves beyond the northern boundary of the map, it will reappear on the southern boundary in the same column.
• If the head of the Snake moves beyond the southern boundary of the map, it will reappear on the northern boundary in the same column.
Your total score is the sum of the relevance of the cells covered by your Snakes.
The solution is valid only if the total score is greater than 0.


The input file is a regular ASCII text file. Each line of the input file is separated 
by a single “\n” character (“UNIX-style”). If a line has multiple data, each value 
is separated by a single whitespace character. The first row of the input file 
will have 3 integer numbers: 
•  C, indicating the number of columns of the system grid 
•  R, indicating the number of rows of the system grid 
•  S, indicating the number of Snakes available to the player 
The second row is composed of S integer values, with each one corresponding 
to the length of a Snake. Then, R lines follow, with each one consisting of C 
values. Each value could either be: 
•  Vrc, the value of the relevance of the component in that position 
•  An asterisk (*), representing the presence of a wormhole in that position 




The output file must be a regular ASCII text file. Each line of the output file must be separated by a single “\n”. The i-th line of this file holds the layout of the i-th Snake. Each line consists of:
• two integers, c and r, representing the column and the row in which the head of the Snake is placed initially
• one uppercase letter – ”U”, ”D”, ”L”, ”R” – indicating the Snake slithering one cell up, down, left, or right respectively
• two integers, cw and rw of the wormhole from which the Snake emerges if the Snake enters a wormhole.
All the values on a single line are separated by a single space character.
If, for any reason, you don’t want to use a Snake, simply leave the line empty.

Input is

10 6 5
6 7 5 3 3
1 5 3 6 3 8 5 2 6 8
6 4 * 0 5 3 7 5 2 8
3 4 5 0 3 6 4 * 5 7
3 5 6 3 0 3 5 3 4 6
3 6 7 * 3 0 6 4 5 7
3 7 8 5 3 6 0 4 5 6

