# Midterm

### Phase 1
I decided to build an icon representing my instrument, erhu. I created a draft on Canva whiteboard. The icon is a front view of my instrument resonance box. I first draw a circle as the 'box'. Then, a tiny rectangle acting as the bridge. And two thin and long rectangles actiing as the two strings.

For clarity purpose, I decided to add a border for the circle, which leads to one more circle being used. I decided to create border by layering a white cricle beneath a slightly bigger dark circle. 

![Phase 1](Phase%201.jpeg)

### Phase 2
Phase 2 was straightforward. I began with creating the canvas and added 'noStroke' to disable drawing stroke. Under function draw (), I started creating shapes and testing their coordinates by trial and error in the order of: 1) dark circle), 2) white circle, 3) tiny rectangle, 4+5) 2 thin rectangles. The order matters because it determines the layering of these shapers. The earlier, the more bottom layer the shape will locate. 

The process of trial and error was significantly reduced after the first shape as I began developed more accurate estimation of the coordinates. Also, I was able to calculate some coordinates since my icon is symmetrical. 

### Phase 3 
Following the provided instructions, I was able to play around changing location and size of my icon as shown below.

![Screenshot 2025 10 21 At 1.07.13 AM](Screenshots/Screenshot%202025-10-21%20at%201.07.13 AM.png)

However, I was unclear about the concept of "translate" initially. But now, I understant it is "shifing the origin to a different position. Everything drawn after translate() is called will appear to be shifted". Meaning that, the new shape will be drawn using the exisiting coordinates IN RELATION TO THE x and y coordinates.

###Phase 4
Phase 4 was a long process. I began with thinking through what exactly I need to achieve based on the given instructions:

1) "you must divide the canvas into a grid and figure out the size of each cell"
= creating cells by creating columns and rows 

Reflection: I didn't actually create columns and rows. It is like a byproduct after determining the cell width (canvas/a certain number). This was confusing at first. But thinking it holistically, the only meaningful thing (meaningful to the visuals) are x and y, as they detetermine the location of shapes.

2) "Use the s parameter in the drawObject() function to scale your visual object according to the cell size."
= be able to make the value of 's' change in relation to the cell size 

Reflection: The scale is essentially a ratio. Now, I know the first thing to do is just think about what are the things that the ratio is comparing. In this case, it is the cell width or height comparing to the icon size. Since it is a square grid (e.g 8x8), cell width and height are the same, we can use either one of them. Reviewing the initial coordinates, I realized the width for my icon is roughly 80-10. Through trial and error, I figure out 85 is a good number to maximize the size of icon without overflowing. 


3) "Hint: Use nested for-loops to tile your visual objects. The first loop goes through the x-axis of your canvas. The second loop goes through the y-axis of your canvas. You can multiply the cell width with the current x position in the nested for-loop to position your object in the x-axis. For the y-axis, this will be the cell height multiplied by the current y position."
= review codealong.js file and figure out similarities between current task and in-class activities 
= making drawObject repeat until the grid ends
= making the value of 'x' and 'y' increase until the grid ends  

Reflection: I learnt from the in-class activity example where 'i' and 'j' are used for the loop. In this project, I use 'i' and 'j' as the amount of times (horizontally and vertically) the icon want to repeat. But I also need to create distance between each repetition. Therefore, I "cellWidth = width/columns" and "cellHeight = height/rows" and times them with 'i' and 'j' to determine the loopung of x and y. 

![Screenshot 2025 10 21 At 2.50.49 AM](Screenshots/Screenshot%202025-10-21%20at%202.50.49 AM.png)

![Screenshot 2025 10 21 At 2.33.44 AM](Screenshots/Screenshot%202025-10-21%20at%202.33.44 AM.png)